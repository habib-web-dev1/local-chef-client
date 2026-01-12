import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDesignSystem } from "../../context/DesignSystemContext";

const ThemeToggle = () => {
  const { theme, updateTheme, isDark, patterns } = useDesignSystem();

  const toggleTheme = () => {
    updateTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-orange-500 ${patterns.transition} hover:scale-110 active:scale-95 shadow-sm border border-gray-200 dark:border-gray-700 ${patterns.focusRing}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
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
