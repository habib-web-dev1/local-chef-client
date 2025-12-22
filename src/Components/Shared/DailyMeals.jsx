import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MealCard from "./MealCard";
import LoadingPage from "./LoadingPage";

const DailyMeals = () => {
  // 1. ADD 'error' HERE in the destructuring
  const { data, isLoading, error } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      // Pass limit=6 as per your home page requirement
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/meals?limit=6&sort=createdAt&order=desc`
      );
      // Since your controller returns { meals, totalPages... }, we return the array
      return res.data.meals;
    },
  });

  if (isLoading) return <LoadingPage />;

  // 2. Now 'error' is defined and can be used safely
  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-bold">
        Error: {error.message || "Failed to fetch meals"}
      </div>
    );
  }

  // Ensure meals is an array before mapping
  const meals = Array.isArray(data) ? data : [];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase">
          Daily <span className="text-orange-600">Fresh</span> Meals
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </section>
  );
};

export default DailyMeals;
