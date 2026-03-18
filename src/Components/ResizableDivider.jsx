import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

const ResizableDivider = ({
  isDarkMode,
  isResizing,
  onMouseDown,
  onDoubleClick,
}) => {
  return (
    <div
      className={`hidden lg:flex lg:flex-col lg:items-center lg:justify-center w-1 flex-shrink-0 transition-colors duration-150 cursor-col-resize select-none ${
        isDarkMode
          ? "bg-[#2d2d2d] hover:bg-[#007acc]"
          : "bg-[#d0d0d0] hover:bg-[#0066b8]"
      } ${isResizing ? (isDarkMode ? "bg-[#007acc]" : "bg-[#0066b8]") : ""}`}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      role="separator"
      tabIndex={0}
      aria-label="Resize editor and output panels"
      title="Drag to resize panels, double-click to reset"
    >
      <FontAwesomeIcon
        icon={faGripVertical}
        className={`w-3 h-6 ${isDarkMode ? "text-[#858585]" : "text-gray-400"}`}
      />
    </div>
  );
};

export default ResizableDivider;
