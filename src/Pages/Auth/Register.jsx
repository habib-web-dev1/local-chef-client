import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaSpinner,
  FaArrowRight,
  FaCameraRetro,
} from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import Swal from "sweetalert2";
import { useAuth } from "../../Providers/AuthProvider";
import axios from "axios";
import { motion } from "framer-motion";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  useTitle("Create Account");
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: registerAuth,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfileInDb, saveUserToDb, loading } =
    useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload profile image
      const formData = new FormData();
      formData.append("image", data.photoURL[0]);
      const imgRes = await axios.post(image_hosting_api, formData);
      const uploadedImageUrl = imgRes.data.data.display_url;

      // Create Firebase user
      const createdUser = await createUser(data.email, data.password);

      // Update Firebase profile and MongoDB
      const userInfo = {
        uid: createdUser.uid,
        email: data.email,
        displayName: data.name,
        photoURL: uploadedImageUrl,
        address: data.address,
        role: "user",
        createdAt: new Date().toISOString(),
      };

      await saveUserToDb(userInfo);
      await updateUserProfileInDb({
        displayName: data.name,
        photoURL: uploadedImageUrl,
        address: data.address,
      });

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Your account has been created.",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/");
    } catch (error) {
      Swal.fire("Registration Failed", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-800"
      >
        <div className="md:w-[40%] bg-orange-600 p-12 text-white flex flex-col justify-between">
          <div className="z-10">
            <FaUtensils className="text-2xl mb-8" />
            <h2 className="text-4xl font-black leading-tight">
              Join the Foodie Community
            </h2>
            <p className="mt-4 text-orange-100 font-medium">
              Create your profile to order fresh home-cooked meals today.
            </p>
          </div>
        </div>

        <div className="md:w-[60%] p-10 md:p-14">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Create Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative group cursor-pointer w-28 h-28 rounded-full border-4 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-400 w-full h-full flex items-center justify-center text-4xl" />
                )}
                <input
                  type="file"
                  {...registerAuth("photoURL", { required: true })}
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              <p className="text-xs mt-2 text-gray-400">Upload Profile Photo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  {...registerAuth("name", { required: true })}
                  className="w-full pl-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white"
                  placeholder="Full Name"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                <input
                  {...registerAuth("email", { required: true })}
                  className="w-full pl-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...registerAuth("password", { required: true, minLength: 6 })}
                className="w-full pl-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-orange-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
              <input
                {...registerAuth("address", { required: true })}
                className="w-full pl-12 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white"
                placeholder="Address"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full py-4 bg-gray-900 dark:bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3"
            >
              {loading || isSubmitting ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-bold">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
