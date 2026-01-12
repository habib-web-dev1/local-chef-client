export const APPROVED_COLORS = {
  primary: "234 88 12",
  secondary: "31 41 55",
  accent: "245 158 11",
  neutral: {
    50: "249 250 251",
    100: "243 244 246",
    200: "229 231 235",
    300: "209 213 219",
    400: "156 163 175",
    500: "107 114 128",
    600: "75 85 99",
    700: "55 65 81",
    800: "31 41 55",
    900: "17 24 39",
    950: "3 7 18",
  },
  semantic: {
    success: "16 185 129",
    warning: "245 158 11",
    error: "239 68 68",
    info: "59 130 246",
  },
};

// Approved spacing tokens
export const SPACING_TOKENS = [
  "0.25rem",
  "0.5rem",
  "0.75rem",
  "1rem",
  "1.25rem",
  "1.5rem",
  "2rem",
  "2.5rem",
  "3rem",
  "4rem",
  "5rem",
  "6rem",
];

// Approved typography scale
export const TYPOGRAPHY_SCALE = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
};

// Approved border radius values
export const BORDER_RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
};

export const isColorInPalette = (color) => {
  if (!color) return false;

  // Remove common CSS color prefixes and normalize
  const normalizedColor = color
    .replace(/rgb\(|\)|rgba\(|hsl\(|hsla\(/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Check against approved colors
  const allApprovedColors = [
    APPROVED_COLORS.primary,
    APPROVED_COLORS.secondary,
    APPROVED_COLORS.accent,
    ...Object.values(APPROVED_COLORS.neutral),
    ...Object.values(APPROVED_COLORS.semantic),
  ];

  return (
    allApprovedColors.includes(normalizedColor) ||
    color === "transparent" ||
    color === "inherit" ||
    color === "currentColor"
  );
};

export const isValidSpacingToken = (spacing) => {
  if (!spacing) return false;

  const spacingValues = spacing.split(" ");

  return spacingValues.every(
    (value) =>
      SPACING_TOKENS.includes(value) ||
      value === "0" ||
      value === "auto" ||
      value === "inherit"
  );
};

export const isValidTypographyScale = (fontSize) => {
  if (!fontSize) return false;

  return (
    Object.values(TYPOGRAPHY_SCALE).includes(fontSize) || fontSize === "inherit"
  );
};

export const isValidBorderRadius = (borderRadius) => {
  if (!borderRadius) return false;

  return (
    Object.values(BORDER_RADIUS).includes(borderRadius) ||
    borderRadius === "0" ||
    borderRadius === "inherit"
  );
};

export const getDesignToken = (property) => {
  return `var(--${property})`;
};

export const createColorWithOpacity = (colorToken, opacity = 1) => {
  return `rgb(var(--${colorToken}) / ${opacity})`;
};

export const validateComponentProps = (props) => {
  const results = {
    valid: true,
    errors: [],
  };

  // Validate color props
  if (props.color && !isColorInPalette(props.color)) {
    results.valid = false;
    results.errors.push(`Invalid color: ${props.color}`);
  }

  // Validate spacing props (but allow component-specific values)
  ["margin", "gap"].forEach((prop) => {
    if (props[prop] && !isValidSpacingToken(props[prop])) {
      results.valid = false;
      results.errors.push(`Invalid ${prop}: ${props[prop]}`);
    }
  });

  // Special handling for padding - allow component variants
  if (props.padding) {
    const validPaddingVariants = ["none", "sm", "md", "lg", "xl"];
    if (
      !validPaddingVariants.includes(props.padding) &&
      !isValidSpacingToken(props.padding)
    ) {
      results.valid = false;
      results.errors.push(`Invalid padding: ${props.padding}`);
    }
  }

  // Validate typography props
  if (props.fontSize && !isValidTypographyScale(props.fontSize)) {
    results.valid = false;
    results.errors.push(`Invalid fontSize: ${props.fontSize}`);
  }

  // Validate border radius props
  if (props.borderRadius && !isValidBorderRadius(props.borderRadius)) {
    results.valid = false;
    results.errors.push(`Invalid borderRadius: ${props.borderRadius}`);
  }

  return results;
};

// Export design system configuration for easy access
export const DESIGN_SYSTEM = {
  colors: APPROVED_COLORS,
  spacing: SPACING_TOKENS,
  typography: TYPOGRAPHY_SCALE,
  borderRadius: BORDER_RADIUS,
  // Standard component dimensions
  components: {
    mealCard: {
      width: "320px",
      height: "400px",
      borderRadius: BORDER_RADIUS["2xl"],
    },
    button: {
      minHeight: "44px", // Minimum touch target
      borderRadius: BORDER_RADIUS.xl,
    },
    input: {
      minHeight: "44px",
      borderRadius: BORDER_RADIUS.xl,
    },
  },
};
