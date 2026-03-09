import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants";

const ONECOMPILER_API = "/api/execute"; 

const LANGUAGE_MAP = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  python3: "python",
  java: "java",
  csharp: "csharp",
  php: "php",
  c: "c",
  cpp: "cpp",
};

export const executeCode = async (language, sourceCode, input = "") => {
  try {
    if (!LANGUAGE_VERSIONS[language]) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const oneCompilerLanguage = LANGUAGE_MAP[language];
    if (!oneCompilerLanguage) {
      throw new Error(`Language not supported by OneCompiler: ${language}`);
    }

    console.log("[DEBUG] Executing code with OneCompiler API");
    console.log("[DEBUG] Language:", oneCompilerLanguage);
    console.log("[DEBUG] Source code length:", sourceCode.length);

    const response = await axios.post(
      ONECOMPILER_API,
      {
        language: oneCompilerLanguage,
        stdin: input,
        files: [
          {
            name: "main." + getFileExtension(language),
            content: sourceCode,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("[DEBUG] Response received:", response.status);
    console.log("[DEBUG] Response data:", response.data);

    const result = {
      run: {
        stdout: response.data.stdout || "",
        stderr: response.data.stderr || "",
        code: response.data.code || 0,
      },
      compile: {
        stdout: "",
        stderr: "",
        code: 0,
      },
    };

    result.output = result.run.stdout;
    result.error = result.run.stderr;
    result.compileError = result.compile.stderr;
    result.executionTime = response.data.executionTime || "N/A";

    return result;
  } catch (error) {
    console.error("[DEBUG] Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      console.error("OneCompiler API authentication failed. Please check your API key.");
      throw new Error("API authentication failed. Please check your API key configuration.");
    }

    if (error.response?.status === 404) {
      console.error("OneCompiler API endpoint not found (404).");
      throw new Error("Code execution service is unavailable. Please try again later.");
    }

    console.error("Error executing code:", error.message);
    throw error;
  }
};

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    python3: "py",
    java: "java",
    csharp: "cs",
    php: "php",
    c: "c",
    cpp: "cpp",
  };
  return extensions[language] || "txt";
}
