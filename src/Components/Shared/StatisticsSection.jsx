import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUtensils,
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
} from "react-icons/fa";

const StatisticsSection = () => {
  const [counters, setCounters] = useState({
    customers: 0,
    chefs: 0,
    meals: 0,
    cities: 0,
    reviews: 0,
    orders: 0,
  });

  const finalStats = {
    customers: 2500,
    chefs: 150,
    meals: 5000,
    cities: 12,
    reviews: 4.8,
    orders: 15000,
  };

  const stats = [
    {
      key: "customers",
      icon: FaUsers,
      label: "Happy Customers",
      value: counters.customers,
      suffix: "+",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      key: "chefs",
      icon: FaUtensils,
      label: "Local Chefs",
      value: counters.chefs,
      suffix: "+",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      key: "meals",
      icon: FaHeart,
      label: "Meals Served",
      value: counters.meals,
      suffix: "+",
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      key: "cities",
      icon: FaMapMarkerAlt,
      label: "Cities Covered",
      value: counters.cities,
      suffix: "+",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      key: "reviews",
      icon: FaStar,
      label: "Average Rating",
      value: counters.reviews,
      suffix: "/5",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      decimal: true,
    },
    {
      key: "orders",
      icon: FaClock,
      label: "Orders Delivered",
      value: counters.orders,
      suffix: "+",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  // Animated counter effect
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounters((prev) => {
        const newCounters = { ...prev };
        let allComplete = true;

        Object.keys(finalStats).forEach((key) => {
          if (newCounters[key] < finalStats[key]) {
            const increment = finalStats[key] / steps;
            newCounters[key] = Math.min(
              newCounters[key] + increment,
              finalStats[key]
            );
            if (key === "reviews") {
              newCounters[key] = Math.round(newCounters[key] * 10) / 10;
            } else {
              newCounters[key] = Math.floor(newCounters[key]);
            }
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
          return finalStats;
        }

        return newCounters;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

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
    hidden: { y: 30, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Our <span className="text-orange-600">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of food lovers who have discovered the joy of
            authentic, homemade meals from talented local chefs in their
            community.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`p-4 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`text-3xl ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    {stat.decimal
                      ? stat.value.toFixed(1)
                      : stat.value.toLocaleString()}
                    <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {stat.label}
              </h3>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${stat.color.replace(
                    "text-",
                    "bg-"
                  )}`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Be Part of Our Growing Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Every order you place supports local chefs, strengthens community
              bonds, and brings authentic homemade flavors to your table. Join
              us in celebrating the art of home cooking!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
