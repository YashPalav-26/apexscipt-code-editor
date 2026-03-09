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
    CODE_SNIPPETS[language] || "// Write your code here"
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

      const sourceCode = editorRef.current.getValue();
      const result = await executeCode(language, sourceCode, input);

      if (result.run && result.run.stdout) {
        setOutput(result.run.stdout);
      } else if (result.run && result.run.stderr) {
        setOutput(result.run.stderr);
      } else {
        setOutput("No output");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const saveCode = () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    const blob = new Blob([sourceCode], { type: "text/plain" });
    const link = document.createElement("a");

    const fileName = `code.${language === "javascript" ? "js" : language}`;
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

  return (
    <div
      className={`min-h-screen p-6 flex flex-col ${
        isDarkMode ? "bg-[#2f4f4f] text-white" : "bg-[#E0F7FA] text-gray-900"
      }`}
    >
      <Navbar
        language={language}
        handleLanguageChange={handleLanguageChange}
        theme={theme}
        setTheme={setTheme}
        saveCode={saveCode}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="flex flex-col lg:flex-row flex-1 space-y-4 lg:space-y-0 lg:space-x-4">
        <EditorSection
          language={language}
          code={code}
          setCode={setCode}
          theme={theme}
          editorRef={editorRef}
          isDarkMode={isDarkMode}
        />
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
  );
};

export default CodeEditor;
