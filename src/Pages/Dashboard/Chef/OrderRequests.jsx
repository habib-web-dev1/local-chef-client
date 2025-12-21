import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaTruck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaSpinner,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const OrderRequests = () => {
  useTitle("Order Requests");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const fetchChefOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders/chef-requests");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching chef orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) fetchChefOrders();
  }, [axiosSecure, user]);

  const handleUpdateStatus = (orderId, newStatus) => {
    Swal.fire({
      title: `Confirm ${newStatus.toUpperCase()}?`,
      text: `Are you sure you want to mark this order as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F97316",
      confirmButtonText: `Yes, ${newStatus}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/${orderId}/status`, {
            status: newStatus,
          });

          if (res.data) {
            setOrders((prev) =>
              prev.map((o) =>
                o._id === orderId ? { ...o, status: newStatus } : o
              )
            );
            Swal.fire("Success", `Order is now ${newStatus}`, "success");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <FaSpinner className="animate-spin text-4xl text-orange-600" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-4"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black flex items-center gap-3">
          <FaClipboardList className="text-orange-600" /> Order Requests
        </h2>
        <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-2xl font-bold text-sm">
          {orders.filter((o) => o.status === "pending").length} New Requests
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {orders.map((order) => {
            const isPending = order.status === "pending";
            const isAccepted = order.status === "accepted";
            const isDelivered = order.status === "delivered";
            const isCancelled = order.status === "cancelled";
            const isPaid =
              order.payment?.status === "paid" || order.status === "paid";

            return (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white border-2 p-6 rounded-3xl shadow-sm transition-all ${
                  isCancelled ? "border-red-100 opacity-60" : "border-gray-100"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-xl text-gray-800">
                      {order.mealName}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                      <FaClock /> {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-black">
                    ${order.totalPrice?.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <FaUser className="text-orange-400 text-xs" />{" "}
                    {order.userName || "Customer"}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" /> {order.userEmail}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2 italic">
                    <FaMapMarkerAlt className="text-gray-400" />{" "}
                    {order.shippingAddress || "No address provided"}
                  </p>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-[10px] font-black text-gray-400">
                      QTY: {order.quantity || 1}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase ${
                        isPaid ? "text-emerald-500" : "text-red-400"
                      }`}
                    >
                      {isPaid ? "● Paid" : "○ Unpaid"}
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex items-center justify-between px-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase">
                    Order Status:
                  </p>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                      isCancelled
                        ? "bg-red-50 text-red-500"
                        : isDelivered
                        ? "bg-green-50 text-green-500"
                        : "bg-blue-50 text-blue-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    disabled={!isPending}
                    onClick={() => handleUpdateStatus(order._id, "cancelled")}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl text-[10px] font-black transition-all
                               disabled:opacity-20 disabled:grayscale bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <FaTimesCircle size={18} /> Cancel
                  </button>

                  <button
                    disabled={!isPending}
                    onClick={() => handleUpdateStatus(order._id, "accepted")}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl text-[10px] font-black transition-all
                               disabled:opacity-20 disabled:grayscale bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    <FaCheckCircle size={18} /> Accept
                  </button>

                  <button
                    disabled={
                      order.status === "pending" ||
                      order.status === "delivered" ||
                      order.status === "cancelled"
                    }
                    onClick={() => handleUpdateStatus(order._id, "delivered")}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl text-[10px] font-black transition-all
             disabled:opacity-20 disabled:grayscale bg-green-50 text-green-600 hover:bg-green-100"
                  >
                    <FaTruck size={18} /> Deliver
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OrderRequests;
