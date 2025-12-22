import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext(null);

const SERVER_URL = "https://local-chef-server.vercel.app";
const API_BASE = `${SERVER_URL}`;

const mockAuth = {
  onAuthStateChanged: (callback) => {
    setTimeout(() => {
      const mockUser = JSON.parse(localStorage.getItem("mockUser"));
      callback(mockUser);
    }, 100);
    return () => {};
  },
  signOut: () => {
    localStorage.removeItem("mockUser");
    return Promise.resolve();
  },
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const issueJwt = async (currentUser) => {
    try {
      if (!currentUser) return;

      const userInfo = {
        email: currentUser.email,
        uid: currentUser.uid,
      };

      const res = await axios.post(`${API_BASE}/auth/jwt`, userInfo, {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("JWT issued successfully");
      }
    } catch (error) {
      console.error("JWT issue failed:", error);
    }
  };

  const clearJwt = async () => {
    try {
      await axios.post(
        `${API_BASE}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("JWT cleared successfully");
    } catch (error) {
      console.error("JWT clearance failed:", error);
    }
  };

  // -----------------------------------------------------------------------
  // 2. FETCH DB USER & ROLE (Connecting to /api/users/profile)
  // -----------------------------------------------------------------------

  const fetchDbUser = async (uid) => {
    try {
      const res = await axios.get(`${API_BASE}/users/profile`, {
        withCredentials: true,
      });
      setDbUser(res.data);
      // console.log('DB User data fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch DB user data:", error);
      setDbUser(null);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = mockAuth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      setDbUser(null);

      if (currentUser) {
        await issueJwt(currentUser);

        await fetchDbUser(currentUser.uid);
      } else {
        await clearJwt();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    dbUser,
    loading,

    logout: () => {
      setLoading(true);
      return mockAuth.signOut();
    },

    refetchDbUser: () => (user ? fetchDbUser(user.uid) : Promise.resolve(null)),
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
