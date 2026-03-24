/**
 * Theme Configuration System
 * Centralized theme definitions for all editor and UI themes
 * Each theme includes colors for editor, UI, and Monaco syntax highlighting
 */

export const themeConfig = [
  {
    id: "vs-dark",
    label: "VS Dark",
    isDark: true,
    monacoTheme: "vs-dark",
    colors: {
      // Editor/UI Colors
      background: "#1e1e1e",
      foreground: "#d4d4d4",
      accent: "#007acc",
      accentLight: "#0098ff",
      border: "#3c3c3c",
      borderLight: "#464646",
      sidebar: "#252526",
      sidebarLight: "#2d2d2d",
      input: "#3c3c3c",
      inputForeground: "#d4d4d4",
      
      // Status Colors
      success: "#4ec9b0",
      warning: "#dcdcaa",
      error: "#f48771",
      info: "#9cdcfe",
      
      // UI Element Colors
      buttonBackground: "#0e639c",
      buttonHover: "#1177bb",
      buttonActive: "#094771",
      linkColor: "#569cd6",
      
      // Monaco Syntax Colors
      comment: "#6a9955",
      string: "#ce9178",
      number: "#b5cea8",
      keyword: "#569cd6",
      operator: "#d4d4d4",
      variable: "#9cdcfe",
      function: "#dcdcaa",
      type: "#4ec9b0",
    },
  },
  {
    id: "vs-light",
    label: "VS Light",
    isDark: false,
    monacoTheme: "vs",
    colors: {
      background: "#ffffff",
      foreground: "#333333",
      accent: "#0066b8",
      accentLight: "#0078d4",
      border: "#e0e0e0",
      borderLight: "#f0f0f0",
      sidebar: "#f8f8f8",
      sidebarLight: "#e8e8e8",
      input: "#ffffff",
      inputForeground: "#333333",
      
      success: "#008000",
      warning: "#cd9731",
      error: "#d13438",
      info: "#0066b8",
      
      buttonBackground: "#0066b8",
      buttonHover: "#005a9e",
      buttonActive: "#004578",
      linkColor: "#0066b8",
      
      comment: "#008000",
      string: "#a31515",
      number: "#098658",
      keyword: "#0000ff",
      operator: "#333333",
      variable: "#001080",
      function: "#795e26",
      type: "#267f99",
    },
  },
  {
    id: "dracula",
    label: "Dracula",
    isDark: true,
    monacoTheme: "vs-dark",
    colors: {
      background: "#282a36",
      foreground: "#f8f8f2",
      accent: "#bd93f9",
      accentLight: "#d7acff",
      border: "#44475a",
      borderLight: "#6272a4",
      sidebar: "#21222c",
      sidebarLight: "#44475a",
      input: "#44475a",
      inputForeground: "#f8f8f2",
      
      success: "#50fa7b",
      warning: "#f1fa8c",
      error: "#ff5555",
      info: "#8be9fd",
      
      buttonBackground: "#bd93f9",
      buttonHover: "#d7acff",
      buttonActive: "#a878ff",
      linkColor: "#8be9fd",
      
      comment: "#6272a4",
      string: "#f1fa8c",
      number: "#bd93f9",
      keyword: "#ff79c6",
      operator: "#f8f8f2",
      variable: "#8be9fd",
      function: "#50fa7b",
      type: "#8be9fd",
    },
  },
  {
    id: "monokai",
    label: "Monokai",
    isDark: true,
    monacoTheme: "vs-dark",
    colors: {
      background: "#272822",
      foreground: "#f8f8f2",
      accent: "#66d9ef",
      accentLight: "#a1efe4",
      border: "#3e3d32",
      borderLight: "#49483e",
      sidebar: "#23241f",
      sidebarLight: "#3e3d32",
      input: "#3e3d32",
      inputForeground: "#f8f8f2",
      
      success: "#a6e22e",
      warning: "#e6db74",
      error: "#f92672",
      info: "#66d9ef",
      
      buttonBackground: "#66d9ef",
      buttonHover: "#a1efe4",
      buttonActive: "#1e90ff",
      linkColor: "#a1efe4",
      
      comment: "#75715e",
      string: "#e6db74",
      number: "#ae81ff",
      keyword: "#f92672",
      operator: "#f8f8f2",
      variable: "#66d9ef",
      function: "#a6e22e",
      type: "#66d9ef",
    },
  },
  {
    id: "solarized-dark",
    label: "Solarized Dark",
    isDark: true,
    monacoTheme: "vs-dark",
    colors: {
      background: "#002b36",
      foreground: "#839496",
      accent: "#268bd2",
      accentLight: "#2aa198",
      border: "#073642",
      borderLight: "#586e75",
      sidebar: "#073642",
      sidebarLight: "#586e75",
      input: "#073642",
      inputForeground: "#839496",
      
      success: "#859900",
      warning: "#b58900",
      error: "#dc322f",
      info: "#268bd2",
      
      buttonBackground: "#268bd2",
      buttonHover: "#2aa198",
      buttonActive: "#6c71c4",
      linkColor: "#268bd2",
      
      comment: "#586e75",
      string: "#2aa198",
      number: "#d33682",
      keyword: "#859900",
      operator: "#839496",
      variable: "#268bd2",
      function: "#b58900",
      type: "#2aa198",
    },
  },
  {
    id: "solarized-light",
    label: "Solarized Light",
    isDark: false,
    monacoTheme: "vs",
    colors: {
      background: "#fdf6e3",
      foreground: "#657b83",
      accent: "#268bd2",
      accentLight: "#2aa198",
      border: "#eee8d5",
      borderLight: "#d6d0be",
      sidebar: "#eee8d5",
      sidebarLight: "#d6d0be",
      input: "#ffffff",
      inputForeground: "#657b83",
      
      success: "#859900",
      warning: "#b58900",
      error: "#dc322f",
      info: "#268bd2",
      
      buttonBackground: "#268bd2",
      buttonHover: "#2aa198",
      buttonActive: "#6c71c4",
      linkColor: "#268bd2",
      
      comment: "#93a1a1",
      string: "#2aa198",
      number: "#d33682",
      keyword: "#859900",
      operator: "#657b83",
      variable: "#268bd2",
      function: "#b58900",
      type: "#2aa198",
    },
  },
];

/**
 * Get theme by ID
 */
export const getThemeById = (themeId) => {
  return themeConfig.find((t) => t.id === themeId) || themeConfig[0];
};

/**
 * Get all themes
 */
export const getAllThemes = () => {
  return themeConfig;
};

/**
 * Create color variables object for CSS-in-JS
 */
export const getThemeColors = (themeId) => {
  const theme = getThemeById(themeId);
  return theme.colors;
};

/**
 * Available font families
 */
export const fontFamilies = [
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    value: "'JetBrains Mono', monospace",
  },
  {
    id: "fira-code",
    label: "Fira Code",
    value: "'Fira Code', monospace",
  },
  {
    id: "consolas",
    label: "Consolas",
    value: "'Consolas', monospace",
  },
  {
    id: "monaco",
    label: "Monaco",
    value: "'Monaco', monospace",
  },
  {
    id: "courier-new",
    label: "Courier New",
    value: "'Courier New', monospace",
  },
];

/**
 * Get font family by ID
 */
export const getFontFamilyById = (fontId) => {
  return fontFamilies.find((f) => f.id === fontId) || fontFamilies[0];
};

/**
 * Font size range configuration
 */
export const fontSizeConfig = {
  min: 12,
  max: 24,
  default: 14,
  step: 1,
};

/**
 * Validate and constrain font size
 */
export const validateFontSize = (size) => {
  const numSize = parseInt(size);
  if (isNaN(numSize)) return fontSizeConfig.default;
  return Math.max(
    fontSizeConfig.min,
    Math.min(fontSizeConfig.max, numSize)
  );
};
