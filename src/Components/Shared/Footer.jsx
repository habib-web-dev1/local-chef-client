import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  // Data for easy content management
  const contact = {
    phone: "+880 17XX XXX XXX",
    email: "support@localchef.com",
    address: "123 Homecook Plaza, Dhaka, Bangladesh",
  };

  const workingHours = [
    { day: "Mon - Fri", hours: "9:00 AM - 10:00 PM" },
    { day: "Sat - Sun", hours: "10:00 AM - 11:00 PM" },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://facebook.com/localchef",
      color: "text-blue-600",
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com/localchef",
      color: "text-blue-400",
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com/localchef",
      color: "text-pink-600",
    },
  ];

  return (
    <motion.footer
      className="bg-gray-800 dark:bg-gray-900 text-gray-300 border-t border-orange-600/30 pt-10 pb-4 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 border-b border-gray-700 pb-8">
          {/* 1. About/Logo Section */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors"
            >
              <svg
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zM9 9h2v4H9V9z" />
              </svg>
              <span>LocalChefBazaar</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Connecting you with the best homemade, local meals. Fresh,
              affordable, and made with love.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 sm:p-3 rounded-full bg-gray-700 hover:bg-white transition-colors duration-300 ${link.color} hover:shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="text-lg sm:text-xl" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* 2. Navigation/Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white border-b-2 border-orange-500/50 pb-1">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/meals"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  Meals
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white border-b-2 border-orange-500/50 pb-1">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-orange-500 transition-colors block py-1"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Details */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white border-b-2 border-orange-500/50 pb-1">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FaPhone className="text-orange-500 mt-1 shrink-0" />
                <p className="break-all">{contact.phone}</p>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-orange-500 mt-1 shrink-0" />
                <p className="break-all">{contact.email}</p>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1 shrink-0" />
                <p className="leading-relaxed">{contact.address}</p>
              </li>
            </ul>
          </div>

          {/* 4. Working Hours */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white border-b-2 border-orange-500/50 pb-1">
              Working Hours
            </h3>
            <ul className="space-y-2 text-sm">
              {workingHours.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1"
                >
                  <span className="font-medium text-gray-400">{item.day}:</span>
                  <span className="text-white">{item.hours}</span>
                </li>
              ))}
              <li className="pt-2 text-xs text-orange-500 font-medium">
                We are always online for orders!
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Information */}
        <div className="pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} LocalChefBazaar. All rights
            reserved.
          </p>
          <p className="mt-1 text-xs">Developed for the MERN Stack Project.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
