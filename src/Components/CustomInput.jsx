import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

const CustomInput = ({ input, setInput, isDarkMode }) => {
  return (
    <div className="p-3">
      <div className="flex items-center space-x-2 mb-2">
        <FontAwesomeIcon
          icon={faKeyboard}
          className={`w-4 h-4 ${
            isDarkMode ? "text-[#858585]" : "text-gray-500"
          }`}
        />
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${
            isDarkMode ? "text-[#858585]" : "text-gray-500"
          }`}
        >
          Input
        </span>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`w-full h-14 p-2.5 rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 transition-colors duration-200 border ${
          isDarkMode
            ? "bg-[#1e1e1e] text-[#d4d4d4] border-[#3c3c3c] focus:ring-[#007acc] placeholder-[#6b6b6b]"
            : "bg-gray-50 text-gray-800 border-[#e0e0e0] focus:ring-[#0066b8] placeholder-gray-400"
        }`}
        placeholder="Enter stdin input (optional)"
        aria-label="Custom input for stdin"
      />
    </div>
  );
};

export default CustomInput;
