import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaUser,
  FaUtensils,
  FaClipboardList,
  FaUsers,
  FaChartPie,
  FaHome,
  FaSignOutAlt,
  FaTasks,
  FaRegEdit,
  FaBars,
  FaTimes,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { useAuth } from "../../Providers/AuthProvider";

import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../../Components/Shared/ThemeToggle";

const DashboardLayout = () => {
  const { dbUser, logOut, loading } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const role = dbUser?.role?.toLowerCase() || "user";

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
      isActive
        ? "bg-orange-600 text-white shadow-lg shadow-orange-900/40"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-orange-500">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <h1 className="text-2xl font-black text-orange-500 tracking-tighter italic">
            LOCAL<span className="text-white">CHEF</span>
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
          <p className="px-4 pb-2 text-[10px] uppercase text-gray-500 font-bold tracking-widest">
            Account
          </p>
          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FaUser /> My Profile
          </NavLink>

          {role === "admin" && (
            <div className="pt-4 space-y-2">
              <p className="px-4 pb-2 text-[10px] uppercase text-gray-500 font-bold tracking-widest border-t border-white/5 pt-4">
                Administration
              </p>
              <NavLink
                to="/dashboard/manage-users"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUsers /> Manage User
              </NavLink>
              <NavLink
                to="/dashboard/manage-requests"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaTasks /> Manage Request
              </NavLink>
              <NavLink
                to="/dashboard/platform-stats"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaChartPie /> Platform Statistics
              </NavLink>
            </div>
          )}

          {role === "chef" && (
            <div className="pt-4 space-y-2">
              <p className="px-4 pb-2 text-[10px] uppercase text-gray-500 font-bold tracking-widest border-t border-white/5 pt-4">
                Chef Kitchen
              </p>
              <NavLink
                to="/dashboard/create-meals"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaRegEdit /> Create Meal
              </NavLink>
              <NavLink
                to="/dashboard/my-meals"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaUtensils /> My Meals
              </NavLink>
              <NavLink
                to="/dashboard/order-requests"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaClipboardList /> Order Requests
              </NavLink>
            </div>
          )}

          {role === "user" && (
            <div className="pt-4 space-y-2">
              <p className="px-4 pb-2 text-[10px] uppercase text-gray-500 font-bold tracking-widest border-t border-white/5 pt-4">
                Customer Menu
              </p>
              <NavLink
                to="/dashboard/my-orders"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaClipboardList /> My Orders
              </NavLink>
              <NavLink
                to="/dashboard/my-reviews"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaStar /> My Review
              </NavLink>
              <NavLink
                to="/dashboard/favorite-meals"
                className={linkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <FaHeart /> Favorite Meal
              </NavLink>
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-white/5">
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-orange-500 font-bold transition-all"
            >
              <FaHome /> Back to Site
            </NavLink>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 bg-gray-900 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold group"
          >
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />{" "}
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-72 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg"
            >
              <FaBars size={20} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Dashboard / <span className="text-orange-600">{role}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold dark:text-white leading-none">
                  {dbUser?.displayName}
                </p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                  {role}
                </p>
              </div>
              <img
                src={dbUser?.photoURL || "https://i.ibb.co/0n6YtBC/user.png"}
                className="h-10 w-10 rounded-full border-2 border-orange-500 object-cover shadow-lg"
                alt="user"
              />
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
