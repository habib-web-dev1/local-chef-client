import React from "react";
import Input from "./Input";
import { useDesignSystem } from "../../context/DesignSystemContext";

const FormField = ({
  children,
  label,
  error,
  success,
  helperText,
  required = false,
  className = "",
  ...props
}) => {
  const { patterns } = useDesignSystem();

  if (children) {
    return (
      <div className={`form-field space-y-2 ${className}`}>
        {label && (
          <label
            className={`form-label ${
              error
                ? "text-red-700 dark:text-red-300"
                : success
                ? "text-green-700 dark:text-green-300"
                : ""
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {children}
        {(helperText || error || success) && (
          <div
            className={`text-sm ${
              error
                ? "form-error"
                : success
                ? "form-success"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {error || success || helperText}
          </div>
        )}
      </div>
    );
  }

  // Default to Input component
  return (
    <Input
      label={label}
      error={error}
      success={success}
      helperText={helperText}
      required={required}
      className={className}
      {...props}
    />
  );
};

export default FormField;
