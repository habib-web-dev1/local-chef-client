import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
// 🎯 FIX: Point this to your actual AuthProvider file
import { AuthContext } from "../Providers/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading, dbUser } = useContext(AuthContext);
  const location = useLocation();

  // 🎯 FIX: Wait for BOTH loading state and the existence of dbUser
  // This ensures the role is actually verified before we decide to redirect
  if (loading || (user && !dbUser)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
        <p className="ml-2 font-bold text-gray-600">
          Verifying Admin Privileges...
        </p>
      </div>
    );
  }
  const userRole = dbUser?.role?.toLowerCase();
  if (user && userRole === "admin") {
    return children;
  }

  // If not logged in at all
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If logged in but the verified role is NOT admin
  return <Navigate to="/dashboard/profile" replace />;
};

export default AdminRoute;
