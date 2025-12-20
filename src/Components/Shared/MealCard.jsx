import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { FaHeart, FaStar, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MealCard = ({ meal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire({
        title: "Login Required",
        text: "Please login to add favorites",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((res) => res.isConfirmed && navigate("/login"));
    }

    try {
      await axiosSecure.post("/favorites", { mealId: meal._id });
      Swal.fire({
        icon: "success",
        title: "Added to favorites",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      Swal.fire(
        "Notice",
        err.response?.data?.message || "Already in favorites",
        "info"
      );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-colors"
        >
          <FaHeart />
        </button>
        <div className="absolute bottom-3 left-3 bg-orange-600 text-white px-2 py-1 rounded-lg text-sm font-bold">
          ${meal.price.toFixed(2)}
        </div>
      </div>

      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold dark:text-white truncate">
          {meal.foodName}
        </h3>
        <div className="flex items-center my-2 text-sm">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="dark:text-gray-300 font-medium">
            {meal.rating || 0}
          </span>
          <span className="mx-2 text-gray-300">|</span>
          <FaClock className="text-orange-400 mr-1" />
          <span className="dark:text-gray-300">
            {meal.estimatedDeliveryTime || "30m"}
          </span>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link to={`/meal/${meal._id}`}>
          <button className="w-full py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all">
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default MealCard;
