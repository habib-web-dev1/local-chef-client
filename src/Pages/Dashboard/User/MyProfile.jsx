import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
  FaLevelUpAlt,
  FaSpinner,
  FaEdit,
  FaTimesCircle,
  FaCheckCircle,
  FaStar,
  FaQuoteLeft,
  FaUserShield,
  FaIdBadge,
} from "react-icons/fa";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const MyProfile = () => {
  useTitle("My Profile");
  const { user, dbUser, loading, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
      address: dbUser?.address || "",
      bio: dbUser?.chefDetails?.bio || "",
    },
  });

  useEffect(() => {
    if (dbUser) {
      reset({
        name: dbUser.displayName || user?.displayName,
        photoURL: dbUser.photoURL || user?.photoURL,
        address: dbUser.address || "",
        bio: dbUser.chefDetails?.bio || "",
      });
    }
  }, [dbUser, user, reset]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-orange-600" />
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data.name, data.photoURL);

      const response = await axiosSecure.patch("/users/profile", {
        displayName: data.name,
        photoURL: data.photoURL,
        address: data.address,
        bio: data.bio || "",
      });

      if (response.data.user) {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your changes have been saved successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update profile.",
        "error"
      );
    }
  };

  const handleRoleRequest = async (requestType) => {
    const result = await Swal.fire({
      title: `Apply for ${requestType.split("-")[0]}?`,
      text: `Your request will be sent to the admin.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EA580C",
      confirmButtonText: "Send Request",
    });

    if (result.isConfirmed) {
      try {
        const requestData = {
          name: user?.displayName,
          email: user?.email,
          uid: user?.uid,
          requestType: requestType,
          status: "pending",
          createdAt: new Date(),
        };
        const res = await axiosSecure.post("/admin/request", requestData);
        if (res.data.insertedId || res.data.success) {
          Swal.fire(
            "Sent!",
            "Your request is pending admin approval.",
            "success"
          );
        }
      } catch (err) {
        Swal.fire(
          "Notice",
          err.response?.data?.message || "Request already sent.",
          "info"
        );
      }
    }
  };

  const inputClass = `w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:text-white`;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-5 mb-8">
        <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tight">
          My Profile
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold hover:bg-orange-200 transition-all"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="submit"
              form="profile-form"
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
            >
              <FaCheckCircle /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 flex items-center gap-2"
            >
              <FaTimesCircle /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3 flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/bc99vPX/user-placeholder.png"
              }
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-orange-500 p-1 shadow-xl"
            />
          </div>

          <div className="mt-6 space-y-3 w-full">
            <h3 className="text-2xl font-black dark:text-white uppercase tracking-tight">
              {user?.displayName}
            </h3>
            <p className="text-gray-500 font-medium">{user?.email}</p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                <FaUser /> {dbUser?.role || "user"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 ${
                  dbUser?.status === "fraud"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {dbUser?.status === "fraud" ? (
                  <FaTimesCircle />
                ) : (
                  <FaCheckCircle />
                )}{" "}
                {dbUser?.status || "active"}
              </span>
            </div>

            {dbUser?.role === "chef" && (
              <div className="mt-4 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                <p className="text-[10px] uppercase font-bold text-gray-400">
                  Authorized Chef ID
                </p>
                <p className="text-sm font-mono font-bold text-orange-600 flex items-center justify-center gap-2">
                  <FaIdBadge /> {dbUser?.uid}
                </p>
              </div>
            )}
          </div>

          {dbUser?.role !== "admin" && (
            <div className="mt-8 space-y-3 w-full border-t border-gray-100 dark:border-gray-700 pt-6">
              {dbUser?.role !== "chef" && (
                <button
                  onClick={() => handleRoleRequest("chef-role")}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 dark:shadow-none transition-all"
                >
                  <FaLevelUpAlt /> Be a Chef
                </button>
              )}
              <button
                onClick={() => handleRoleRequest("admin-role")}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 dark:bg-gray-600 text-white py-3 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-500 transition-all shadow-lg"
              >
                <FaUserShield /> Be an Admin
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-2/3">
          <form
            id="profile-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  disabled={!isEditing}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">
                  Photo URL
                </label>
                <input
                  {...register("photoURL", { required: true })}
                  disabled={!isEditing}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400 ml-1">
                Delivery Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none">
                  <FaMapMarkerAlt className="text-orange-500" />
                </div>
                <input
                  {...register("address", { required: true })}
                  disabled={!isEditing}
                  className={`${inputClass} pl-12`}
                  placeholder="Your current location..."
                />
              </div>
            </div>

            {(dbUser?.role === "chef" || dbUser?.role === "admin") && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-gray-400 ml-1 flex items-center gap-2">
                  <FaQuoteLeft className="text-[10px]" /> Professional Bio
                </label>
                <textarea
                  {...register("bio")}
                  disabled={!isEditing}
                  rows="4"
                  className={inputClass}
                  placeholder="Experience, specialties, or culinary story..."
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
