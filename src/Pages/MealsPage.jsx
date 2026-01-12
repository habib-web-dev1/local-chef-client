import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  FaUtensils,
  FaDollarSign,
  FaStar,
  FaSearch,
  FaAngleLeft,
  FaAngleRight,
  FaFilter,
  FaTimes,
  FaSort,
} from "react-icons/fa";
import useTitle from "../Hooks/useTitle";
import MealCard from "../Components/Shared/MealCard";
import { MealCardSkeleton } from "../Components/UI/SkeletonLoader";
import Input from "../Components/UI/Input";
import Select from "../Components/UI/Select";
import Button from "../Components/UI/Button";
import Card from "../Components/UI/Card";

const MealsPage = () => {
  useTitle("All Meals");

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: { min: "", max: "" },
    rating: "",
    chef: "",
  });
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const mealsRes = await axios.get(`${SERVER_URL}/meals?limit=1000`);
        const allMeals = mealsRes.data.meals || [];

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(allMeals.map((meal) => meal.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories);

        // Extract unique chefs
        const uniqueChefs = [
          ...new Set(allMeals.map((meal) => meal.chefName).filter(Boolean)),
        ];
        setChefs(uniqueChefs);
      } catch (error) {
        console.error("Error fetching filter options:", error);
        // Set fallback data if API fails
        setCategories([
          "Italian",
          "Asian",
          "American",
          "Mexican",
          "Indian",
          "Mediterranean",
        ]);
        setChefs([
          "Chef Mario",
          "Chef Wang",
          "Chef Smith",
          "Chef Garcia",
          "Chef Patel",
        ]);
      }
    };
    fetchFilterOptions();
  }, [SERVER_URL]);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          search: searchTerm,
          sort: sortType,
          order: order,
          limit: 8,
        };

        // Add filters to params
        if (filters.category) params.category = filters.category;
        if (filters.priceRange.min) params.minPrice = filters.priceRange.min;
        if (filters.priceRange.max) params.maxPrice = filters.priceRange.max;
        if (filters.rating) params.minRating = filters.rating;
        if (filters.chef) params.chef = filters.chef;

        const { data } = await axios.get(`${SERVER_URL}/meals`, { params });
        setMeals(data.meals || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMeals();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm, sortType, order, filters, SERVER_URL]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value,
      },
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: { min: "", max: "" },
      rating: "",
      chef: "",
    });
    setCurrentPage(1);
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === "object") {
      return value.min || value.max;
    }
    return value;
  }).length;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaUtensils className="mr-3 text-orange-600" /> Discover Local Meals
        </h1>

        {/* Enhanced Search and Filter Bar */}
        <Card className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 w-full lg:w-auto">
              <Input
                type="text"
                placeholder="Search meals, cuisines, or chefs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                leftIcon={<FaSearch />}
                size="lg"
              />
            </div>

            {/* Quick Sort Buttons */}
            <div className="flex gap-2 w-full lg:w-auto">
              <Button
                variant={sortType === "price" ? "primary" : "outline"}
                size="md"
                leftIcon={<FaDollarSign />}
                onClick={() => {
                  setSortType("price");
                  setOrder(order === "asc" ? "desc" : "asc");
                  setCurrentPage(1);
                }}
                className="flex-1 lg:flex-none"
              >
                Price {sortType === "price" && (order === "asc" ? "↑" : "↓")}
              </Button>

              <Button
                variant={sortType === "rating" ? "primary" : "outline"}
                size="md"
                leftIcon={<FaStar />}
                onClick={() => {
                  setSortType("rating");
                  setOrder("desc");
                  setCurrentPage(1);
                }}
                className="flex-1 lg:flex-none"
              >
                Rating
              </Button>

              <Button
                variant={showFilters ? "primary" : "outline"}
                size="md"
                leftIcon={<FaFilter />}
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 lg:flex-none relative"
              >
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <Select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      options={[
                        { value: "", label: "All Categories" },
                        ...categories.map((cat) => ({
                          value: cat,
                          label: cat,
                        })),
                      ]}
                    />
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Price Range
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min}
                        onChange={(e) =>
                          handlePriceRangeChange("min", e.target.value)
                        }
                        size="sm"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max}
                        onChange={(e) =>
                          handlePriceRangeChange("max", e.target.value)
                        }
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Rating
                    </label>
                    <Select
                      value={filters.rating}
                      onChange={(e) =>
                        handleFilterChange("rating", e.target.value)
                      }
                      options={[
                        { value: "", label: "Any Rating" },
                        { value: "4", label: "4+ Stars" },
                        { value: "3", label: "3+ Stars" },
                        { value: "2", label: "2+ Stars" },
                        { value: "1", label: "1+ Stars" },
                      ]}
                    />
                  </div>

                  {/* Chef Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Chef
                    </label>
                    <Select
                      value={filters.chef}
                      onChange={(e) =>
                        handleFilterChange("chef", e.target.value)
                      }
                      options={[
                        { value: "", label: "All Chefs" },
                        ...chefs.map((chef) => ({ value: chef, label: chef })),
                      ]}
                    />
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {meals.length} meals found
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<FaTimes />}
                      onClick={clearFilters}
                      disabled={activeFiltersCount === 0}
                    >
                      Clear Filters
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<FaSort />}
                      onClick={() => setShowFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* --- Meal Grid --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {/* Show 8 skeleton loaders */}
            {Array.from({ length: 8 }).map((_, index) => (
              <MealCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
          >
            <AnimatePresence>
              {meals.map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- Pagination --- */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow disabled:opacity-50"
            >
              <FaAngleLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-bold ${
                  currentPage === i + 1
                    ? "bg-orange-600 text-white"
                    : "bg-white dark:bg-gray-800 dark:text-white shadow"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow disabled:opacity-50"
            >
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
