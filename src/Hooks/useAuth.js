// src/Hooks/useAuth.js

import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider"; // Adjust path if needed

// Standard hook to access authentication context
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
