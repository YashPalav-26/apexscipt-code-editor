import { useState, useCallback, useEffect } from "react";
import {
  getThemeById,
  fontSizeConfig,
  validateFontSize,
  getFontFamilyById,
} from "../constants/themeConfig";

/**
 * Custom hook for managing theme and editor customization
 * Handles persistence to localStorage and state management
 */
const useThemeCustomization = () => {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("phxcode_theme");
      return savedTheme || "vs-dark";
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
      return "vs-dark";
    }
  });

  const [fontSize, setFontSizeState] = useState(() => {
    try {
      const savedSize = localStorage.getItem("phxcode_fontSize");
      return savedSize ? validateFontSize(savedSize) : fontSizeConfig.default;
    } catch (error) {
      console.warn("Failed to load fontSize from localStorage:", error);
      return fontSizeConfig.default;
    }
  });

  const [fontFamily, setFontFamilyState] = useState(() => {
    try {
      const savedFont = localStorage.getItem("phxcode_fontFamily");
      return savedFont || "jetbrains-mono";
    } catch (error) {
      console.warn("Failed to load fontFamily from localStorage:", error);
      return "jetbrains-mono";
    }
  });

  // Set theme and persist to localStorage
  const setTheme = useCallback((themeId) => {
    try {
      const validTheme = getThemeById(themeId);
      setThemeState(validTheme.id);
      localStorage.setItem("phxcode_theme", validTheme.id);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }
  }, []);

  // Set font size and persist to localStorage
  const setFontSize = useCallback((size) => {
    try {
      const validSize = validateFontSize(size);
      setFontSizeState(validSize);
      localStorage.setItem("phxcode_fontSize", validSize.toString());
    } catch (error) {
      console.warn("Failed to save fontSize to localStorage:", error);
    }
  }, []);

  // Set font family and persist to localStorage
  const setFontFamily = useCallback((fontId) => {
    try {
      const validFont = getFontFamilyById(fontId);
      setFontFamilyState(validFont.id);
      localStorage.setItem("phxcode_fontFamily", validFont.id);
    } catch (error) {
      console.warn("Failed to save fontFamily to localStorage:", error);
    }
  }, []);

  // Get current theme object
  const currentTheme = getThemeById(theme);

  // Get current font family object
  const currentFontFamily = getFontFamilyById(fontFamily);

  return {
    // Theme
    theme,
    setTheme,
    currentTheme,
    isDark: currentTheme.isDark,
    themeColors: currentTheme.colors,

    // Font customization
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    currentFontFamily,

    // Config info
    fontSizeConfig,
  };
};

export default useThemeCustomization;
