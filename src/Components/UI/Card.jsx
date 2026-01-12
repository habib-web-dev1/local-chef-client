import React from "react";
import { useDesignSystem } from "../../context/DesignSystemContext";

const Card = React.forwardRef(
  (
    {
      children,
      variant = "default",
      padding = "md",
      shadow = "sm",
      hover = true,
      border = true,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const { patterns, validateProps } = useDesignSystem();

    if (process.env.NODE_ENV === "development") {
      validateProps("Card", { variant, padding, shadow, ...props });
    }

    // Base card classes
    const baseClasses = `
    rounded-2xl ${patterns.transition} overflow-hidden
    ${onClick ? "cursor-pointer" : ""}
  `;

    // Variant styles
    const variantClasses = {
      default: "bg-white dark:bg-gray-800",
      elevated: "bg-white dark:bg-gray-800",
      outlined: "bg-white dark:bg-gray-800",
      filled: "bg-gray-50 dark:bg-gray-700",
      gradient:
        "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700",
    };

    // Padding variants
    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
      xl: "p-8",
    };

    // Shadow variants
    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    };

    // Hover effects
    const hoverClasses = hover
      ? {
          none: "",
          sm: "hover:shadow-md",
          md: "hover:shadow-lg",
          lg: "hover:shadow-xl",
          xl: "hover:shadow-2xl",
        }
      : { none: "", sm: "", md: "", lg: "", xl: "" };

    // Border classes
    const borderClasses = border
      ? "border border-gray-100 dark:border-gray-700"
      : "";

    // Combine all classes
    const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${hoverClasses[shadow]}
    ${borderClasses}
    ${className}
  `
      .replace(/\s+/g, " ")
      .trim();

    return (
      <div ref={ref} className={cardClasses} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/**
 * Card Header Component
 */
const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`border-b border-gray-100 dark:border-gray-700 pb-4 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Body Component
 */
const CardBody = ({ children, className = "", ...props }) => {
  return (
    <div className={`flex-grow ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`border-t border-gray-100 dark:border-gray-700 pt-4 mt-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Title Component
 */
const CardTitle = ({ children, size = "lg", className = "", ...props }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <h3
      className={`font-bold text-gray-900 dark:text-white ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

/**
 * Card Description Component
 */
const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-gray-600 dark:text-gray-300 ${className}`} {...props}>
      {children}
    </p>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
