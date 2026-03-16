import React, { useState, useRef } from "react";
import Navbar from "./NavBar";
import EditorSection from "./EditorSection";
import OutputSection from "./Output";
import { CODE_SNIPPETS } from "../constants";
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

      {/* Main Content - Two Panel Layout */}
      <main className="flex-1 flex flex-col pt-14 overflow-hidden">
        {/* Desktop: Flex row, Tablet/Mobile: Flex col */}
        <div className="flex-1 flex flex-col lg:flex-row h-full gap-3 p-4 overflow-hidden">
          {/* Editor Panel - 70-75% on desktop, full width on smaller */}
          <div className="flex-1 min-h-0 lg:min-h-auto">
            <EditorSection
              language={language}
              code={code}
              setCode={setCode}
              theme={theme}
              editorRef={editorRef}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Output Panel - 25-30% on desktop, bottom tabs on tablet, stacked on mobile */}
          <div className="h-64 lg:h-full lg:w-[380px] lg:flex-shrink-0">
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
