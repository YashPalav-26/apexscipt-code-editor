import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faMoon,
  faSun,
  faSave,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { languageConfig } from "../constants/languageConfig";
import CustomizationPanel from "./CustomizationPanel";
import phxlogo from "../assets/phxlogo.svg";

const Navbar = ({
  language,
  handleLanguageChange,
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  fontFamily,
  onFontFamilyChange,
  isDarkMode,
  toggleTheme,
  onRunCode,
  onNewFile,
  saveCode,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Create languages array from config, with formatted structure for UI
  const languages = languageConfig.map((lang) => ({
    label: lang.label,
    value: lang.id,
    icon: lang.icon,
  }));

  const currentLanguage =
    languages.find((lang) => lang.value === language) || languages[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 lg:px-6 border-b transition-colors duration-200 ${"bg-[var(--theme-bg)] border-[var(--theme-border)] text-[var(--theme-fg)]"
        }`}
    >
      <div className="flex items-center space-x-3 flex-shrink-0">
        <img
          src={phxlogo}
          alt="PhxCode Logo"
          className="w-8 h-8 flex-shrink-0"
        />
        <div className="hidden sm:flex flex-col justify-center">
          <span className="text-base font-bold leading-tight">PhxCode</span>
          <span className="text-xs font-medium leading-tight opacity-75">
            Code Editor
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-3 flex-grow justify-center px-4">
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${isDarkMode
                ? "bg-[var(--theme-bg-hover)] border-[var(--theme-border)] hover:bg-[var(--theme-input)] focus:ring-[var(--theme-accent)]"
                : "bg-[var(--theme-bg-hover)] border-[var(--theme-border)] hover:bg-[var(--theme-bg-hover)] focus:ring-[var(--theme-accent)]"
              }`}
            aria-label="Select programming language"
          >
            <span
              className={`text-xs font-mono font-bold ${"text-[var(--theme-accent)]"
                }`}
            >
              {currentLanguage.icon}
            </span>
            <span className="text-sm font-medium hidden sm:inline">
              {currentLanguage.label}
            </span>
          </button>

          {isLangDropdownOpen && (
            <div
              className={`absolute top-full left-0 mt-2 rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto min-w-56 ${isDarkMode
                  ? "bg-[var(--theme-sidebar)] border-[var(--theme-border)]"
                  : "bg-[var(--theme-bg)] border-[var(--theme-border)]"
                }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => {
                    handleLanguageChange({ target: { value: lang.value } });
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-colors duration-150 ${language === lang.value
                      ? "bg-[var(--theme-active)]"
                      : "hover:bg-[var(--theme-bg-hover)]"
                    }`}
                >
                  <span
                    className={`text-xs font-mono font-bold min-w-8 ${"text-[var(--theme-accent)]"
                      }`}
                  >
                    {lang.icon}
                  </span>
                  <span className="flex-1">{lang.label}</span>
                  {language === lang.value && (
                    <span className={`text-xs font-bold ${"text-[var(--theme-accent)]"}`}>✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onRunCode}
          className={`flex items-center space-x-2 px-5 py-1.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 shadow-sm ${
            isDarkMode
              ? "bg-[var(--theme-accent)] hover:brightness-110 text-white focus:ring-[var(--theme-accent)] focus:ring-offset-[var(--theme-bg)]"
              : "bg-[var(--theme-accent)] hover:brightness-110 text-white focus:ring-[var(--theme-accent)] focus:ring-offset-[var(--theme-bg)]"
          }`}
          aria-label="Run code (Ctrl+Enter)"
        >
          <FontAwesomeIcon icon={faPlay} className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Run</span>
        </button>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={onNewFile}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${"hover:bg-[var(--theme-bg-hover)] focus:ring-[var(--theme-accent)]"
            }`}
          aria-label="New file"
          title="Create new file"
        >
          <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
        </button>
        <button
          onClick={saveCode}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${"hover:bg-[var(--theme-bg-hover)] focus:ring-[var(--theme-accent)]"
            }`}
          aria-label="Save code"
          title="Download code"
        >
          <FontAwesomeIcon icon={faSave} className="w-5 h-5" />
        </button>
        <CustomizationPanel
          theme={theme}
          fontSize={fontSize}
          fontFamily={fontFamily}
          onThemeChange={onThemeChange}
          onFontSizeChange={onFontSizeChange}
          onFontFamilyChange={onFontFamilyChange}
          isDarkMode={isDarkMode}
        />
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${"hover:bg-[var(--theme-bg-hover)] focus:ring-[var(--theme-accent)]"
            }`}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={isDarkMode ? "Light mode" : "Dark mode"}
        >
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            className="w-5 h-5"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
