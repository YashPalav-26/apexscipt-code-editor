import { useState, useRef, useEffect } from "react";
import Navbar from "./NavBar";
import EditorSection from "./EditorSection";
import OutputSection from "./Output";
import ResizableDivider from "./ResizableDivider";
import useResizablePanel from "../hooks/useResizablePanel";
import useLocalStorage from "../hooks/useLocalStorage";
import useThemeCustomization from "../hooks/useThemeCustomization";
import { ThemeProvider } from "../context/ThemeContext.jsx";
import { CODE_SNIPPETS } from "../constants/constants";
import { getLanguageConfig } from "../constants/languageConfig";
import { executeCode } from "../api/api";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(
    CODE_SNIPPETS[language] || "// Write your code here",
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [isCodeTouched, setIsCodeTouched] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saveTimestamp, setSaveTimestamp] = useState(null);
  const editorRef = useRef(null);

  // Use theme customization hook
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    isDark,
    themeColors,
    currentTheme,
    currentFontFamily,
  } = useThemeCustomization();

  // Initialize localStorage hook for current language
  const localStorage = useLocalStorage(
    `phxcode_code_${language}`,
    CODE_SNIPPETS[language] || "",
  );
  const localStorageTouched = useLocalStorage(
    `phxcode_touched_${language}`,
    "false",
  );

  const {
    editorWidth,
    outputWidth,
    isResizing,
    handleMouseDown,
    handleDoubleClick,
    containerRef,
  } = useResizablePanel(60);

  // Restore code and touched state on mount or language change
  useEffect(() => {
    const savedCode = localStorage.restore();
    const savedTouched = localStorageTouched.restore() === "true";

    if (savedCode && savedCode !== CODE_SNIPPETS[language]) {
      setCode(savedCode);
      setIsCodeTouched(savedTouched);
    } else {
      setCode(CODE_SNIPPETS[language] || "// Write your code here");
      setIsCodeTouched(false);
    }
  }, [language]);

  // Auto-save code when it changes
  useEffect(() => {
    if (code && code !== CODE_SNIPPETS[language]) {
      localStorage.save(code);
      localStorageTouched.immediate("true");
      setIsSaved(true);
      setSaveTimestamp(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }
  }, [code, language]);

  const handleCompileAndExecute = async () => {
    try {
      setOutput("");
      setError("");
      setExecutionTime(null);
      setMemoryUsage(null);

      const sourceCode = editorRef.current
        ? editorRef.current.getValue()
        : code;
      const result = await executeCode(language, sourceCode, input);

      // Extract and set execution metrics
      if (result.executionTime) {
        setExecutionTime(result.executionTime);
      }
      if (result.memoryUsage) {
        setMemoryUsage(result.memoryUsage);
      }

      if (result.run && result.run.stderr) {
        setError(result.run.stderr);
        setOutput(""); 
      } else if (result.run && result.run.stdout) {
        setOutput(result.run.stdout);
        setError(""); 
      } else {
        setOutput("No output");
        setError("");
      }
    } catch (err) {
      setError(err.message);
      setOutput(""); 
      setExecutionTime(null);
      setMemoryUsage(null);
    }
  };

  const saveCode = () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    const langConfig = getLanguageConfig(language);
    const fileExt = langConfig ? langConfig.fileExtension : language;

    const blob = new Blob([sourceCode], { type: "text/plain" });
    const link = document.createElement("a");

    const fileName = `code.${fileExt}`;
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    if (!isCodeTouched) {
      setCode(CODE_SNIPPETS[selectedLanguage] || "// Write your code here");
      setIsCodeTouched(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = isDark ? "vs-light" : "vs-dark";
    setTheme(newTheme);
  };

  const handleNewFile = () => {
    const confirmed = window.confirm(
      "Create new file? This will reset the editor.",
    );
    if (confirmed) {
      setCode(CODE_SNIPPETS[language] || "// Write your code here");
      setIsCodeTouched(false);
      setOutput("");
      setError("");
      setInput("");
      // Clear localStorage for this language
      localStorage.clear();
      localStorageTouched.clear();
      setIsSaved(false);
      setSaveTimestamp(null);
    }
  };

  const themeContextValue = {
    isDark,
    theme,
    themeColors,
    fontSize,
    fontFamily: currentFontFamily?.value,
    currentTheme,
  };

  return (
    <ThemeProvider value={themeContextValue}>
      <div
        className={`min-h-screen w-full flex flex-col ${
          isDark ? "bg-[#1e1e1e] text-white" : "bg-[#f5f5f5] text-gray-900"
        }`}
      >
        {/* Navbar */}
        <Navbar
          language={language}
          handleLanguageChange={handleLanguageChange}
          theme={theme}
          setTheme={setTheme}
          onThemeChange={setTheme}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          fontFamily={fontFamily}
          onFontFamilyChange={setFontFamily}
          isDarkMode={isDark}
          toggleTheme={toggleTheme}
          onRunCode={handleCompileAndExecute}
          onNewFile={handleNewFile}
          saveCode={saveCode}
        />

      {/* Main Content - Resizable Two Panel Layout */}
      <main className="flex-1 flex flex-col pt-14 overflow-hidden">
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
              fontSize={fontSize}
              fontFamily={currentFontFamily?.value}
              editorRef={editorRef}
              isDarkMode={isDark}
              setIsCodeTouched={setIsCodeTouched}
              isSaved={isSaved}
              saveTimestamp={saveTimestamp}
            />
          </div>

          {/* Resizable Divider */}
          <ResizableDivider
            isDarkMode={isDark}
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
              setOutput={setOutput}
              setError={setError}
              input={input}
              setInput={setInput}
              handleCompileAndExecute={handleCompileAndExecute}
              isDarkMode={isDark}
              executionTime={executionTime}
              memoryUsage={memoryUsage}
            />
          </div>
        </div>
      </main>
    </div>
    </ThemeProvider>
  );
};

export default CodeEditor;
