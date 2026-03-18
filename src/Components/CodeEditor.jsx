import React, { useState, useRef } from "react";
import Navbar from "./NavBar";
import EditorSection from "./EditorSection";
import OutputSection from "./Output";
import ResizableDivider from "./ResizableDivider";
import useResizablePanel from "../hooks/useResizablePanel";
import { CODE_SNIPPETS } from "../constants/constants";
import { executeCode } from "../api/api";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState(
    CODE_SNIPPETS[language] || "// Write your code here",
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const editorRef = useRef(null);

  const {
    editorWidth,
    outputWidth,
    isResizing,
    handleMouseDown,
    handleDoubleClick,
    containerRef,
  } = useResizablePanel(60);

  const handleCompileAndExecute = async () => {
    try {
      setOutput("");
      setError("");

      const sourceCode = editorRef.current
        ? editorRef.current.getValue()
        : code;
      const result = await executeCode(language, sourceCode, input);

      // Check if there's stderr output (errors)
      if (result.run && result.run.stderr) {
        setError(result.run.stderr);
        setOutput(""); // Clear output if there's an error
      } else if (result.run && result.run.stdout) {
        setOutput(result.run.stdout);
        setError(""); // Clear error if execution was successful
      } else {
        setOutput("No output");
        setError("");
      }
    } catch (err) {
      setError(err.message);
      setOutput(""); // Clear output on exception
    }
  };

  const saveCode = () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    const blob = new Blob([sourceCode], { type: "text/plain" });
    const link = document.createElement("a");

    const fileName = `code.${language === "javascript" ? "js" : language === "typescript" ? "ts" : language === "csharp" ? "cs" : language}`;
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(CODE_SNIPPETS[selectedLanguage]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "vs-dark");
  };

  const handleNewFile = () => {
    const confirmed = window.confirm(
      "Create new file? This will reset the editor.",
    );
    if (confirmed) {
      setCode(CODE_SNIPPETS[language] || "// Write your code here");
      setOutput("");
      setError("");
      setInput("");
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col ${
        isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-[#f5f5f5] text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar
        language={language}
        handleLanguageChange={(e) => {
          const selectedLanguage = e.target.value;
          setLanguage(selectedLanguage);
          setCode(CODE_SNIPPETS[selectedLanguage]);
        }}
        theme={theme}
        setTheme={setTheme}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onRunCode={handleCompileAndExecute}
        onNewFile={handleNewFile}
        saveCode={saveCode}
      />

      {/* Main Content - Resizable Two Panel Layout */}
      <main className="flex-1 flex flex-col pt-14 overflow-hidden">
        {/* Desktop: Resizable flex row, Tablet/Mobile: Flex col */}
        <div
          ref={containerRef}
          className="flex-1 flex flex-col lg:flex-row h-full gap-0 lg:gap-0 p-4 lg:p-4 overflow-hidden"
        >
          {/* Editor Panel - Resizable width on desktop */}
          <div
            className="flex-1 min-h-0 lg:min-h-auto lg:overflow-hidden"
            style={{
              width: `calc(${editorWidth}% - 0.25rem)`,
              transition: isResizing ? "none" : "width 0.1s ease-out",
            }}
          >
            <EditorSection
              language={language}
              code={code}
              setCode={setCode}
              theme={theme}
              editorRef={editorRef}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Resizable Divider */}
          <ResizableDivider
            isDarkMode={isDarkMode}
            isResizing={isResizing}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDoubleClick}
          />

          {/* Output Panel - Resizable width on desktop */}
          <div
            className="h-64 lg:h-full lg:min-h-auto lg:overflow-hidden"
            style={{
              width: `calc(${outputWidth}% - 0.25rem)`,
              transition: isResizing ? "none" : "width 0.1s ease-out",
            }}
          >
            <OutputSection
              output={output}
              error={error}
              input={input}
              setInput={setInput}
              handleCompileAndExecute={handleCompileAndExecute}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeEditor;
