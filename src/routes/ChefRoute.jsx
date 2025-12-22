// src/Routes/ChefRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { FaUtensils } from "react-icons/fa";

const ChefRoute = ({ children }) => {
  const { user, loading, dbUser } = useContext(AuthContext);
  const location = useLocation();

  // 🎯 STEP 1: Wait for both Firebase AND MongoDB data
  if (loading || (user && !dbUser)) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-600"></div>
        <div className="mt-4 flex items-center text-gray-600 animate-pulse">
          <FaUtensils className="mr-2" />
          <span className="font-semibold uppercase tracking-widest text-sm">
            Verifying Kitchen Access...
          </span>
        </div>
      </div>
    );
  }

  // 🎯 STEP 2: Normalize role check
  const userRole = dbUser?.role?.toLowerCase();

  // Allow both chefs and admins
  if (user && (userRole === "chef" || userRole === "admin")) {
    return children;
  }

  // 🎯 STEP 3: Fallback Redirects
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not a chef/admin? Send to profile.
  return <Navigate to="/dashboard/profile" replace />;
};

export default ChefRoute;
