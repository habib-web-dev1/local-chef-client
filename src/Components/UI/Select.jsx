import React, { useState } from "react";
import {
  FaChevronDown,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { useDesignSystem } from "../../context/DesignSystemContext";

const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      value,
      onChange,
      onBlur,
      error,
      success,
      helperText,
      placeholder = "Select an option...",
      required = false,
      disabled = false,
      fullWidth = true,
      size = "md",
      className = "",
      id,
      name,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const { patterns, validateProps } = useDesignSystem();

    if (process.env.NODE_ENV === "development") {
      validateProps("Select", { size, ...props });
    }

    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Size variants
    const sizeClasses = {
      sm: "px-3 py-2 text-sm min-h-[36px]",
      md: "px-4 py-3 text-sm min-h-[44px]",
      lg: "px-5 py-4 text-base min-h-[48px]",
    };

    // Base select classes
    const baseSelectClasses = `
    ${fullWidth ? "w-full" : ""} border rounded-xl ${patterns.transition}
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none bg-no-repeat bg-right pr-10
    cursor-pointer
  `;

    // State-based styling
    const getStateClasses = () => {
      if (error) {
        return `
        border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10
        focus:border-red-500 focus:ring-red-500 text-red-900 dark:text-red-100
      `;
      }

      if (success) {
        return `
        border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/10
        focus:border-green-500 focus:ring-green-500 text-green-900 dark:text-green-100
      `;
      }

      return `
      border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
      focus:border-orange-500 focus:ring-orange-500 text-gray-900 dark:text-white
      ${isFocused ? "ring-2 ring-orange-500 border-orange-500" : ""}
    `;
    };

    // Combine all select classes
    const selectClasses = `
    ${baseSelectClasses}
    ${sizeClasses[size]}
    ${getStateClasses()}
    ${className}
  `
      .replace(/\s+/g, " ")
      .trim();

    // Label classes
    const labelClasses = `
    block text-sm font-semibold mb-2
    ${
      error
        ? "text-red-700 dark:text-red-300"
        : success
        ? "text-green-700 dark:text-green-300"
        : "text-gray-700 dark:text-gray-300"
    }
  `;

    const helperTextClasses = `
    mt-2 text-sm flex items-center gap-2
    ${
      error
        ? "text-red-600 dark:text-red-400"
        : success
        ? "text-green-600 dark:text-green-400"
        : "text-gray-500 dark:text-gray-400"
    }
  `;

    const handleFocus = (e) => {
      setIsFocused(true);
      if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const normalizedOptions = options.map((option) => {
      if (typeof option === "string") {
        return { value: option, label: option };
      }
      return option;
    });

    return (
      <div className={`form-field ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            className={selectClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {normalizedOptions.map((option, index) => (
              <option
                key={option.value || index}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown Arrow */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FaChevronDown
              className={`text-gray-400 ${
                error ? "text-red-400" : success ? "text-green-400" : ""
              }`}
            />
          </div>
        </div>

        {/* Helper Text / Error / Success Message */}
        {(helperText || error || success) && (
          <div className={helperTextClasses}>
            {error && <FaExclamationCircle className="flex-shrink-0" />}
            {success && <FaCheckCircle className="flex-shrink-0" />}
            <span>{error || success || helperText}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
