import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-3 rounded-2xl bg-base-200 dark:bg-gray-800 text-orange-500 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm border border-base-300 dark:border-gray-700"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <FaSun className="text-xl animate-pulse" />
      ) : (
        <FaMoon className="text-xl text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
