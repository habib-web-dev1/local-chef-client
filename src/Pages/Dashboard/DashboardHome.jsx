import React from "react";
import { motion } from "framer-motion";

import {
  FaBell,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../../Providers/AuthProvider";

const DashboardHome = () => {
  const { user, dbUser } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-10 pb-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 md:p-12 shadow-2xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
              {dbUser?.role || "Member"} Portal
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {greeting}, <br />
              <span className="text-orange-500">
                {user?.displayName || "User"}!
              </span>
            </h1>
            <p className="mt-4 text-slate-400 max-w-md text-lg italic">
              "Cooking is an art, but eating is a necessity." Ready to check
              your latest activity?
            </p>
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                to="/dashboard/profile"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-600/20 flex items-center gap-2"
              >
                Manage Profile <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-orange-500 blur-[100px] opacity-20 rounded-full animate-pulse"></div>
            <FaUtensils className="text-[12rem] text-white/5 rotate-12 relative z-10" />
          </div>
        </div>

        <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-[2rem] p-8 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-500">
                Stay updated with your latest transactions
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <FaBell className="text-orange-500 animate-bounce" />
            </div>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            <ActivityItem
              icon={<FaCheckCircle className="text-emerald-500" />}
              title="Subscription Renewed"
              time="2 hours ago"
              desc="Your gold membership has been successfully renewed for another month."
            />

            <ActivityItem
              icon={<FaClock className="text-orange-500" />}
              title="Order Pending"
              time="5 hours ago"
              desc="Order #7741 is waiting for Chef's confirmation. Estimated prep time: 45m."
            />

            <ActivityItem
              icon={<FaExclamationCircle className="text-rose-500" />}
              title="Profile Updated"
              time="Yesterday"
              desc="You changed your delivery address to 123 Culinary St, New York."
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2rem] text-white shadow-xl">
            <h4 className="text-lg font-bold mb-2">Platform Tips</h4>
            <p className="text-indigo-100 text-sm opacity-80 mb-6">
              Chefs with a 4.5+ star rating get 30% more order requests. Update
              your menu today!
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-all border border-white/20">
              Read Best Practices
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ActivityItem = ({ icon, title, time, desc }) => (
  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 dark:bg-gray-700 dark:border-gray-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
      {icon}
    </div>
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 group-hover:border-orange-500 transition-colors">
      <div className="flex items-center justify-between space-x-2 mb-1">
        <div className="font-bold text-slate-900 dark:text-white">{title}</div>
        <time className="text-xs font-medium text-orange-500 uppercase">
          {time}
        </time>
      </div>
      <div className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
        {desc}
      </div>
    </div>
  </div>
);

export default DashboardHome;
