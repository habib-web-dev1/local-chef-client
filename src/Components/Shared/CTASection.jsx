import React from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaApple,
  FaGooglePlay,
  FaUtensils,
  FaHeart,
} from "react-icons/fa";
import Button from "../UI/Button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>

        {/* Food Icons */}
        <FaUtensils className="absolute top-20 right-32 text-4xl text-white opacity-20" />
        <FaHeart className="absolute bottom-40 left-20 text-3xl text-white opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ready to Taste the
              <br />
              <span className="text-yellow-200">Difference?</span>
            </h2>

            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              Join thousands of food lovers who have discovered the joy of
              authentic, homemade meals from passionate local chefs. Your next
              favorite dish is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="secondary"
                  size="xl"
                  rightIcon={<FaArrowRight />}
                  className="bg-white text-orange-600 hover:bg-gray-100 shadow-2xl min-w-[220px]"
                  onClick={() => (window.location.href = "/meals")}
                >
                  Explore Meals Now
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600 min-w-[220px]"
                  onClick={() => (window.location.href = "/register")}
                >
                  Become a Chef
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* App Download Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-t border-white/20 pt-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Get the LocalChef App
            </h3>

            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Order on the go, track your deliveries, and discover new chefs
              right from your phone. Available on iOS and Android.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs opacity-75">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-black text-white px-6 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
              >
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs opacity-75">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-black mb-2">30 min</div>
              <div className="text-lg opacity-90">Average Delivery</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-black mb-2">4.8★</div>
              <div className="text-lg opacity-90">Customer Rating</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-black mb-2">24/7</div>
              <div className="text-lg opacity-90">Customer Support</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm hidden lg:block"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm hidden lg:block"
      />
    </section>
  );
};

export default CTASection;
