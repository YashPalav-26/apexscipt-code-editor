import React, { useState, useRef, useEffect } from "react";
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

const OutputSection = ({
  output,
  error,
  input,
  setInput,
  handleCompileAndExecute,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState("output");
  const [panelHeight, setPanelHeight] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);
  const startYRef = useRef(0);
  const startHeightRef = useRef(0);

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

  return (
    <div
      ref={containerRef}
      className={`flex flex-col border rounded-lg overflow-hidden transition-colors duration-200 h-full ${
        isDarkMode
          ? "bg-[#1e1e1e] border-[#3c3c3c] shadow-lg shadow-black/20"
          : "bg-white border-[#e0e0e0] shadow-lg shadow-black/5"
      }`}
    >
      {/* Resize Handle - Only visible on desktop */}
      <div
        className={`hidden lg:h-1 lg:cursor-ns-resize lg:flex lg:items-center lg:justify-center transition-colors duration-150 ${
          isDarkMode
            ? "bg-[#2d2d2d] hover:bg-[#007acc]"
            : "bg-gray-200 hover:bg-[#0066b8]"
        } ${isResizing ? (isDarkMode ? "bg-[#007acc]" : "bg-[#0066b8]") : ""}`}
        onMouseDown={handleMouseDown}
      >
        <FontAwesomeIcon
          icon={faGripVertical}
          className={`w-4 h-2 ${isDarkMode ? "text-[#858585]" : "text-gray-400"}`}
        />
      </div>

      {/* Tab Bar */}
      <div
        className={`flex items-center justify-between border-b px-2 flex-shrink-0 ${
          isDarkMode
            ? "bg-[#252526] border-[#3c3c3c]"
            : "bg-[#f8f8f8] border-[#e0e0e0]"
        }`}
      >
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 text-sm border-b-2 transition-colors duration-150 flex-shrink-0 whitespace-nowrap ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "text-white border-[#007acc] bg-[#1e1e1e]"
                    : "text-gray-900 border-[#0066b8] bg-white"
                  : isDarkMode
                    ? "text-[#858585] border-transparent hover:text-white"
                    : "text-gray-500 border-transparent hover:text-gray-900"
              }`}
              aria-label={`View ${tab.label}`}
            >
              <FontAwesomeIcon icon={tab.icon} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.id === "errors" && error && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white font-semibold">
                  1
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Clear Button */}
          <button
            onClick={() => {
              // Clear functionality could be added here
            }}
            className={`p-1.5 rounded transition-colors duration-150 ${
              isDarkMode
                ? "text-[#858585] hover:bg-[#2d2d2d] hover:text-white"
                : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"
            }`}
            aria-label="Clear output"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {/* Output Tab */}
        {activeTab === "output" && (
          <OutputWindow output={output} error="" isDarkMode={isDarkMode} />
        )}

        {/* Errors Tab */}
        {activeTab === "errors" && (
          <div className="h-full p-4 overflow-auto">
            {error ? (
              <div
                className={`p-4 rounded-lg border ${
                  isDarkMode
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
                    className={`text-sm whitespace-pre-wrap font-mono flex-1 ${
                      isDarkMode ? "text-red-400" : "text-red-700"
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
                  className={`w-12 h-12 mb-3 ${
                    isDarkMode ? "text-[#4a4a4a]" : "text-gray-300"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-[#858585]" : "text-gray-400"
                  }`}
                >
                  No errors
                </p>
              </div>
            )}
          </div>
        )}

        {/* Input Section */}
        <div
          className={`border-t flex-shrink-0 ${
            isDarkMode ? "border-[#3c3c3c]" : "border-[#e0e0e0]"
          }`}
        >
          <CustomInput
            input={input}
            setInput={setInput}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Run Button */}
        <div
          className={`p-3 border-t flex-shrink-0 ${
            isDarkMode
              ? "border-[#3c3c3c] bg-[#252526]"
              : "border-[#e0e0e0] bg-[#f8f8f8]"
          }`}
        >
          <button
            onClick={handleCompileAndExecute}
            className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-95 ${
              isDarkMode
                ? "bg-[#2ea44f] hover:bg-[#2c974b] text-white focus:ring-[#2ea44f] focus:ring-offset-[#1e1e1e]"
                : "bg-[#2ea44f] hover:bg-[#2c974b] text-white focus:ring-[#2ea44f] focus:ring-offset-white"
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
