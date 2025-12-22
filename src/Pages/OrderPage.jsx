import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShoppingBag,
  FaCreditCard,
  FaSpinner,
  FaLock, // Import FaLock for the fraud state
} from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const OrderPage = () => {
  const { state } = useLocation();
  const { meal } = state || {};
  const { user, dbUser } = useAuth(); // 🎯 Destructure dbUser here
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-xl font-semibold text-gray-500 italic">
          No meal selected.
        </p>
        <button
          onClick={() => navigate("/meals")}
          className="btn btn-primary bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          Browse Meals
        </button>
      </div>
    );
  }

  const totalPrice = (meal.price * quantity).toFixed(2);

  const onSubmit = async (data) => {
    // 🛡️ Extra Frontend Guard: Prevent submission if fraud
    if (dbUser?.status === "fraud") {
      Swal.fire("Access Denied", "Your account is restricted.", "error");
      return;
    }

    setIsSubmitting(true);
    const orderInfo = {
      mealId: meal._id,
      quantity: quantity,
      shippingAddress: `${data.address} | Phone: ${data.phone}`,
    };

    try {
      const res = await axiosSecure.post("/orders", orderInfo);
      if (res.data.order) {
        Swal.fire({
          title: "Order Placed!",
          text: "Head to your dashboard to track delivery.",
          icon: "success",
          confirmButtonColor: "#ea580c",
        }).then(() => {
          navigate("/dashboard/my-orders");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 py-12">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 italic">
        <FaShoppingBag className="text-orange-600" /> Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* --- Order Summary --- */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">
            Order Summary
          </h3>
          <div className="flex gap-4 mb-6">
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-24 h-24 object-cover rounded-2xl shadow-md"
            />
            <div>
              <h4 className="font-black text-xl text-gray-900 dark:text-white">
                {meal.foodName}
              </h4>
              <p className="text-gray-400 text-xs font-bold uppercase mt-1">
                Chef: {meal.chef?.name || meal.chefName}
              </p>
              <p className="text-orange-600 font-black text-lg mt-2">
                ${meal.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-y border-gray-50 dark:border-gray-700">
            <span className="font-bold text-gray-600">Select Quantity</span>
            <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center font-bold hover:text-orange-600"
              >
                -
              </button>
              <span className="w-10 text-center font-black">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center font-bold hover:text-orange-600"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <span className="text-lg font-bold">Grand Total</span>
            <span className="text-3xl font-black text-orange-600">
              ${totalPrice}
            </span>
          </div>
        </div>

        {/* --- Shipping Form --- */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-6"
        >
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">
            Delivery Details
          </h3>

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2">
              Full Address
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
              <textarea
                {...register("address", { required: "Address is required" })}
                placeholder="Street, House No, Area..."
                className="w-full pl-12 p-4 rounded-2xl border border-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none h-28 transition-all"
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2">
              Contact Phone
            </label>
            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                placeholder="+880 1XXX XXXXXX"
                className="w-full pl-12 p-4 rounded-2xl border border-gray-100 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* 🎯 FRAUD STATUS CONDITIONAL BUTTON SECTION */}
          {dbUser?.status === "fraud" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3"
            >
              <FaLock className="text-xl shrink-0" />
              <p className="text-sm font-bold">
                Your purchasing privileges are suspended due to account
                restrictions.
              </p>
            </motion.div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-xl hover:bg-orange-700 shadow-xl shadow-orange-100 dark:shadow-none transition-all flex justify-center items-center gap-3 uppercase tracking-widest disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <FaCreditCard /> Confirm Order
                </>
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
