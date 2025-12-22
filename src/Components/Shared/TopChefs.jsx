import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaUtensils,
  FaMapMarkerAlt,
  FaMedal,
  FaSpinner,
} from "react-icons/fa";

import { Link } from "react-router";
import { useAuth } from "../../Providers/AuthProvider";
import axios from "axios";

const TopChefs = () => {
  const { axiosSecure } = useAuth();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const fetchTopChefs = async () => {
      setLoading(true);
      try {
        // Direct call to the new optimized public endpoint
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/top-chefs`
        );

        // The backend already filtered for role:"chef", status:"active",
        // sorted by rating, and limited to 4.
        setChefs(res.data);
      } catch (error) {
        console.error("Failed to fetch top chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopChefs();
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const ChefCard = ({ chef, index }) => {
    // Medal colors for top 3
    let medalColor = "text-gray-400";
    if (index === 0) medalColor = "text-yellow-500";
    else if (index === 1) medalColor = "text-gray-300";
    else if (index === 2) medalColor = "text-amber-700";

    return (
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative flex flex-col items-center text-center"
        variants={cardVariants}
        whileHover={{ scale: 1.03, translateY: -5 }}
      >
        {/* Ranking Badge */}
        {index < 3 && (
          <div className="absolute top-0 right-0 p-3">
            <FaMedal className={`w-8 h-8 ${medalColor} drop-shadow-md`} />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-black text-gray-800 dark:text-gray-900 z-10">
              {index + 1}
            </span>
          </div>
        )}

        {/* Profile Image */}
        <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-orange-500 dark:border-orange-400">
          <img
            src={chef.photoURL || "https://i.ibb.co/30kL6P8/default-avatar.png"}
            alt={chef.displayName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- NAME SECTION FIXED TO ONE LINE --- */}
        <div className="flex items-center justify-center mb-1 w-full overflow-hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap truncate max-w-[70%]">
            {chef.displayName}
          </h3>
          {/* Rating Display */}
          <span className="flex-shrink-0 flex items-center text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full ml-2">
            <FaStar className="w-3 h-3 mr-1" />
            {chef.rating ? chef.rating.toFixed(1) : "5.0"}
          </span>
        </div>

        <p className="text-sm font-medium text-orange-600 mb-4 whitespace-nowrap truncate w-full">
          {chef.specialty || "Certified Home Chef"}
        </p>

        {/* Info Section */}
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 w-full border-t border-gray-100 dark:border-gray-700 py-4 mt-auto">
          <div className="flex items-center justify-center">
            <FaUtensils className="text-gray-500 mr-2 w-4 h-4" />
            <span className="font-semibold whitespace-nowrap">
              Served:
            </span>{" "}
            <span className="ml-1">{chef.totalMeals || 0} Meals</span>
          </div>
          <div className="flex items-center justify-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2 w-4 h-4" />
            <span className="font-semibold whitespace-nowrap">Area:</span>{" "}
            <span className="ml-1 truncate max-w-[100px]">
              {chef.address || "Local"}
            </span>
          </div>
        </div>

        {/* Link */}
        <Link className="mt-6 w-full">
          <motion.button
            className="w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-300 shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Menu
          </motion.button>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet Our <span className="text-orange-600">Best Chefs</span>
        </motion.h2>
        <p className="text-center text-lg text-gray-500 dark:text-gray-400 mb-16 max-w-xl mx-auto">
          Passionate chefs delivering fresh, home-cooked meals from their
          kitchen to yours.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="animate-spin text-4xl text-orange-600" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {chefs.length > 0 ? (
              chefs.map((chef, index) => (
                <ChefCard key={chef._id} chef={chef} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No active chefs found.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TopChefs;
