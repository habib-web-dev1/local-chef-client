import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaUtensils,
  FaDollarSign,
  FaStar,
  FaClock,
  FaUser,
  FaHeart,
  FaCommentDots,
  FaShoppingCart,
  FaSpinner,
  FaLock,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import useTitle from "../Hooks/useTitle";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MealDetails = () => {
  const { id } = useParams();
  const { user, dbUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useTitle(meal ? meal.foodName : "Meal Details");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const mealRes = await axios.get(`${SERVER_URL}/meals/${id}`);
        setMeal(mealRes.data);

        const reviewRes = await axios.get(`${SERVER_URL}/reviews/meal/${id}`);
        setReviews(reviewRes.data);

        if (user) {
          const favRes = await axiosSecure.get(`/favorites`);
          const match = favRes.data.find((fav) => fav._id === id);
          if (match) setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchMealData();
  }, [id, user, SERVER_URL, axiosSecure]);

  const handleToggleFavorite = async () => {
    if (!user) return navigate("/login");
    try {
      if (isFavorite) {
        await axiosSecure.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await axiosSecure.post(`/favorites`, { mealId: id });
        setIsFavorite(true);
      }
    } catch (err) {
      Swal.fire(
        "Notice",
        err.response?.data?.message || "Operation failed",
        "info"
      );
    }
  };

  const handleReviewSubmit = async (data) => {
    if (!user) return Swal.fire("Error", "You must be logged in!", "error");

    if (dbUser?.status === "fraud") {
      return Swal.fire(
        "Access Denied",
        "Your account is restricted from posting reviews.",
        "error"
      );
    }

    const reviewData = {
      mealId: id,
      rating: parseFloat(data.rating),
      comment: data.comment,
    };

    try {
      const res = await axiosSecure.post(`/reviews`, reviewData);
      if (res.data.review) {
        setReviews((prev) => [res.data.review, ...prev]);
        reset();
        Swal.fire("Success", "Thank you for your review!", "success");
      }
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Submit failed",
        "error"
      );
    }
  };

  if (authLoading || dataLoading)
    return (
      <div className="flex justify-center mt-20">
        <FaSpinner className="animate-spin text-5xl text-orange-600" />
      </div>
    );
  if (!meal) return <div className="text-center mt-20">Meal not found.</div>;

  const renderStars = (rating) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating) ? "text-orange-500" : "text-gray-300"
          }`}
        />
      ));

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 relative h-[500px]">
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 p-10 flex flex-col justify-end">
              <h1 className="text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">
                {meal.foodName}
              </h1>
              <div className="flex items-center text-white gap-6">
                <span className="text-3xl font-black text-orange-500">
                  ${meal.price.toFixed(2)}
                </span>
                <span className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest opacity-80 border-l pl-6 border-white/20">
                  <FaUser className="text-orange-500" />{" "}
                  {meal.chefName || "Certified Chef"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex gap-1 mb-1">
                  {renderStars(meal.rating)}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {reviews.length} total reviews
                </p>
              </div>
              <button
                onClick={handleToggleFavorite}
                className={`p-4 rounded-2xl transition-all ${
                  isFavorite
                    ? "bg-red-500 text-white shadow-lg shadow-red-200"
                    : "bg-white dark:bg-gray-700 text-gray-300 border"
                }`}
              >
                <FaHeart className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
                <FaClock className="text-orange-500 text-xl" />
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400">
                    Estimated Delivery
                  </p>
                  <p className="font-bold dark:text-white">
                    {meal.estimatedDeliveryTime}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-black text-gray-400 mb-2 tracking-widest">
                  Description
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                  {meal.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/order/${id}`, { state: { meal } })}
              className="w-full py-5 bg-orange-600 text-white rounded-2xl font-black text-xl hover:bg-orange-700 transition-all flex justify-center items-center gap-3 shadow-xl shadow-orange-100 dark:shadow-none uppercase tracking-widest"
            >
              <FaShoppingCart /> Order Now
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 border-t dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-black mb-2 dark:text-white italic tracking-tighter">
                FEEDBACK
              </h2>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-8">
                Share your dining experience
              </p>

              {dbUser?.status === "fraud" ? (
                <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-3xl flex flex-col items-center text-center gap-3">
                  <FaLock className="text-red-500 text-3xl mb-2" />
                  <p className="text-red-700 dark:text-red-400 font-black text-sm uppercase">
                    Privileges Suspended
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    Your account has been restricted from participating in
                    community reviews.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(handleReviewSubmit)}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                      Rating
                    </label>
                    <select
                      {...register("rating", { required: true })}
                      className="w-full mt-1 p-4 rounded-2xl border bg-gray-50 dark:bg-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4">⭐⭐⭐⭐ Very Good</option>
                      <option value="3">⭐⭐⭐ Good</option>
                      <option value="2">⭐⭐ Fair</option>
                      <option value="1">⭐ Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                      Your Comment
                    </label>
                    <textarea
                      {...register("comment", { required: true })}
                      placeholder="How was the taste, texture, and delivery?"
                      className="w-full mt-1 p-4 rounded-2xl border bg-gray-50 dark:bg-gray-900 dark:text-white h-32 font-medium outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gray-900 dark:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                  >
                    Post Review
                  </button>
                </form>
              )}
            </div>

            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8 border-b pb-4 dark:border-gray-700">
                <h3 className="font-black text-gray-400 uppercase tracking-widest text-xs">
                  Customer Stories ({reviews.length})
                </h3>
                <div className="flex gap-1 text-orange-500 text-sm">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>

              <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                {reviews.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <FaCommentDots className="mx-auto text-4xl text-gray-300 mb-4" />
                    <p className="text-gray-400 font-bold italic">
                      No reviews yet. Be the first to taste!
                    </p>
                  </div>
                ) : (
                  reviews.map((rev, i) => (
                    <div key={rev._id || i} className="group">
                      <div className="flex gap-4">
                        <img
                          src={
                            rev.reviewerImage ||
                            "https://i.ibb.co/31S99Xp/default-avatar.png"
                          }
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 p-0.5 shadow-md"
                          alt={rev.reviewerName}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h4 className="font-black text-gray-900 dark:text-white text-base leading-none mb-1">
                                {rev.reviewerName}
                              </h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                {rev.createdAt
                                  ? new Date(rev.createdAt).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )
                                  : "Recently Added"}
                              </p>
                            </div>
                            <div className="flex gap-0.5">
                              {renderStars(rev.rating)}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl mt-2 italic relative">
                            <span className="text-orange-500/20 text-4xl absolute -top-2 -left-1 font-serif">
                              "
                            </span>
                            {rev.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MealDetails;
