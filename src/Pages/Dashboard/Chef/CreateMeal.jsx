import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUtensils,
  FaDollarSign,
  FaClock,
  FaUser,
  FaEnvelope,
  FaImage,
  FaSpinner,
  FaLock,
  FaLayerGroup,
  FaWeightHanging,
  FaAlignLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import useTitle from "../../../Hooks/useTitle";
import useAuth from "../../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateMeal = () => {
  useTitle("Create Meal");
  const { user, dbUser, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-orange-600" />
      </div>
    );

  if (dbUser?.status === "fraud") {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-red-50 dark:bg-red-900/10 p-10 rounded-3xl border-2 border-red-100 dark:border-red-900/30 text-center max-w-2xl mx-auto"
      >
        <FaLock className="text-5xl text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600">
          Merchant Access Suspended
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Your account has been flagged. You cannot list new items until your
          status is resolved.
        </p>
      </motion.div>
    );
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", data.foodImage[0]);
      const imgRes = await axios.post(image_hosting_api, formData);

      if (imgRes.data.success) {
        const mealData = {
          foodName: data.foodName,
          foodImage: imgRes.data.data.display_url,
          category: data.category,
          description: data.description,
          portion: data.portion,
          price: parseFloat(data.price),
          estimatedDeliveryTime: `${data.estimatedDeliveryTime} mins`,
          ingredients: data.ingredients.split(",").map((i) => i.trim()),
          chef: {
            uid: user?.uid,
            name: user?.displayName,
            email: user?.email,
            chefId: dbUser?.chefId || "N/A",
          },
          status: "available",
          createdAt: new Date().toISOString(),
        };

        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/meals`,
          mealData,
          { withCredentials: true }
        );

        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Meal Published!",
            text: "Your recipe is now live on the marketplace.",
            confirmButtonColor: "#ea580c",
          });
          reset();
          setPreviewImage(null);
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to list the meal. Please check your connection.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
    >
      <header className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center italic">
          <span className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mr-4 text-orange-600">
            <FaUtensils />
          </span>
          Create New Listing
        </h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
            <FaUser className="text-orange-500" />{" "}
            <span className="font-bold">{user?.displayName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400 border-l pl-4">
            <FaEnvelope className="text-orange-500" />{" "}
            <span>{user?.email}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Meal Title
          </label>
          <input
            {...register("foodName", { required: "Meal name is required" })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="e.g. Signature Wagyu Beef Burger"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Category
            </label>
            <div className="relative">
              <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                {...register("category", { required: "Required" })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
              >
                <option value="">Choose...</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Price ($)
            </label>
            <div className="relative">
              <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Required", min: 1 })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Portion Size
            </label>
            <div className="relative">
              <FaWeightHanging className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("portion", { required: "Required" })}
                placeholder="e.g. 500g / 1 Person"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
              Description
            </label>
            <div className="relative">
              <FaAlignLeft className="absolute left-4 top-4 text-gray-400" />
              <textarea
                {...register("description", { required: "Required" })}
                rows="3"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="What makes this dish special?"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide text-xs">
              Prep Time (Min)
            </label>
            <div className="relative">
              <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                {...register("estimatedDeliveryTime", { required: "Required" })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Main Ingredients
          </label>
          <input
            {...register("ingredients", { required: "Required" })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Comma separated: Garlic, Olive Oil, Fresh Basil..."
          />
        </div>

        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-center hover:border-orange-500 transition-colors relative overflow-hidden bg-gray-50/50">
          <input
            type="file"
            {...register("foodImage", { required: "Image required" })}
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            accept="image/*"
          />
          {previewImage ? (
            <div className="relative h-56 w-full">
              <img
                src={previewImage}
                alt="Preview"
                className="h-full w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-2xl">
                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  Change Image
                </span>
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border">
                <FaImage className="text-2xl text-orange-500" />
              </div>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-tighter">
                Upload Food Gallery Image
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG or WEBP up to 5MB
              </p>
            </div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-5 bg-orange-600 text-white font-black text-xl rounded-2xl hover:bg-orange-700 shadow-xl shadow-orange-200 dark:shadow-none transition-all active:scale-[0.98] disabled:bg-gray-400 flex justify-center items-center gap-3 uppercase tracking-widest"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" /> Publishing...
            </>
          ) : (
            "Launch Listing"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateMeal;
