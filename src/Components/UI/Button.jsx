import React from "react";
import { useDesignSystem } from "../../context/DesignSystemContext";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const { patterns, validateProps } = useDesignSystem();

    if (process.env.NODE_ENV === "development") {
      validateProps("Button", { variant, size, ...props });
    }

    // Base button classes
    const baseClasses = `
    inline-flex items-center justify-center font-semibold rounded-xl
    ${patterns.transition} focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
  `;

    // Size variants
    const sizeClasses = {
      sm: "px-3 py-2 text-sm min-h-[36px]",
      md: "px-4 py-2.5 text-sm min-h-[44px]",
      lg: "px-6 py-3 text-base min-h-[48px]",
      xl: "px-8 py-4 text-lg min-h-[52px]",
    };

    // Variant styles
    const variantClasses = {
      primary: `
      bg-orange-600 text-white hover:bg-orange-700
      focus:ring-orange-500 shadow-md hover:shadow-lg
      disabled:hover:bg-orange-600
    `,
      secondary: `
      bg-gray-200 text-gray-900 hover:bg-gray-300
      focus:ring-gray-500 dark:bg-gray-700 dark:text-white
      dark:hover:bg-gray-600 disabled:hover:bg-gray-200
      dark:disabled:hover:bg-gray-700
    `,
      outline: `
      border-2 border-orange-600 text-orange-600 bg-transparent
      hover:bg-orange-600 hover:text-white focus:ring-orange-500
      disabled:hover:bg-transparent disabled:hover:text-orange-600
    `,
      ghost: `
      text-gray-600 bg-transparent hover:bg-gray-100
      focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800
      disabled:hover:bg-transparent
    `,
      danger: `
      bg-red-600 text-white hover:bg-red-700
      focus:ring-red-500 shadow-md hover:shadow-lg
      disabled:hover:bg-red-600
    `,
      success: `
      bg-green-600 text-white hover:bg-green-700
      focus:ring-green-500 shadow-md hover:shadow-lg
      disabled:hover:bg-green-600
    `,
    };

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Combine all classes
    const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `
      .replace(/\s+/g, " ")
      .trim();

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {leftIcon && !loading && (
          <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}
        <span className={loading ? "opacity-70" : ""}>{children}</span>
        {rightIcon && !loading && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
