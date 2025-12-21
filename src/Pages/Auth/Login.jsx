import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaSpinner,
  FaArrowRight,
} from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import Swal from "sweetalert2";
import { useAuth } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";

const Login = () => {
  useTitle("Login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInEmail, signInGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await signInEmail(data.email, data.password);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Welcome Back!",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Login Failed", "Invalid email or password", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-800"
      >
        <div className="md:w-[40%] bg-orange-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
              <FaUtensils className="text-2xl" />
            </div>
            <h2 className="text-4xl font-black leading-tight">
              Welcome <br /> Back!
            </h2>
            <p className="mt-4 text-orange-100 font-medium">
              Log in to access your favorite meals and local chef community.
            </p>
          </div>
        </div>

        <div className="md:w-[60%] p-10 md:p-14">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Login to Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-orange-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gray-900 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-3 transition-all"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                "Secure Login"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-100 dark:border-gray-800" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-1 border-t border-gray-100 dark:border-gray-800" />
          </div>

          <button
            onClick={signInGoogle}
            className="w-full flex items-center justify-center gap-3 py-4 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all font-bold text-gray-700 dark:text-gray-200"
          >
            <FaGoogle className="text-red-500" /> Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
