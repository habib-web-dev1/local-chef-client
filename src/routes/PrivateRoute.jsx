import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  // 1. Get user state from your AuthContext
  const { user, loading } = useContext(AuthContext);

  // 2. Get current location for redirection after login
  const location = useLocation();

  // 3. Display a loading indicator while checking authentication status
  if (loading) {
    //
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-2">Loading user data...</p>
      </div>
    );
  }

  // 4. If the user is logged in, render the protected component
  if (user) {
    return children;
  }

  // 5. If the user is NOT logged in and loading is complete, redirect to login
  // State is passed to allow the user to return to their intended page after logging in.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
