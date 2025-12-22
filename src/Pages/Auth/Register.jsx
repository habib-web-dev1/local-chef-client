import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaSpinner,
  FaArrowRight,
  FaCameraRetro,
} from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import { useAuth } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  useTitle("Create Account");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { createUser, updateUserProfile, saveUserToDb, loading } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", data.photoURL[0]);
      const imgRes = await axios.post(image_hosting_api, formData);

      if (imgRes.data.success) {
        const uploadedImageUrl = imgRes.data.data.display_url;
        const result = await createUser(data.email, data.password);
        await updateUserProfile(data.name, uploadedImageUrl);

        const userInfo = {
          uid: result.user.uid,
          email: data.email,
          displayName: data.name,
          photoURL: uploadedImageUrl,
          address: data.address,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        await saveUserToDb(userInfo);

        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Your account is ready.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire("Registration Failed", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper component for styled inputs
  const InputWrapper = ({ icon: Icon, children }) => (
    <div className="relative flex items-center group">
      <div className="absolute left-4 text-gray-400 group-focus-within:text-orange-500 transition-colors">
        <Icon />
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-6 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-800"
      >
        {/* Left Info Panel */}
        <div className="md:w-[40%] bg-orange-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8">
              <FaUtensils className="text-2xl" />
            </div>
            <h2 className="text-4xl font-black leading-tight">
              Join the <br /> Foodie Community
            </h2>
            <p className="mt-4 text-orange-100 font-medium">
              Create your profile to order fresh home-cooked meals today.
            </p>
          </div>

          <div className="z-10 pt-12 border-t border-orange-500/50">
            <p className="text-sm opacity-80 italic">
              "Good food is the foundation of genuine happiness."
            </p>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Right Form Panel */}
        <div className="md:w-[60%] p-10 md:p-14">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Get Started
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Please fill in your details to create an account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Image Preview & Upload Logic */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group cursor-pointer">
                <div className="w-28 h-28 rounded-full border-4 border-gray-50 dark:border-gray-800 overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800 relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <FaUser size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCameraRetro className="text-white text-xl" />
                  </div>
                </div>
                <input
                  type="file"
                  {...register("photoURL", { required: "Photo is required" })}
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  accept="image/*"
                />
              </div>
              <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-3">
                Upload Profile Photo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputWrapper icon={FaUser}>
                <input
                  {...register("name", { required: true })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                  placeholder="Full Name"
                />
              </InputWrapper>

              <InputWrapper icon={FaEnvelope}>
                <input
                  {...register("email", { required: true })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                  placeholder="Email Address"
                />
              </InputWrapper>
            </div>

            <InputWrapper icon={FaLock}>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                placeholder="Secure Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-orange-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </InputWrapper>

            <InputWrapper icon={FaMapMarkerAlt}>
              <input
                {...register("address", { required: true })}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all"
                placeholder="Address"
              />
            </InputWrapper>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full py-5 bg-gray-900 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-2xl font-bold shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
              {isSubmitting || loading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <>
                  Create Account{" "}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-bold hover:underline underline-offset-4 transition-all"
            >
              Log in instead
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
