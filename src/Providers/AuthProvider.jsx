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
export const useAuth = () => useContext(AuthContext);

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJwtToken = async (currentUser) => {
    try {
      const userInfo = {
        email: currentUser.email,
        uid: currentUser.uid,
      };

      await axios.post(`${SERVER_URL}/jwt`, userInfo, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to fetch JWT:", error);
    }
  };

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
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    try {
      await clearJwtToken();
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
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
      setUser(currentUser);

      if (currentUser) {
        try {
          await axios.post(
            `${SERVER_URL}/auth/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
          const res = await axios.get(
            `${SERVER_URL}/users/${currentUser.email}`,
            { withCredentials: true }
          );

          setDbUser(res.data);
        } catch (err) {
          console.error("Auth sync error:", err);
          setDbUser(null);
        } finally {
          setLoading(false);
        }
      } else {
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
    saveUserToDb,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
