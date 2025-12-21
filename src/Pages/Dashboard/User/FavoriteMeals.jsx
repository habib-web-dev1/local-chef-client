import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaHeart,
  FaUtensils,
  FaDollarSign,
  FaStar,
  FaClock,
  FaTrashAlt,
  FaSpinner,
} from "react-icons/fa";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const FavoriteMeals = () => {
  useTitle("Favorite Meals");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axiosSecure.get("/favorites");
        setFavorites(res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, [axiosSecure]);

  const renderStars = (rating) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ));

  const handleRemoveFavorite = (mealId, mealName) => {
    Swal.fire({
      title: "Remove from Favorites?",
      text: `Are you sure you want to remove "${mealName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/favorites/${mealId}`);

          if (res.data.message) {
            setFavorites((prev) => prev.filter((meal) => meal._id !== mealId));
            Swal.fire("Removed!", `${mealName} has been removed.`, "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to remove from favorites.", "error");
        }
      }
    });
  };

  if (isLoading)
    return (
      <FaSpinner className="animate-spin text-4xl text-orange-600 mx-auto mt-20" />
    );

  return (
    <motion.div
      className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl min-h-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-3 flex items-center">
        <FaHeart className="mr-3 text-red-600" /> My Favorites (
        {favorites.length})
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <FaHeart className="text-6xl text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold dark:text-white">
            No Favorites Yet!
          </h3>
          <Link
            to="/meals"
            className="mt-4 inline-block text-orange-600 font-semibold"
          >
            Start Browsing Meals
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <motion.div
              key={meal._id}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg border-t-4 border-red-500 overflow-hidden flex flex-col"
            >
              <Link to={`/meals/${meal._id}`}>
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-5 flex-grow">
                <h3 className="text-xl font-bold dark:text-white">
                  {meal.foodName}
                </h3>
                <div className="flex justify-between items-center my-2">
                  <div className="flex">{renderStars(meal.rating)}</div>
                  <span className="text-green-600 font-bold">
                    ${meal.price}
                  </span>
                </div>
                <div className="text-sm dark:text-gray-300">
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-orange-500" />{" "}
                    {meal.estimatedDeliveryTime}
                  </p>
                  <p className="flex items-center">
                    <FaUtensils className="mr-2 text-orange-500" />{" "}
                    {meal.chef?.name || "Chef"}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 flex justify-end">
                <button
                  onClick={() => handleRemoveFavorite(meal._id, meal.foodName)}
                  className="p-2 bg-red-100 text-red-600 rounded flex items-center text-sm"
                >
                  <FaTrashAlt className="mr-2" /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FavoriteMeals;
