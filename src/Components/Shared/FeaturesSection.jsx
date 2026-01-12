import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaClock,
  FaHeart,
  FaLeaf,
  FaUsers,
  FaMapMarkerAlt,
  FaMobile,
  FaCreditCard,
} from "react-icons/fa";
import Card from "../UI/Card";

const FeaturesSection = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Safe & Secure",
      description:
        "All our chefs are verified and follow strict hygiene standards for your safety.",
      color: "text-green-500",
    },
    {
      icon: FaClock,
      title: "Fast Delivery",
      description:
        "Get your favorite homemade meals delivered fresh within 30-45 minutes.",
      color: "text-blue-500",
    },
    {
      icon: FaHeart,
      title: "Made with Love",
      description:
        "Every meal is prepared with care and passion by local home chefs.",
      color: "text-red-500",
    },
    {
      icon: FaLeaf,
      title: "Fresh Ingredients",
      description:
        "We use only the freshest, locally-sourced ingredients in all our dishes.",
      color: "text-green-600",
    },
    {
      icon: FaUsers,
      title: "Community Driven",
      description:
        "Support local chefs and connect with your neighborhood food community.",
      color: "text-purple-500",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Local Focus",
      description:
        "Discover amazing chefs right in your neighborhood and nearby areas.",
      color: "text-orange-500",
    },
    {
      icon: FaMobile,
      title: "Easy Ordering",
      description:
        "Simple, intuitive platform that makes ordering your favorite meals effortless.",
      color: "text-indigo-500",
    },
    {
      icon: FaCreditCard,
      title: "Secure Payments",
      description:
        "Multiple payment options with bank-level security for your peace of mind.",
      color: "text-teal-500",
    },
  ];

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
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Why Choose <span className="text-orange-600">LocalChef</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're more than just a food delivery service. We're building a
            community that connects food lovers with passionate local chefs who
            create amazing homemade meals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="h-full text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                padding="lg"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`text-xl sm:text-2xl ${feature.color}`}
                  />
                </div>

                <Card.Title
                  size="md"
                  className="mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors text-base sm:text-lg"
                >
                  {feature.title}
                </Card.Title>

                <Card.Description className="leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </Card.Description>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to experience the difference?
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/meals"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Exploring Meals
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
