// src/Hooks/useAxiosSecure.js (Optional, but recommended for interceptors)

import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

// src/Hooks/useAxiosSecure.js
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // This sends the cookie automatically
});

const useAxiosSecure = () => {
  const { logOut, loading } = useAuth(); // Add loading here
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          // If the server says 401, the cookie is likely gone/expired
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
