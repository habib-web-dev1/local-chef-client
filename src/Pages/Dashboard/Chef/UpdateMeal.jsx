import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import useTitle from "../../../Hooks/useTitle";

const UpdateMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  useTitle("Update Meal");

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    axios.get(`${SERVER_URL}/meals/${id}`).then((res) => {
      setMeal(res.data);
      reset(res.data);
    });
  }, [id, reset, SERVER_URL]);

  const onSubmit = async (data) => {
    try {
      const updatedInfo = {
        foodName: data.foodName,
        price: parseFloat(data.price),
        ingredients:
          typeof data.ingredients === "string"
            ? data.ingredients.split(",").map((i) => i.trim())
            : data.ingredients,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
      };

      const res = await axios.patch(`${SERVER_URL}/meals/${id}`, updatedInfo, {
        withCredentials: true,
      });

      if (res.data.matchedCount > 0 || res.data.success) {
        Swal.fire("Success", "Meal updated successfully!", "success");
        navigate("/dashboard/my-meals");
      } else {
        Swal.fire("Error", "Meal not found or no changes made.", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update meal.", "error");
    }
  };

  if (!meal)
    return <div className="p-20 text-center">Loading Meal Data...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Update Meal: {meal.foodName}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Food Name</label>
          <input
            {...register("foodName")}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              {...register("price")}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Time
            </label>
            <input
              {...register("estimatedDeliveryTime")}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Ingredients (comma separated)
          </label>
          <textarea
            {...register("ingredients")}
            defaultValue={meal.ingredients?.join(", ")}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateMeal;
