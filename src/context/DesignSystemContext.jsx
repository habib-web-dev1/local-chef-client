import React, { createContext, useContext, useEffect, useState } from "react";
import { DESIGN_SYSTEM, validateComponentProps } from "../utils/designTokens";

const DesignSystemContext = createContext();

export const DesignSystemProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [designSystemConfig, setDesignSystemConfig] = useState({
    strictMode: process.env.NODE_ENV === "development",
    logViolations: process.env.NODE_ENV === "development",
  });

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const validateProps = (componentName, props) => {
    if (!designSystemConfig.strictMode) return;

    const validation = validateComponentProps(props);

    if (!validation.valid && designSystemConfig.logViolations) {
      console.warn(
        `Design System Violation in ${componentName}:`,
        validation.errors
      );
    }

    return validation;
  };

  const getToken = (tokenPath) => {
    const pathArray = tokenPath.split(".");
    let value = DESIGN_SYSTEM;

    for (const key of pathArray) {
      value = value?.[key];
      if (value === undefined) break;
    }

    return value;
  };

  const cssVar = (property) => {
    return `var(--${property})`;
  };

  const colorWithOpacity = (colorToken, opacity = 1) => {
    return `rgb(var(--${colorToken}) / ${opacity})`;
  };

  const value = {
    // Theme management
    theme,
    updateTheme,
    isDark: theme === "dark",

    // Design system utilities
    designSystem: DESIGN_SYSTEM,
    validateProps,
    getToken,
    cssVar,
    colorWithOpacity,

    // Configuration
    config: designSystemConfig,
    setConfig: setDesignSystemConfig,

    // Common design patterns
    patterns: {
      // Standard card shadow
      cardShadow: "shadow-sm hover:shadow-xl",

      // Standard transition
      transition: "transition-all duration-300",

      // Standard focus ring
      focusRing: "focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",

      // Standard border
      border: "border border-gray-200 dark:border-gray-700",

      // Standard text colors
      textPrimary: "text-gray-900 dark:text-white",
      textSecondary: "text-gray-600 dark:text-gray-300",
      textMuted: "text-gray-500 dark:text-gray-400",
    },
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);

  if (!context) {
    throw new Error(
      "useDesignSystem must be used within a DesignSystemProvider"
    );
  }

  return context;
};

export const withDesignSystemValidation = (Component, componentName) => {
  return React.forwardRef((props, ref) => {
    const { validateProps } = useDesignSystem();

    // Validate props in development
    if (process.env.NODE_ENV === "development") {
      validateProps(componentName, props);
    }

    return <Component {...props} ref={ref} />;
  });
};

export default DesignSystemContext;
