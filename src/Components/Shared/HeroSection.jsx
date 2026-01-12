import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaArrowRight,
  FaPlay,
  FaStar,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import Button from "../UI/Button";
import { useDesignSystem } from "../../context/DesignSystemContext";

const HeroSection = () => {
  const { patterns } = useDesignSystem();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Homemade Meals, Delivered",
      subtitle:
        "Discover fresh, affordable, home-cooked food made by local chefs in your neighborhood.",
      image: "https://i.ibb.co.com/mrKN2Yy5/Hero-Img.png",
      cta: "Explore Daily Menus",
      ctaLink: "/meals",
    },
    {
      title: "Support Local Chefs",
      subtitle:
        "Connect with talented home cooks and enjoy authentic, made-with-love meals from your community.",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      cta: "Meet Our Chefs",
      ctaLink: "/meals",
    },
    {
      title: "Fresh & Healthy Options",
      subtitle:
        "Every meal is prepared with fresh ingredients and delivered right to your doorstep.",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2081&q=80",
      cta: "Order Now",
      ctaLink: "/meals",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 1 },
    },
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative h-[65vh] min-h-[500px] max-h-[800px] flex items-center justify-center overflow-hidden">
      <motion.div
        key={currentSlide}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${currentHero.image}')`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30"></div>
      </motion.div>

      <div className="relative z-10 text-center text-white p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={currentSlide}
        >
          {/* Main Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight tracking-tight"
            variants={itemVariants}
          >
            {currentHero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            {currentHero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
          >
            <Link to={currentHero.ctaLink}>
              <Button
                variant="primary"
                size="lg"
                rightIcon={<FaArrowRight />}
                className="shadow-2xl hover:shadow-orange-500/25 min-w-[200px] w-full sm:w-auto"
              >
                {currentHero.cta}
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<FaPlay />}
                className="border-white text-white hover:bg-white hover:text-gray-900 min-w-[200px] w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            variants={statsVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <FaUsers className="text-xl sm:text-2xl text-orange-400 mr-2" />
                <span className="text-xl sm:text-2xl font-bold">500+</span>
              </div>
              <p className="text-xs sm:text-sm opacity-90">Happy Customers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <FaUtensils className="text-xl sm:text-2xl text-orange-400 mr-2" />
                <span className="text-xl sm:text-2xl font-bold">50+</span>
              </div>
              <p className="text-xs sm:text-sm opacity-90">Local Chefs</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <FaStar className="text-xl sm:text-2xl text-orange-400 mr-2" />
                <span className="text-xl sm:text-2xl font-bold">4.8</span>
              </div>
              <p className="text-xs sm:text-sm opacity-90">Average Rating</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-orange-500 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-center"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
