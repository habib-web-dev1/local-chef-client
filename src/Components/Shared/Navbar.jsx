import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  FaUtensils,
  FaHome,
  FaListAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaColumns,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", name: "Home", icon: FaHome },
    { path: "/meals", name: "All Meals", icon: FaListAlt },
  ];

  if (user)
    navLinks.push({ path: "/dashboard", name: "Dashboard", icon: FaColumns });

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2 rounded-xl font-semibold transition-all ${
      isActive
        ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
        : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <FaUtensils className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter dark:text-white">
            LOCAL<span className="text-orange-600">CHEF</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              <link.icon className="mr-2" /> {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="hidden md:flex items-center gap-4 border-l pl-4 dark:border-gray-700">
              <img
                src={user.photoURL}
                className="h-10 w-10 rounded-full ring-2 ring-orange-500 object-cover"
                alt="profile"
              />
              <button
                onClick={logOut}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <FaSignOutAlt size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-md"
            >
              <FaUserCircle /> Login
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl dark:text-white"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white font-bold"
                >
                  <link.icon className="text-orange-500" /> {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  className="block w-full text-center py-4 bg-orange-600 text-white rounded-xl font-bold"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
