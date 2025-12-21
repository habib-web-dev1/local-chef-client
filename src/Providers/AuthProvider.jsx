import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
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

  const createJWT = async (currentUser) => {
    await axios.post(
      `${SERVER_URL}/auth/jwt`,
      {
        email: currentUser.email,
        uid: currentUser.uid,
      },
      { withCredentials: true }
    );
  };

  const clearJWT = async () => {
    await axios.post(
      `${SERVER_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  };

  const createUser = async (email, password, displayName) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = cred.user;

      if (displayName) {
        await updateProfile(currentUser, { displayName });
      }

      await createJWT(currentUser);

      await axios.post(`${SERVER_URL}/users`, {
        email: currentUser.email,
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL || "",
      });

      setUser(currentUser);

      const res = await axios.get(`${SERVER_URL}/users/${currentUser.email}`, {
        withCredentials: true,
      });
      setDbUser(res.data);
    } catch (error) {
      console.error("Create User Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInEmail = async (email, password) => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const currentUser = cred.user;

      await createJWT(currentUser);

      const res = await axios.get(`${SERVER_URL}/users/${currentUser.email}`, {
        withCredentials: true,
      });
      setDbUser(res.data);
      setUser(currentUser);
    } catch (error) {
      console.error("Email SignIn Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const currentUser = cred.user;

      await createJWT(currentUser);

      const res = await axios.get(`${SERVER_URL}/users/${currentUser.email}`, {
        withCredentials: true,
      });
      setDbUser(res.data);
      setUser(currentUser);
    } catch (error) {
      console.error("Google SignIn Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await clearJWT();
      await signOut(auth);
      setUser(null);
      setDbUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await createJWT(currentUser);
          const res = await axios.get(
            `${SERVER_URL}/users/${currentUser.email}`,
            { withCredentials: true }
          );
          setDbUser(res.data);
        } catch {
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
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
