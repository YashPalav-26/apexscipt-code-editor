import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faTrashAlt,
  faTerminal,
  faExclamationTriangle,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import PerformanceMetrics from "./PerformanceMetrics";

const OutputSection = ({
  output,
  error,
  setOutput,
  setError,
  input,
  setInput,
  handleCompileAndExecute,
  isDarkMode,
  executionTime,
  memoryUsage,
}) => {
  const [activeTab, setActiveTab] = useState("output");
  const [panelHeight, setPanelHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [isMetricsAnimating, setIsMetricsAnimating] = useState(false);
  const containerRef = useRef(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

  // Handle clearing output and errors
  const handleClearOutput = () => {
    setOutput("");
    setError("");
  };

  const tabs = [
    { id: "output", label: "Output", icon: faTerminal },
    { id: "errors", label: "Errors", icon: faExclamationTriangle },
  ];

  // Handle resize start
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startYRef.current = e.clientY;
    startHeightRef.current = panelHeight;
    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";
  };

  // Handle resize move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const deltaY = startYRef.current - e.clientY;
      const newHeight = Math.max(
        100,
        Math.min(700, startHeightRef.current + deltaY),
      );
      setPanelHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Trigger metrics animation when they update
  useEffect(() => {
    if (executionTime || memoryUsage) {
      setIsMetricsAnimating(true);
      const timer = setTimeout(() => setIsMetricsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [executionTime, memoryUsage]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col border rounded-lg overflow-hidden transition-colors duration-200 h-full ${isDarkMode
          ? "bg-[var(--theme-bg)] border-[var(--theme-border)] shadow-lg shadow-black/20"
          : "bg-[var(--theme-bg)] border-[var(--theme-border)] shadow-lg shadow-black/5"
        }`}
    >
      <div
        className={`hidden lg:h-1 lg:cursor-ns-resize lg:flex lg:items-center lg:justify-center transition-colors duration-150 ${"bg-[var(--theme-bg-hover)] hover:bg-[var(--theme-accent)]"
          } ${isResizing ? ("bg-[var(--theme-accent)]") : ""}`}
        onMouseDown={handleMouseDown}
      >
        <FontAwesomeIcon
          icon={faGripVertical}
          className={`w-4 h-2 ${"text-[var(--theme-muted)]"}`}
        />
      </div>
      <div
        className={`flex items-center justify-between border-b px-2 flex-shrink-0 ${"bg-[var(--theme-sidebar)] border-[var(--theme-border)]"
          }`}
      >
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 text-sm border-b-2 transition-colors duration-150 flex-shrink-0 whitespace-nowrap ${activeTab === tab.id
                  ? "text-[var(--theme-fg)] border-[var(--theme-accent)] bg-[var(--theme-bg)]"
                  : "text-[var(--theme-muted)] border-transparent hover:text-[var(--theme-fg)]"
                }`}
              aria-label={`View ${tab.label}`}
            >
              <FontAwesomeIcon icon={tab.icon} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id === "errors" && error && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-[var(--theme-fg)] font-semibold">
                  1
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          <button
            onClick={handleClearOutput}
            className={`p-1.5 rounded transition-colors duration-150 ${"text-[var(--theme-muted)] hover:bg-[var(--theme-bg-hover)] hover:text-[var(--theme-fg)]"
              }`}
            aria-label="Clear output"
            title="Clear output and errors"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Performance Metrics Bar */}
      <PerformanceMetrics
        executionTime={executionTime}
        memory={memoryUsage}
        isDarkMode={isDarkMode}
        isAnimating={isMetricsAnimating}
      />

      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === "output" && (
          <OutputWindow output={output} error="" isDarkMode={isDarkMode} />
        )}
        {activeTab === "errors" && (
          <div className="h-full p-4 overflow-auto">
            {error ? (
              <div
                className={`p-4 rounded-lg border ${isDarkMode
                    ? "bg-red-900/20 border-red-800"
                    : "bg-red-50 border-red-200"
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                  />
                  <pre
                    className={`text-sm whitespace-pre-wrap font-mono flex-1 ${isDarkMode ? "text-red-400" : "text-red-700"
                      }`}
                  >
                    {error}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className={`w-12 h-12 mb-3 ${isDarkMode ? "text-[#4a4a4a]" : "text-gray-300"
                    }`}
                />
                <p
                  className={`text-sm font-medium ${"text-[var(--theme-muted)]"
                    }`}
                >
                  No errors
                </p>
              </div>
            )}
          </div>
        )}
        <div
          className={`border-t flex-shrink-0 ${"border-[var(--theme-border)]"
            }`}
        >
          <CustomInput
            input={input}
            setInput={setInput}
            isDarkMode={isDarkMode}
          />
        </div>
        <div
          className={`p-3 border-t flex-shrink-0 ${"border-[var(--theme-border)] bg-[var(--theme-sidebar)]"
            }`}
        >
          <button
            onClick={handleCompileAndExecute}
            className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 shadow-sm ${
              isDarkMode
                ? "bg-[var(--theme-accent)] hover:brightness-110 text-white focus:ring-[var(--theme-accent)] focus:ring-offset-[var(--theme-sidebar)]"
                : "bg-[var(--theme-accent)] hover:brightness-110 text-white focus:ring-[var(--theme-accent)] focus:ring-offset-[var(--theme-sidebar)]"
            }`}
          >
            <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
            <span>Run Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputSection;
