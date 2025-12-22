import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaUser,
  FaMoneyBillWave,
  FaTruckLoading,
  FaCheckCircle,
  FaChartPie,
  FaSpinner,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useTitle from "../../../Hooks/useTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Providers/AuthProvider";

const PIE_COLORS = ["#10B981", "#F59E0B", "#EF4444", "#6366F1"];

const PlatformStatistics = () => {
  useTitle("Platform Statistics");

  const axiosSecure = useAxiosSecure();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. IMPLEMENT THE FETCH LOGIC
    if (!authLoading && user) {
      const fetchStats = async () => {
        try {
          const res = await axiosSecure.get("/admin/stats");
          setStats(res.data); // Store the data
        } catch (err) {
          console.error("Stats fetch error:", err);
        } finally {
          setLoading(false); // Stop loading regardless of success/fail
        }
      };
      fetchStats();
    }
  }, [authLoading, user, axiosSecure]);

  if (authLoading || loading)
    return (
      <div className="flex h-96 items-center justify-center">
        <FaSpinner className="animate-spin text-5xl text-orange-500" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
            <FaChartBar className="mr-4 text-orange-600" /> Executive Summary
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 italic">
            Real-time platform performance metrics
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Last Updated:
          </span>
          <p className="text-sm font-mono dark:text-white">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* --- 1. Stat Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats?.revenue}
          Icon={FaMoneyBillWave}
          color="from-emerald-500 to-teal-600"
          isCurrency
        />
        <StatCard
          title="Active Users"
          value={stats?.users}
          Icon={FaUser}
          color="from-blue-500 to-indigo-600"
        />
        <StatCard
          title="Orders Delivered"
          value={stats?.delivered} // This will now receive the count from backend
          Icon={FaCheckCircle}
          color="from-orange-500 to-amber-600"
        />
        <StatCard
          title="Orders Pending"
          value={stats?.pending}
          Icon={FaTruckLoading}
          color="from-rose-500 to-pink-600"
        />
      </div>

      {/* --- 2. Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart */}
        <ChartContainer
          title="Revenue Growth"
          Icon={FaChartBar}
          className="lg:col-span-2"
        >
          {stats?.monthlyRevenue ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlyRevenue}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  content={<CustomTooltip isCurrency />}
                />
                <Bar
                  dataKey="revenue"
                  fill="#F97316"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
                <XAxis
                  dataKey="month"
                  tickFormatter={(tick) => {
                    const date = new Date(tick);
                    return date.toLocaleString("default", { month: "short" });
                  }}
                  axisLine={false}
                  tickLine={false}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No Revenue Data
            </div>
          )}
        </ChartContainer>

        {/* Status Pie Chart */}
        <ChartContainer title="Order Distribution" Icon={FaChartPie}>
          {stats?.orderStatusData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.orderStatusData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.orderStatusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No Status Data
            </div>
          )}
        </ChartContainer>
      </div>
    </motion.div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, Icon, color, isCurrency }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 bg-gradient-to-br ${color}`}
    />
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-tight">
          {title}
        </p>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white">
          {isCurrency
            ? `$${value?.toLocaleString() ?? 0}`
            : value?.toLocaleString() ?? 0}
        </h3>
      </div>
    </div>
  </motion.div>
);

// 🚀 FIXED: Added flex-col and flex-1 wrapper to handle Recharts height inheritance
const ChartContainer = ({ title, Icon, children, className }) => (
  <div
    className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-[450px] flex flex-col ${className}`}
  >
    <div className="flex items-center gap-2 mb-8 shrink-0">
      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
        <Icon className="text-orange-600" size={18} />
      </div>
      <h3 className="text-lg font-black text-gray-800 dark:text-white tracking-tight">
        {title}
      </h3>
    </div>

    {/* This wrapper ensures the ResponsiveContainer has a calculated parent height */}
    <div className="flex-1 min-h-0 w-full">{children}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label, isCurrency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-800">
        <p className="text-xs font-bold uppercase mb-1 opacity-60">
          {label || "Stats"}
        </p>
        <p className="text-lg font-black">
          {isCurrency
            ? `$${payload[0].value.toLocaleString()}`
            : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default PlatformStatistics;
