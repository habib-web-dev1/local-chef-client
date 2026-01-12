import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaDollarSign,
  FaStar,
  FaClock,
  FaUser,
  FaTrashAlt,
  FaEdit,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useTitle from "../../../Hooks/useTitle";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 10;

const MyMeals = () => {
  useTitle("My Meals");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMyMeals = async () => {
      try {
        const res = await axiosSecure.get("/meals/my-meals");
        setMeals(res.data);
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyMeals();
  }, [axiosSecure]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);
  const currentMeals = meals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Delete "${name}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/meals/${id}`);

          if (res.data.success) {
            setMeals(meals.filter((meal) => meal._id !== id));
            Swal.fire("Deleted!", "Your meal has been removed.", "success");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire(
            "Error",
            "Failed to delete meal. You might not have permission.",
            "error"
          );
        }
      }
    });
  };
  if (loading)
    return (
      <div className="text-center py-20 dark:text-white">
        Loading your menu...
      </div>
    );

  return (
    <motion.div
      className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-3 flex items-center">
        <FaUtensils className="mr-3 text-orange-600" /> My Listed Meals (
        {meals.length})
      </h2>

      {meals.length === 0 ? (
        <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold dark:text-white">
            No Meals Listed
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Start by creating your first meal!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMeals.map((meal) => (
              <motion.div
                key={meal._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-t-4 border-orange-500 overflow-hidden flex flex-col"
              >
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex-grow space-y-3">
                  <h3 className="text-xl font-bold dark:text-white">
                    {meal.foodName}
                  </h3>
                  <div className="flex justify-between items-center text-sm">
                    <p className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" />{" "}
                      {meal.rating?.toFixed(1) || "0.0"}
                    </p>
                    <p className="text-lg font-extrabold text-green-600 dark:text-green-400">
                      ${meal.price?.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 pt-2 border-t dark:border-gray-700">
                    <p className="flex items-center">
                      <FaClock className="mr-2 text-orange-500" />{" "}
                      {meal.estimatedDeliveryTime}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between space-x-3">
                  <Link
                    to={`/dashboard/update-meal/${meal._id}`}
                    className="flex-1 flex justify-center items-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                  >
                    <FaEdit className="mr-2" /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(meal._id, meal.foodName)}
                    className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2"></div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default MyMeals;
