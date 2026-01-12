import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const safeRating = Math.round(Number(review?.rating || 0));

  const ratingStars = Array(5)
    .fill(0)
    .map((_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < safeRating
            ? "text-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 flex flex-col h-full relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute top-0 right-10 w-12 h-1 bg-orange-500 rounded-b-full transition-all group-hover:h-3"></div>

      <FaQuoteLeft className="text-4xl text-orange-500 mb-6 opacity-20 group-hover:opacity-100 transition-opacity" />

      <p className="flex-grow text-gray-700 dark:text-gray-300 italic mb-8 text-lg leading-relaxed line-clamp-4">
        "{review.comment || "Exquisite flavors!"}"
      </p>

      <div className="flex items-center space-x-4 border-t border-gray-50 dark:border-gray-700 pt-6 mt-auto">
        <div className="relative">
          <img
            src={
              review.reviewerImage ||
              "https://i.ibb.co/31S99Xp/default-avatar.png"
            }
            alt={review.reviewerName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-gray-600 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-0.5 mb-1">{ratingStars}</div>
          <p className="font-black text-gray-900 dark:text-white truncate">
            {review.reviewerName || "Anonymous User"}
          </p>
          <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest truncate">
            {review.mealName || "General Feedback"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
