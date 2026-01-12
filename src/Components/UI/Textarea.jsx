import React, { useState } from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { useDesignSystem } from "../../context/DesignSystemContext";

const Textarea = React.forwardRef(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      success,
      helperText,
      required = false,
      disabled = false,
      fullWidth = true,
      rows = 4,
      maxLength,
      showCharCount = false,
      resize = "vertical",
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
      validateProps("Textarea", { resize, ...props });
    }

    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const baseTextareaClasses = `
    ${fullWidth ? "w-full" : ""} px-4 py-3 text-sm border rounded-xl
    ${patterns.transition} focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    min-h-[44px]
  `;

    // Resize classes
    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

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

    // Combine all textarea classes
    const textareaClasses = `
    ${baseTextareaClasses}
    ${getStateClasses()}
    ${resizeClasses[resize]}
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

    // Character count
    const currentLength = value ? value.length : 0;
    const isNearLimit = maxLength && currentLength > maxLength * 0.8;
    const isOverLimit = maxLength && currentLength > maxLength;

    return (
      <div className={`form-field ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label htmlFor={textareaId} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            className={textareaClasses}
            {...props}
          />

          {/* Character Count */}
          {showCharCount && maxLength && (
            <div
              className={`absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-white dark:bg-gray-800 border ${
                isOverLimit
                  ? "text-red-600 border-red-300"
                  : isNearLimit
                  ? "text-amber-600 border-amber-300"
                  : "text-gray-500 border-gray-300"
              }`}
            >
              {currentLength}/{maxLength}
            </div>
          )}
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

Textarea.displayName = "Textarea";

export default Textarea;
