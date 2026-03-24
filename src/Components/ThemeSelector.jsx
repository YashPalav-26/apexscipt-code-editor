import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { getAllThemes } from "../constants/themeConfig";

const ThemeSelector = ({ currentTheme, onThemeChange, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const themes = getAllThemes();
  const activeTheme = themes.find((t) => t.id === currentTheme);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "bg-[#2d2d2d] border-[#3c3c3c] hover:bg-[#3c3c3c] focus:ring-[#007acc]"
            : "bg-gray-50 border-[#e0e0e0] hover:bg-gray-100 focus:ring-[#0066b8]"
        }`}
        aria-label="Select theme"
        title="Choose theme"
      >
        <FontAwesomeIcon
          icon={faPalette}
          className={`w-3.5 h-3.5 ${
            isDarkMode ? "text-[#007acc]" : "text-[#0066b8]"
          }`}
        />
        <span className="text-sm font-medium hidden sm:inline">
          {activeTheme?.label || "Theme"}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 rounded-lg shadow-xl border z-50 min-w-56 overflow-hidden ${
            isDarkMode
              ? "bg-[#252526] border-[#3c3c3c]"
              : "bg-white border-[#e0e0e0]"
          }`}
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onThemeChange(theme.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-colors duration-150 ${
                currentTheme === theme.id
                  ? isDarkMode
                    ? "bg-[#094771]"
                    : "bg-[#e8f4fc]"
                  : isDarkMode
                    ? "hover:bg-[#2a2d2e]"
                    : "hover:bg-gray-100"
              }`}
            >
              <div
                className="w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: theme.colors.accent,
                  borderColor: theme.colors.foreground,
                }}
              />
              <span className="flex-1">{theme.label}</span>
              {currentTheme === theme.id && (
                <span
                  className={`text-xs font-bold ${
                    isDarkMode ? "text-[#007acc]" : "text-[#0066b8]"
                  }`}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
