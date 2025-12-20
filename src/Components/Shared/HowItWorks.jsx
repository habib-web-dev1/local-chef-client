import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaShoppingBag, FaTruck } from "react-icons/fa";

const HowItWorks = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const steps = [
    {
      icon: FaSearch,
      title: "1. Discover",
      description:
        "Browse daily menus from local chefs based on your current delivery area.",
      color: "text-blue-500",
    },
    {
      icon: FaShoppingBag,
      title: "2. Order & Pay",
      description:
        "Place your order securely and complete payment instantly through our platform.",
      color: "text-green-500",
    },
    {
      icon: FaTruck,
      title: "3. Enjoy!",
      description:
        "Track your order in real-time and enjoy a fresh, home-cooked meal delivered to your door.",
      color: "text-red-500",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How <span className="text-orange-600">LocalChefBazaar</span> Works
        </motion.h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          Simple, fast, and delicious. Getting a homemade meal is easier than
          ever.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              variants={stepVariants}
              whileHover={{ translateY: -10 }}
            >
              <step.icon className={`w-12 h-12 mx-auto mb-4 ${step.color}`} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
