import React, { createContext, useContext } from "react";

/**
 * Theme Context for providing theme colors and customization
 * throughout the application without prop drilling
 */
const ThemeContext = createContext(null);

/**
 * ThemeProvider component - wrap your app with this
 */
export const ThemeProvider = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme hook - use this in any component to access theme
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn(
      "useTheme must be used within a ThemeProvider. Using default values."
    );
    return {
      isDark: true,
      theme: "vs-dark",
      themeColors: {},
      fontSize: 14,
      fontFamily: "'JetBrains Mono', monospace",
    };
  }
  return context;
};

export default ThemeContext;
