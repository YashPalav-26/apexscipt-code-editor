import { useState, useRef, useEffect } from "react";

const useResizablePanel = (defaultEditorWidth = 60) => {
  const [editorWidth, setEditorWidth] = useState(() => {
    // Try to restore from session storage
    const stored = sessionStorage.getItem("editorPanelWidth");
    return stored ? parseFloat(stored) : defaultEditorWidth;
  });

  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const containerRef = useRef(null);

  const MIN_EDITOR_WIDTH = 300; // pixels
  const MAX_EDITOR_WIDTH_PERCENT = 70; // percentage
  const MIN_OUTPUT_WIDTH = 250; // pixels

  // Handle resize start
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = editorWidth;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  // Handle resize movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const deltaX = e.clientX - startXRef.current;
      const deltaPercent = (deltaX / containerWidth) * 100;
      let newWidth = startWidthRef.current + deltaPercent;

      // Apply constraints
      const minPercent = (MIN_EDITOR_WIDTH / containerWidth) * 100;
      const maxPercent = MAX_EDITOR_WIDTH_PERCENT;
      const minOutputPercent = (MIN_OUTPUT_WIDTH / containerWidth) * 100;

      // Enforce minimum editor width
      newWidth = Math.max(minPercent, newWidth);

      // Enforce minimum output width (which means max editor width)
      newWidth = Math.min(100 - minOutputPercent, newWidth);

      // Enforce max editor width percentage
      newWidth = Math.min(maxPercent, newWidth);

      setEditorWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, editorWidth]);

  // Persist width to session storage
  useEffect(() => {
    sessionStorage.setItem("editorPanelWidth", editorWidth.toString());
  }, [editorWidth]);

  // Handle double-click reset
  const handleDoubleClick = () => {
    setEditorWidth(defaultEditorWidth);
  };

  const outputWidth = 100 - editorWidth;

  return {
    editorWidth,
    outputWidth,
    isResizing,
    handleMouseDown,
    handleDoubleClick,
    containerRef,
  };
};

export default useResizablePanel;
