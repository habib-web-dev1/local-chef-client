import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// *** Replace with your actual Firebase setup ***
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// --------------------------------------------------------------------------------
// NOTE: For simplicity, assume you have a Firebase setup and functions imported.
// In a real project, you'd configure Firebase here.
// --------------------------------------------------------------------------------

export const AuthContext = createContext(null);

// ** Replace with your server's base URL **
const SERVER_URL = "https://local-chef-server.vercel.app";
const API_BASE = `${SERVER_URL}`;

// --- DUMMY FIREBASE SETUP (Replace with your actual implementation) ---
// We will mock Firebase functions for this context code
const mockAuth = {
  // These functions would typically interact with Firebase
  onAuthStateChanged: (callback) => {
    // Mocking user initialization
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
  const [user, setUser] = useState(null); // Firebase user object
  const [dbUser, setDbUser] = useState(null); // User object from your DB (contains role)
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------------------------
  // 1. JWT MANAGEMENT (Communicating with the Express Server)
  // -----------------------------------------------------------------------

  // Function to fetch or renew the JWT from your Express server
  const issueJwt = async (currentUser) => {
    try {
      if (!currentUser) return;

      const userInfo = {
        email: currentUser.email,
        uid: currentUser.uid,
      };

      // This POST request sets the HTTP-only cookie on the client
      const res = await axios.post(`${API_BASE}/auth/jwt`, userInfo, {
        withCredentials: true,
      });

      if (res.data.success) {
        // console.log('JWT issued successfully');
      }
    } catch (error) {
      console.error("JWT issue failed:", error);
      // Optional: Force sign out if JWT exchange fails criticaly
      // signOut(auth);
    }
  };

  // Function to clear the JWT cookie from the Express server
  const clearJwt = async () => {
    try {
      await axios.post(
        `${API_BASE}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log('JWT cleared successfully');
    } catch (error) {
      console.error("JWT clearance failed:", error);
    }
  };

  // -----------------------------------------------------------------------
  // 2. FETCH DB USER & ROLE (Connecting to /api/users/profile)
  // -----------------------------------------------------------------------

  const fetchDbUser = async (uid) => {
    try {
      // Note: This relies on the JWT being sent via cookies (due to withCredentials: true)
      const res = await axios.get(`${API_BASE}/users/profile`, {
        withCredentials: true,
      });
      setDbUser(res.data); // This data includes the 'role' field
      // console.log('DB User data fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch DB user data:", error);
      setDbUser(null);
      return null;
    }
  };

  // -----------------------------------------------------------------------
  // 3. EFFECT FOR FIREBASE STATE CHANGE
  // -----------------------------------------------------------------------

  useEffect(() => {
    // Replace mockAuth with getAuth() from Firebase
    const unsubscribe = mockAuth.onAuthStateChanged(async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      setDbUser(null); // Reset DB user on state change

      if (currentUser) {
        // 1. Issue/Renew JWT token
        await issueJwt(currentUser);

        // 2. Fetch the corresponding user data (including role) from your server
        await fetchDbUser(currentUser.uid);
      } else {
        // User signed out: Clear the JWT cookie on the server
        await clearJwt();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // -----------------------------------------------------------------------
  // 4. CONTEXT VALUE
  // -----------------------------------------------------------------------

  const authInfo = {
    user,
    dbUser, // Provides access to the role ('user', 'chef', 'admin')
    loading,

    // Add your Firebase auth functions here (e.g., login, register)
    // login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    // register: (email, password) => createUserWithEmailAndPassword(auth, email, password),

    logout: () => {
      setLoading(true);
      return mockAuth.signOut(); // Replace with Firebase signOut(auth)
    },
    // Function to re-fetch the DB user data after a role change
    refetchDbUser: () => (user ? fetchDbUser(user.uid) : Promise.resolve(null)),
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
