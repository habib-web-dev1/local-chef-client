import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading, dbUser } = useContext(AuthContext);
  const location = useLocation();

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

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Navigate to="/dashboard/profile" replace />;
};

export default AdminRoute;
