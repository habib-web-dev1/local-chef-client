import { useState, useRef, useEffect } from "react";
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
  FaChevronDown,
  FaUser,
  FaCog,
  FaHeart,
  FaClipboardList,
  FaInfoCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../../Hooks/useAuth";
import Button from "../UI/Button";
import { useDesignSystem } from "../../context/DesignSystemContext";

const Navbar = () => {
  const { user, dbUser, logOut } = useAuth();
  const { patterns } = useDesignSystem();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const guestNavLinks = [
    { path: "/", name: "Home", icon: FaHome },
    { path: "/meals", name: "All Meals", icon: FaListAlt },
    { path: "/about", name: "About", icon: FaInfoCircle },
  ];

  const userNavLinks = [
    { path: "/", name: "Home", icon: FaHome },
    { path: "/meals", name: "All Meals", icon: FaListAlt },
    { path: "/about", name: "About", icon: FaInfoCircle },
    { path: "/dashboard", name: "Dashboard", icon: FaColumns },
    { path: "/dashboard/my-orders", name: "My Orders", icon: FaClipboardList },
  ];

  const navLinks = user ? userNavLinks : guestNavLinks;

  const linkClasses = ({ isActive }) =>
    `flex items-center px-4 py-2.5 rounded-xl font-semibold ${
      patterns.transition
    } ${
      isActive
        ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
        : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
    }`;

  const handleLogout = async () => {
    setIsProfileDropdownOpen(false);
    await logOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <FaUtensils className="text-white text-xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter dark:text-white">
            LOCAL<span className="text-orange-600">CHEF</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              <link.icon className="mr-2" /> {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            /* Advanced Profile Dropdown Menu */
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 ${patterns.transition} ${patterns.focusRing}`}
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/0n6YtBC/user.png"}
                  className="h-8 w-8 rounded-full ring-2 ring-orange-500 object-cover"
                  alt="profile"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {dbUser?.role || "Member"}
                  </p>
                </div>
                <FaChevronDown
                  className={`text-gray-400 transition-transform ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50"
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FaUser className="text-gray-400" />
                        My Profile
                      </Link>

                      <Link
                        to="/dashboard/my-orders"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FaClipboardList className="text-gray-400" />
                        My Orders
                      </Link>

                      <Link
                        to="/dashboard/favorite-meals"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FaHeart className="text-gray-400" />
                        Favorites
                      </Link>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FaCog className="text-gray-400" />
                        Dashboard
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                      >
                        <FaSignOutAlt className="text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Login Button for Guests */
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/register">
                <Button variant="ghost" size="md">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="primary" size="md" leftIcon={<FaUserCircle />}>
                  Login
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg ${patterns.transition} ${patterns.focusRing}`}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-b dark:border-gray-800 overflow-hidden"
          >
            <div className="p-4 sm:p-6 space-y-4">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[48px]"
                >
                  <link.icon className="text-orange-500 text-lg" /> {link.name}
                </Link>
              ))}

              {/* Mobile User Actions */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <img
                      src={user.photoURL || "https://i.ibb.co/0n6YtBC/user.png"}
                      className="h-10 w-10 rounded-full ring-2 ring-orange-500 object-cover"
                      alt="profile"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {dbUser?.role || "Member"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 w-full p-4 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl font-semibold"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-orange-600 text-white rounded-xl font-semibold"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
