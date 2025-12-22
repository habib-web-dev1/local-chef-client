import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { motion } from "framer-motion";
import axios from "axios";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    // 🎯 Fetching real reviews from your backend
    axios
      .get(`${SERVER_URL}/reviews`)
      .then((res) => setReviews(res.data.slice(0, 6))) // Show only first 6
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/30 rounded-[3rem] px-6 md:px-12 border border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-orange-600 font-bold uppercase tracking-widest text-sm"
            >
              Testimonials
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mt-2">
              Our Community <span className="text-orange-600">Loves Us</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
              Check out the latest feedback from our local food lovers.
            </p>
          </div>

          {/* User Stack Info */}
          <div className="hidden lg:block">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800"
                  src={`https://i.pravatar.cc/150?img=${i + 10}`}
                  alt="user"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                +{reviews.length > 0 ? reviews.length + 450 : 500}
              </div>
            </div>
            <p className="text-xs text-center mt-2 font-bold text-gray-400 uppercase">
              Trusted by 2k+ Users
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400 italic">
              No reviews found in the database...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
