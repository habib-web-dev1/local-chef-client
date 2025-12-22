import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  // Framer Motion variants for the animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Background Image/Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/mrKN2Yy5/Hero-Img.png')",
        }} // Use a high-quality food image here
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-60 dark:opacity-70"></div>
      </div>

      {/* Content Container (Animated) */}
      <div className="relative z-10 text-center text-white p-4 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight tracking-tight"
            variants={itemVariants}
          >
            Homemade Meals, Delivered
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover fresh, affordable, home-cooked food made by local chefs in
            your neighborhood.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-4"
          >
            <Link to="/meals">
              <motion.button
                className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(234, 88, 12, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Daily Menus
                <FaArrowRight />
              </motion.button>
            </Link>

            <Link to="/about">
              <motion.button
                className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
