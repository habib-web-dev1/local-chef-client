import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaUtensils,
  FaDollarSign,
  FaStar,
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import useTitle from "../Hooks/useTitle";
import MealCard from "../Components/Shared/MealCard";

const MealsPage = () => {
  useTitle("All Meals");

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${SERVER_URL}/meals`, {
          params: {
            page: currentPage,
            search: searchTerm,
            sort: sortType,
            order: order,
            limit: 8,
          },
        });
        setMeals(data.meals || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMeals();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm, sortType, order, SERVER_URL]);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaUtensils className="mr-3 text-orange-600" /> Discover Local Meals
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-8 gap-4">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="What are you craving?"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex space-x-2 w-full md:w-auto">
            <button
              onClick={() => {
                setSortType("price");
                setOrder(order === "asc" ? "desc" : "asc");
                setCurrentPage(1);
              }}
              className={`flex-1 md:flex-none flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                sortType === "price"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <FaDollarSign className="mr-1" /> Price{" "}
              {sortType === "price" && (order === "asc" ? "↑" : "↓")}
            </button>
            <button
              onClick={() => {
                setSortType("rating");
                setOrder("desc");
                setCurrentPage(1);
              }}
              className={`flex-1 md:flex-none flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                sortType === "rating"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <FaStar className="mr-1" /> Best Rated
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {meals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow disabled:opacity-50"
            >
              <FaAngleLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-bold ${
                  currentPage === i + 1
                    ? "bg-orange-600 text-white"
                    : "bg-white dark:bg-gray-800 dark:text-white shadow"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow disabled:opacity-50"
            >
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
