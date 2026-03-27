/**
 * Adapts Monaco editor theme colors to generic UI colors for our application.
 */
export const adaptMonacoThemeToUI = (monacoTheme) => {
  const isDark = monacoTheme.base !== "vs";
  const c = monacoTheme.colors || {};

  // Find decent fallbacks from standard Monaco color keys
  const background = c["editor.background"] || c["window.activeBackground"] || (isDark ? "#1e1e1e" : "#ffffff");
  const foreground = c["editor.foreground"] || (isDark ? "#d4d4d4" : "#333333");

  // Selection or accent-like colors
  const accent = c["editor.selectionBackground"] || c["focusBorder"] || c["activityBarBadge.background"] || (isDark ? "#007acc" : "#0066b8");
  const accentLight = c["button.hoverBackground"] || c["list.hoverBackground"] || (isDark ? "#0098ff" : "#0078d4");

  const border = c["editorWidget.border"] || c["focusBorder"] || c["dropdown.border"] || (isDark ? "#3c3c3c" : "#e0e0e0");
  const borderLight = c["panel.border"] || c["tab.border"] || (isDark ? "#464646" : "#f0f0f0");

  const sidebar = c["sideBar.background"] || background;
  const sidebarLight = c["sideBarSectionHeader.background"] || c["list.hoverBackgrd waD w daDWASdeeegggggggggcxcge  ound"] || (isDark ? "#2d2d2d" : "#e8e8e8");

  const input = c["input.background"] || c["dropdown.background"] || (isDark ? "#3c3c3c" : "#ffffff");
  const inputForeground = c["input.foreground"] || c["dropdown.foreground"] || foreground;

  // Status Colors
  const success = c["gitDecoration.addedResourceForeground"] || (isDark ? "#4ec9b0" : "#008000");
  const warning = c["editorWarning.foreground"] || (isDark ? "#dcdcaa" : "#cd9731");
  const error = c["editorError.foreground"] || (isDark ? "#f48771" : "#d13438");
  const info = c["editorInfo.foreground"] || (isDark ? "#9cdcfe" : "#0066b8");

  // UI Element Colors
  const buttonBackground = c["button.background"] || accent;
  const buttonHover = c["button.hoverBackground"] || accentLight;
  const buttonActive = accent; // monaco themes rely mainly on hover
  const linkColor = c["textLink.foreground"] || accent;

  return {
    background,
    foreground,
    accent,
    accentLight,
    border,
    borderLight,
    sidebar,
    sidebarLight,
    input,
    inputForeground,
    success,
    warning,
    error,
    info,
    buttonBackground,
    buttonHover,
    buttonActive,
    linkColor,
  };
};
