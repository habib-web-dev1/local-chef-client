import { Link, useNavigate } from "react-router";
import { FaHeart, FaStar, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useDesignSystem } from "../../context/DesignSystemContext";

const MealCard = ({ meal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { patterns } = useDesignSystem();

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire({
        title: "Login Required",
        text: "Please login to add favorites",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((res) => res.isConfirmed && navigate("/login"));
    }

    try {
      await axiosSecure.post("/favorites", { mealId: meal._id });
      Swal.fire({
        icon: "success",
        title: "Added to favorites",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (err) {
      Swal.fire(
        "Notice",
        err.response?.data?.message || "Already in favorites",
        "info"
      );
    }
  };

  return (
    <div className="meal-card group">
      <div className="meal-card-image">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white ${patterns.transition} ${patterns.focusRing}`}
          aria-label="Add to favorites"
        >
          <FaHeart />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
          ${meal.price?.toFixed(2) || "0.00"}
        </div>
      </div>

      <div className="meal-card-content">
        <Card.Title size="md" className="text-lg truncate mb-2">
          {meal.foodName}
        </Card.Title>

        {meal.description && (
          <Card.Description className="text-sm mb-3 line-clamp-2">
            {meal.description}
          </Card.Description>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            <span className={`font-medium ${patterns.textSecondary}`}>
              {meal.rating || 0}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <FaClock className="text-orange-400" />
            <span className={patterns.textSecondary}>
              {meal.estimatedDeliveryTime || "30m"}
            </span>
          </div>
        </div>

        {meal.chefName && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            by {meal.chefName}
          </div>
        )}
      </div>

      <div className="meal-card-actions">
        <Link to={`/meal/${meal._id}`} className="block">
          <Button
            variant="outline"
            fullWidth
            size="md"
            className="hover:bg-orange-600 hover:text-white hover:border-orange-600"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
