import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClipboardList,
  FaHome,
  FaDollarSign,
  FaSpinner,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import useTitle from "../../Hooks/useTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  useTitle("Payment Successful");
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [isVerifying, setIsVerifying] = useState(true);

  // 1. Extract params from URL redirect
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");
  const orderId = query.get("orderId"); // Make sure this matches your backend success_url

  // 2. Sync with Backend on Load
  useEffect(() => {
    if (sessionId && orderId) {
      axiosSecure
        .patch("/payment/update-order", {
          orderId: orderId,
          transactionId: sessionId,
        })
        .then((res) => {
          console.log("Success!");
          // Optional: Add a small toast if you want
        })
        .catch((err) => {
          console.error("Error updating order", err);
          Swal.fire(
            "Error",
            "Payment confirmed but database update failed. Please contact support.",
            "error"
          );
        })
        .finally(() => {
          // 🎯 CRITICAL: This hides the spinner and shows the success UI
          setIsVerifying(false);
        });
    } else {
      // If there's no session, stop loading so user can see the "Home" buttons
      setIsVerifying(false);
    }
  }, [sessionId, orderId, axiosSecure]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Show a loading state while we update the database
  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-orange-600 text-5xl mb-4" />
        <h2 className="text-xl font-bold">Verifying your payment...</h2>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 dark:bg-gray-900 p-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="p-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg"
        variants={itemVariants}
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <FaCheckCircle className="text-8xl text-green-500 mx-auto mb-6" />
        </motion.div>

        <motion.h1
          className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3"
          variants={itemVariants}
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 dark:text-gray-400 mb-6"
          variants={itemVariants}
        >
          Your order has been confirmed.
        </motion.p>

        {/* Display Order Details */}
        <motion.div
          className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg text-left mb-8 space-y-2 text-gray-800 dark:text-gray-200"
          variants={itemVariants}
        >
          <p className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-mono text-sm font-bold">{orderId}</span>
          </p>
          <p className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Session:</span>
            <span className="font-mono">{sessionId?.slice(0, 20)}...</span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <Link to="/dashboard/my-orders">
            <motion.button
              className="flex items-center px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition-colors w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
            >
              <FaClipboardList className="mr-2" /> Track My Order
            </motion.button>
          </Link>
          <Link to="/">
            <motion.button
              className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
            >
              <FaHome className="mr-2" /> Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSuccess;
