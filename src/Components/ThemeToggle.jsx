import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <div
      className={`flex items-center w-16 h-8 bg-gray-300 rounded-full cursor-pointer relative transition-colors duration-300 ${
        isDarkMode ? "bg-gray-200" : " bg-gray-900"
      }`}
      onClick={toggleTheme}
    >
      <div
        className={`absolute w-6 h-6 bg-white border border-gray-300 rounded-full shadow-md transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      />
      <FontAwesomeIcon
        icon={isDarkMode ? faMoon : faSun}
        className={`absolute transition-colors duration-300 ${
          isDarkMode ? "text-gray-900 left-2" : " text-yellow-300 right-2"
        }`}
      />
    </div>
  );
};

export default ThemeToggle;
