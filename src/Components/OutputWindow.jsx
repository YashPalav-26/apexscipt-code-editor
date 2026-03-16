import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

const OutputWindow = ({ output, error, isDarkMode }) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div
        className={`flex-1 p-4 overflow-auto ${
          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
        }`}
      >
        <div className="flex items-center space-x-2 mb-4">
          <FontAwesomeIcon
            icon={faTerminal}
            className={`w-4 h-4 ${
              isDarkMode ? "text-[#858585]" : "text-gray-500"
            }`}
          />
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${
              isDarkMode ? "text-[#858585]" : "text-gray-500"
            }`}
          >
            Standard Output
          </span>
        </div>

        {output ? (
          <pre
            className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
              isDarkMode ? "text-[#d4d4d4]" : "text-gray-800"
            }`}
          >
            {output}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <FontAwesomeIcon
              icon={faTerminal}
              className={`w-10 h-10 mb-3 ${
                isDarkMode ? "text-[#4a4a4a]" : "text-gray-300"
              }`}
            />
            <p
              className={`text-sm font-medium ${
                isDarkMode ? "text-[#858585]" : "text-gray-400"
              }`}
            >
              Run your code to see output
            </p>
          </div>
        )}
      </div>

      {error && (
        <div
          className={`p-4 border-t ${
            isDarkMode
              ? "bg-red-900/10 border-[#3c3c3c] border-t-red-800"
              : "bg-red-50 border-[#e0e0e0] border-t-red-200"
          }`}
        >
          <pre
            className={`text-sm font-mono whitespace-pre-wrap ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            {error}
          </pre>
        </div>
      )}
    </div>
  );
};

export default OutputWindow;
