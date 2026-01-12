import { useDesignSystem } from "../../context/DesignSystemContext";

const SkeletonLoader = ({ className = "", variant = "default" }) => {
  const variants = {
    default: "h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse",
    card: "meal-card bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse",
    avatar: "w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse",
    button: "h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse",
    text: "h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse",
    title: "h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse",
  };

  return <div className={`${variants[variant]} ${className}`}></div>;
};

// Meal Card Skeleton Component
export const MealCardSkeleton = () => {
  return (
    <div className="meal-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="meal-card-image bg-gray-200 dark:bg-gray-700"></div>

      {/* Content Skeleton */}
      <div className="meal-card-content space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Meta info */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
        </div>

        {/* Chef name */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>

      {/* Action Skeleton */}
      <div className="meal-card-actions">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
