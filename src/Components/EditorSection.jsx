import React from "react";
import Editor from "@monaco-editor/react";
import { MONACO_LANGUAGE_MAP } from "../constants/languageConfig";
import SaveIndicator from "./SaveIndicator";

const EditorSection = ({
  language,
  code,
  setCode,
  theme,
  editorRef,
  isDarkMode,
  setIsCodeTouched,
  isSaved,
  saveTimestamp,
}) => {
  const getMonacoLanguage = (lang) => {
    return MONACO_LANGUAGE_MAP[lang] || "plaintext";
  };

  return (
    <div className="flex-1 h-full min-h-0">
      <div
        className={`h-full rounded-lg overflow-hidden border flex flex-col transition-colors duration-200 ${
          isDarkMode
            ? "bg-[#1e1e1e] border-[#3c3c3c] shadow-lg shadow-black/20"
            : "bg-white border-[#e0e0e0] shadow-lg shadow-black/5"
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0 ${
            isDarkMode
              ? "bg-[#252526] border-[#3c3c3c]"
              : "bg-[#f8f8f8] border-[#e0e0e0]"
          }`}
        >
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-semibold ${
                isDarkMode ? "text-[#cccccc]" : "text-gray-700"
              }`}
            >
              {language === "cpp"
                ? "C++"
                : language.charAt(0).toUpperCase() + language.slice(1)}
            </span>
            <span
              className={`text-xs ${
                isDarkMode ? "text-[#858585]" : "text-gray-400"
              }`}
            >
              •
            </span>
            <span
              className={`text-xs ${
                isDarkMode ? "text-[#858585]" : "text-gray-400"
              }`}
            >
              UTF-8
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <SaveIndicator
              isDarkMode={isDarkMode}
              isSaved={isSaved}
              timestamp={saveTimestamp}
            />
            <span
              className={`text-xs ${
                isDarkMode ? "text-[#858585]" : "text-gray-400"
              }`}
            >
              Ln 1, Col 1
            </span>
          </div>
        </div>
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={getMonacoLanguage(language)}
            value={code}
            onChange={(value) => {
              setCode(value);
              if (setIsCodeTouched) {
                setIsCodeTouched(true);
              }
            }}
            theme={theme}
            onMount={(editor) => {
              editorRef.current = editor;

              editor.updateOptions({
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                fontSize: 14,
                lineHeight: 22,
                minimap: { enabled: true, scale: 1 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: "all",
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true,
                },
                suggest: {
                  showIcons: true,
                  showMethods: true,
                  showFunctions: true,
                  showConstructors: true,
                  showFields: true,
                  showVariables: true,
                  showClasses: true,
                  showStructs: true,
                  showInterfaces: true,
                  showModules: true,
                  showProperties: true,
                  showEvents: true,
                  showOperators: true,
                  showUnits: true,
                  showValues: true,
                  showConstants: true,
                  showEnumMembers: true,
                  showEnums: true,
                  showKeywords: true,
                  showWords: true,
                  showColors: true,
                  showFiles: true,
                  showReferences: true,
                  showFolders: true,
                  showTypeParameters: true,
                  showSnippets: true,
                },
              });
            }}
            loading={
              <div
                className={`flex items-center justify-center h-full ${
                  isDarkMode ? "text-[#858585]" : "text-gray-400"
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Loading editor...</span>
                </div>
              </div>
            }
            options={{
              fontFamily:
                "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              fontSize: 14,
              fontLigatures: true,
              lineHeight: 22,
              minimap: { enabled: true, scale: 1 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              padding: { top: 16, bottom: 16 },
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              renderWhitespace: "selection",
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorSection;
