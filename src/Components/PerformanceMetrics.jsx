import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMemory } from "@fortawesome/free-solid-svg-icons";

const PerformanceMetrics = ({
  executionTime,
  memory,
  isDarkMode,
  isAnimating,
}) => {
  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === "N/A") return "N/A";
    const timeNum = parseFloat(timeStr);
    if (isNaN(timeNum)) return timeStr;
    if (timeNum < 1000) return `${timeNum.toFixed(2)}ms`;
    return `${(timeNum / 1000).toFixed(2)}s`;
  };
  const formatMemory = (memStr) => {
    if (!memStr || memStr === "N/A") return null;
    const memNum = parseFloat(memStr);
    if (isNaN(memNum)) return memStr;
    if (memNum < 1024) return `${memNum.toFixed(2)}KB`;
    return `${(memNum / 1024).toFixed(2)}MB`;
  };

  const displayTime = formatTime(executionTime);
  const displayMemory = formatMemory(memory);
  const hasMetrics = displayTime !== "N/A" || displayMemory;

  if (!hasMetrics) return null;

  return (
    <div
      className={`flex items-center space-x-4 px-4 py-2 border-b text-xs flex-shrink-0 transition-all duration-300 ${
        isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } ${
        isDarkMode
          ? "bg-[#1a1a1a] border-[#3c3c3c]"
          : "bg-[#f8f8f8] border-[#e0e0e0]"
      }`}
    >
      {/* Execution Time Metric */}
      {displayTime !== "N/A" && (
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faClock}
            className={`w-3.5 h-3.5 ${
              isDarkMode ? "text-[#007acc]" : "text-[#0066b8]"
            }`}
          />
          <span
            className={`font-mono ${
              isDarkMode ? "text-[#858585]" : "text-gray-500"
            }`}
          >
            {displayTime}
          </span>
        </div>
      )}

      {/* Memory Metric */}
      {displayMemory && (
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faMemory}
            className={`w-3.5 h-3.5 ${
              isDarkMode ? "text-[#007acc]" : "text-[#0066b8]"
            }`}
          />
          <span
            className={`font-mono ${
              isDarkMode ? "text-[#858585]" : "text-gray-500"
            }`}
          >
            {displayMemory}
          </span>
        </div>
      )}
    </div>
  );
};

export default PerformanceMetrics;
