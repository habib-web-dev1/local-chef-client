import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [dbUser, setDbUser] = useState(null); // MongoDB user
  const [loading, setLoading] = useState(true);

  // ----- JWT Functions -----
  const createJWT = async (currentUser) => {
    try {
      await axios.post(
        `${SERVER_URL}/auth/jwt`,
        { email: currentUser.email, uid: currentUser.uid },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to create JWT:", error);
    }
  };

  const clearJWT = async () => {
    try {
      await axios.post(
        `${SERVER_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to clear JWT:", error);
    }
  };

  // ----- User CRUD -----
  const saveUserToDb = async (userInfo) => {
    try {
      const res = await axios.post(`${SERVER_URL}/users`, userInfo);
      const userData = res.data.user || res.data;
      setDbUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to save user to DB:", error);
    }
  };

  const updateUserProfileInDb = async (updates) => {
    try {
      const res = await axios.patch(`${SERVER_URL}/users/profile`, updates, {
        withCredentials: true,
      });

      if (res.data.user) {
        setDbUser(res.data.user);
      }
      return res.data;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  // ----- Auth Functions -----
  const createUser = async (email, password) => {
    setLoading(true);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    setUser(cred.user);
    await createJWT(cred.user);
    setLoading(false);
    return cred.user;
  };

  const signInEmail = async (email, password) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      await createJWT(cred.user);

      const res = await axios.get(`${SERVER_URL}/users/${cred.user.email}`, {
        withCredentials: true,
      });
      setDbUser(res.data);
      return cred.user;
    } catch (error) {
      console.error("Login/Fetch error:", error);
      setDbUser(null);
    } finally {
      setLoading(false);
    }
  };
  const signInGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    setUser(cred.user);
    await createJWT(cred.user);
    // Fetch or save user to DB
    const res = await axios.get(`${SERVER_URL}/users/${cred.user.email}`, {
      withCredentials: true,
    });
    if (!res.data) {
      await saveUserToDb({
        email: cred.user.email,
        uid: cred.user.uid,
        displayName: cred.user.displayName,
        photoURL: cred.user.photoURL,
        role: "user",
        createdAt: new Date().toISOString(),
      });
    } else {
      setDbUser(res.data);
    }
    setLoading(false);
  };

  const logOut = async () => {
    setLoading(true);
    await clearJWT();
    await signOut(auth);
    setUser(null);
    setDbUser(null);
    setLoading(false);
  };

  // ----- Auth State Listener -----
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // 1. First, ensure the JWT is created and cookie is set
          await createJWT(currentUser);

          // 2. ONLY THEN fetch the user data
          const res = await axios.get(
            `${SERVER_URL}/users/${currentUser.email}`,
            { withCredentials: true }
          );
          setDbUser(res.data);
        } catch (error) {
          console.error("Auth state user fetch error:", error);
          setDbUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        // If no user, ensure JWT is cleared on backend too
        setDbUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        loading,
        createUser,
        signInEmail,
        signInGoogle,
        logOut,
        updateUserProfileInDb,
        saveUserToDb,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
