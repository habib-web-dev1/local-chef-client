import React from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  const errorMessage =
    error?.message || error?.statusText || "An unexpected error occurred.";
  const errorStatus = error?.status || "500";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-center">
      <FaExclamationTriangle className="text-8xl text-red-500 mb-6" />

      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-2">
        Oops! ({errorStatus})
      </h1>

      <h2 className="text-2xl font-semibold text-red-500 mb-4">
        {errorStatus === "404" ? "Page Not Found" : "Something Went Wrong"}
      </h2>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-8">
        We apologize for the inconvenience.
        <span className="block mt-2 font-mono text-sm p-3 bg-red-50 dark:bg-red-900/50 rounded-lg text-red-700 dark:text-red-300">
          Error Detail: {errorMessage}
        </span>
      </p>

      <Link
        to="/"
        className="flex items-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition-colors"
      >
        <FaHome className="mr-2" />
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
