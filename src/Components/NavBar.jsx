import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faMoon,
  faSun,
  faSave,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import phxlogo from "../assets/phxlogo.svg";

const Navbar = ({
  language,
  handleLanguageChange,
  theme,
  setTheme,
  isDarkMode,
  toggleTheme,
  onRunCode,
  onNewFile,
  saveCode,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages = [
    { label: "JavaScript", value: "javascript", icon: "JS" },
    { label: "Java", value: "java", icon: "JV" },
    { label: "C", value: "c", icon: "C" },
    { label: "C++", value: "cpp", icon: "C++" },
    { label: "Python", value: "python", icon: "PY" },
    { label: "C#", value: "csharp", icon: "C#" },
    { label: "PHP", value: "php", icon: "PHP" },
    { label: "TypeScript", value: "typescript", icon: "TS" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.value === language) || languages[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 lg:px-6 border-b transition-colors duration-200 ${
        isDarkMode
          ? "bg-[#1e1e1e] border-[#3c3c3c] text-white"
          : "bg-white border-[#e0e0e0] text-gray-900"
      }`}
    >
      {/* Left Section: Logo & Branding */}
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

      {/* Center Section: Language Selector & Run Button */}
      <div className="flex items-center space-x-3 flex-grow justify-center px-4">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-[#2d2d2d] border-[#3c3c3c] hover:bg-[#3c3c3c] focus:ring-[#007acc]"
                : "bg-gray-50 border-[#e0e0e0] hover:bg-gray-100 focus:ring-[#0066b8]"
            }`}
            aria-label="Select programming language"
          >
            <span
              className={`text-xs font-mono font-bold ${
                isDarkMode ? "text-[#007acc]" : "text-[#0066b8]"
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
              className={`absolute top-full left-0 mt-2 w-44 rounded-lg shadow-xl border overflow-hidden z-50 ${
                isDarkMode
                  ? "bg-[#252526] border-[#3c3c3c]"
                  : "bg-white border-[#e0e0e0]"
              }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => {
                    handleLanguageChange({ target: { value: lang.value } });
                    setIsLangDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-colors duration-150 ${
                    language === lang.value
                      ? isDarkMode
                        ? "bg-[#094771]"
                        : "bg-[#e8f4fc]"
                      : isDarkMode
                        ? "hover:bg-[#2a2d2e]"
                        : "hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold ${
                      isDarkMode ? "text-[#007acc]" : "text-[#0066b8]"
                    }`}
                  >
                    {lang.icon}
                  </span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Run Button - Primary CTA */}
        <button
          onClick={onRunCode}
          className={`flex items-center space-x-2 px-5 py-1.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-95 ${
            isDarkMode
              ? "bg-[#2ea44f] hover:bg-[#2c974b] text-white focus:ring-[#2ea44f] focus:ring-offset-[#1e1e1e]"
              : "bg-[#2ea44f] hover:bg-[#2c974b] text-white focus:ring-[#2ea44f] focus:ring-offset-white"
          }`}
          aria-label="Run code (Ctrl+Enter)"
        >
          <FontAwesomeIcon icon={faPlay} className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Run</span>
        </button>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* New File Button */}
        <button
          onClick={onNewFile}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "hover:bg-[#2d2d2d] focus:ring-[#007acc]"
              : "hover:bg-gray-100 focus:ring-[#0066b8]"
          }`}
          aria-label="New file"
          title="Create new file"
        >
          <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
        </button>
        {/* Save Button */}
        <button
          onClick={saveCode}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "hover:bg-[#2d2d2d] focus:ring-[#007acc]"
              : "hover:bg-gray-100 focus:ring-[#0066b8]"
          }`}
          aria-label="Save code"
          title="Download code"
        >
          <FontAwesomeIcon icon={faSave} className="w-5 h-5" />
        </button>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
            isDarkMode
              ? "hover:bg-[#2d2d2d] focus:ring-[#007acc]"
              : "hover:bg-gray-100 focus:ring-[#0066b8]"
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
