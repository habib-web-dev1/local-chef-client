import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import MealCard from "./MealCard";
import LoadingPage from "./LoadingPage";
import { MealCardSkeleton } from "../UI/SkeletonLoader";
import Button from "../UI/Button";

const DailyMeals = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/meals?limit=8&sort=createdAt&order=desc`
      );

      return res.data.meals;
    },
  });

  if (error) {
    return (
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-10 text-red-500 font-bold">
            Error: {error.message || "Failed to fetch meals"}
          </div>
        </div>
      </section>
    );
  }

  const meals = Array.isArray(data) ? data : [];

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

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-bold uppercase tracking-widest rounded-full mb-4">
            Fresh Today
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Daily <span className="text-orange-600">Fresh</span> Meals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover today's freshest homemade meals prepared by our talented
            local chefs
          </p>
        </motion.div>

        {/* Meals Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <MealCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center mb-12"
          >
            {meals.length > 0 ? (
              meals.map((meal) => (
                <motion.div key={meal._id} variants={itemVariants}>
                  <MealCard meal={meal} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No meals available at the moment. Check back soon!
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Call to Action */}
        {meals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/meals">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<FaArrowRight />}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                View All Meals
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DailyMeals;
