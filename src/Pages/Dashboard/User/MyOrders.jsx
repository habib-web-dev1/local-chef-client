import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaTimesCircle,
  FaCreditCard,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const fetchMyOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();

    const interval = setInterval(() => {
      fetchMyOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [axiosSecure]);

  const handlePayment = async (order) => {
    try {
      const res = await axiosSecure.post("/payment/create-checkout-session", {
        order: order,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Could not initiate Stripe checkout.",
      });
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading your orders...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
        <FaBoxOpen className="text-orange-600" /> My Order History
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border">
            <p className="text-gray-400 font-bold italic">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6"
            >
              <img
                src={order.mealImage}
                alt=""
                className="w-24 h-24 rounded-2xl object-cover shadow-md"
              />

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black text-gray-800 dark:text-white">
                  {order.mealName}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Qty: {order.quantity}
                </p>
                <p className="text-orange-600 font-black text-lg">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-2 px-6">
                <div
                  className={`flex flex-col items-center ${
                    order.status === "pending"
                      ? "text-orange-500"
                      : "text-gray-300"
                  }`}
                >
                  <FaClock />{" "}
                  <span className="text-[10px] font-bold">Pending</span>
                </div>
                <div className="w-8 h-[2px] bg-gray-200"></div>
                <div
                  className={`flex flex-col items-center ${
                    order.status === "accepted"
                      ? "text-blue-500"
                      : "text-gray-300"
                  }`}
                >
                  <FaCheckCircle />{" "}
                  <span className="text-[10px] font-bold">Accepted</span>
                </div>
                <div className="w-8 h-[2px] bg-gray-200"></div>
                <div
                  className={`flex flex-col items-center ${
                    order.status === "delivered"
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                >
                  <FaTruck />{" "}
                  <span className="text-[10px] font-bold">Delivered</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </div>

                {order.payment?.status === "unpaid" &&
                order.status !== "cancelled" ? (
                  <button
                    onClick={() => handlePayment(order)}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-2xl text-xs font-black transition-all shadow-lg active:scale-95"
                  >
                    <FaCreditCard /> Pay Now
                  </button>
                ) : order.payment?.status === "paid" ? (
                  <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1">
                    <FaCheckCircle /> PAID
                  </span>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
