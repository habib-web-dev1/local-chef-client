import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
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
