import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaStar,
  FaCommentDots,
  FaUtensils,
  FaEdit,
  FaTrashAlt,
  FaSpinner,
  FaCalendarAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  useTitle("My Reviews");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews/my-reviews");
        setReviews(res.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyReviews();
  }, [axiosSecure]);

  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "text-orange-500" : "text-gray-200 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );

  const handleDeleteReview = async (reviewId) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "This action cannot be undone and will update the meal's rating.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/reviews/${reviewId}`);
        setReviews(reviews.filter((r) => r._id !== reviewId));
        Swal.fire("Deleted!", "Your review has been removed.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete review.", "error");
      }
    }
  };

  const handleEditReview = (review) => {
    Swal.fire({
      title: `Edit Your Review`,
      input: "textarea",
      inputValue: review.comment,
      inputPlaceholder: "Share your experience...",
      showCancelButton: true,
      confirmButtonText: "Update Review",
      confirmButtonColor: "#ea580c",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
      inputAttributes: {
        class: "swal2-textarea-custom",
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        try {
          const res = await axiosSecure.patch(`/reviews/${review._id}`, {
            comment: result.value,
            rating: review.rating, // 🎯 Keep existing rating or pass a new one
          });

          if (res.data.review) {
            setReviews(
              reviews.map((r) =>
                r._id === review._id
                  ? { ...r, comment: result.value } // 🎯 '...r' preserves the rating!
                  : r
              )
            );
            Swal.fire("Success", "Review updated successfully", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update review.", "error");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <FaSpinner className="animate-spin text-4xl text-orange-600" />
        <p className="text-gray-500 animate-pulse">
          Loading your culinary feedback...
        </p>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <FaCommentDots className="text-orange-600" /> My Reviews
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            You have shared your thoughts on {reviews.length} meals.
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border border-dashed border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaQuoteLeft className="text-gray-300 text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            No reviews yet
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2">
            Start tasting and sharing your experiences with our chefs!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-2xl text-orange-600">
                      <FaUtensils />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
                        {review.mealName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="p-2.5 text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 transition-colors"
                      title="Edit Review"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="p-2.5 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 transition-colors"
                      title="Delete Review"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <FaQuoteLeft className="absolute -top-1 -left-1 text-gray-100 dark:text-gray-700 text-3xl z-0" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic relative z-10 pl-4 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-700 flex justify-between items-center">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <FaCalendarAlt />
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 uppercase">
                    Verified Purchase
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default MyReviews;
