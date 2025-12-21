import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { FaUtensils } from "react-icons/fa";

const ChefRoute = ({ children }) => {
  const { user, loading, dbUser } = useContext(AuthContext);
  const location = useLocation();

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

  const userRole = dbUser?.role?.toLowerCase();

  if (user && (userRole === "chef" || userRole === "admin")) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/dashboard/profile" replace />;
};

export default ChefRoute;
