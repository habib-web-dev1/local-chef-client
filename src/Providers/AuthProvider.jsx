import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

// Custom hook to consume the AuthContext easily
export const useAuth = () => useContext(AuthContext);

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null); // MongoDB user data (role, status, chefId)
  const [loading, setLoading] = useState(true);

  // --- JWT Token Generator
  const getJwtToken = async (currentUser) => {
    try {
      const userInfo = {
        email: currentUser.email,
        uid: currentUser.uid,
      };

      // Sends the info to the Express server to receive an HTTP-only cookie
      await axios.post(`${SERVER_URL}/jwt`, userInfo, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to fetch JWT:", error);
    }
  };

  // --- JWT Token Remover (Clears HTTP-only cookie on server) ---
  const clearJwtToken = async () => {
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

  // --- Helper function to save/update user on MongoDB ---
  // Called after any successful Firebase sign-in or registration
  const saveUserToDb = async (currentUser) => {
    const userToSave = {
      email: currentUser.email,
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    };

    try {
      const res = await axios.post(`${SERVER_URL}/users`, userToSave);

      const userData = res.data.user || res.data;
      setDbUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to save user data to MongoDB:", error);
    }
  };

  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    // The component using this must handle .then()
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    try {
      await clearJwtToken(); // 1. Clear JWT cookie on server
      await signOut(auth); // 2. Sign out from Firebase (Triggers observer)
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback cleanup
      setUser(null);
      setDbUser(null);
    }
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // 1. Set the firebase user first
      setUser(currentUser);

      if (currentUser) {
        try {
          // 2. Get JWT (Using the correct /auth prefix)
          await axios.post(
            `${SERVER_URL}/auth/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );

          // 3. Get User Profile from DB
          const res = await axios.get(
            `${SERVER_URL}/users/${currentUser.email}`,
            { withCredentials: true }
          );

          setDbUser(res.data);
        } catch (err) {
          console.error("Auth sync error:", err);
          setDbUser(null);
        } finally {
          // 🎯 STOP LOADING ONLY AFTER DB DATA IS FETCHED
          setLoading(false);
        }
      } else {
        // No user logged in
        setDbUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const authInfo = {
    user,
    dbUser,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    saveUserToDb, // Exposed for components that call createUser/signIn directly
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
