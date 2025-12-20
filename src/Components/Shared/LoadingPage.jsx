import React from "react";
import { FaUtensils, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="text-6xl text-orange-600 dark:text-orange-400 mb-4"
      >
        <FaUtensils />
      </motion.div>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
        ChefBazaar
      </h1>

      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
        <FaSpinner className="animate-spin" />
        <p className="text-lg">Loading platform data...</p>
      </div>

      <p className="mt-4 text-sm text-gray-500">Please wait a moment.</p>
    </motion.div>
  );
};

export default LoadingPage;
