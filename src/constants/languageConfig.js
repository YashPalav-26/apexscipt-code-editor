export const languageConfig = [
  {
    id: "javascript",
    label: "JavaScript",
    icon: "JS",
    version: "18.15.0",
    monacoLanguage: "javascript",
    fileExtension: "js",
    oneCompilerLanguage: "javascript",
    category: "scripting",
    codeSnippet: `function greetYash(name) {
  console.log("Hello, " + name + "!");
}
greetYash("Yash");`,
  },

  {
    id: "typescript",
    label: "TypeScript",
    icon: "TS",
    version: "5.0.3",
    monacoLanguage: "typescript",
    fileExtension: "ts",
    oneCompilerLanguage: "typescript",
    category: "scripting",
    codeSnippet: `type Params = {
  name: string;
};

function greetYash(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greetYash({ name: "Yash" });`,
  },
  {
    id: "python",
    label: "Python",
    icon: "PY",
    version: "3.10.0",
    monacoLanguage: "python",
    fileExtension: "py",
    oneCompilerLanguage: "python",
    category: "scripting",
    codeSnippet: `def greetYash(name):
    print("Hello, " + name + "!")

greetYash("Yash")`,
  },
  {
    id: "java",
    label: "Java",
    icon: "JV",
    version: "15.0.2",
    monacoLanguage: "java",
    fileExtension: "java",
    oneCompilerLanguage: "java",
    category: "compiled",
    codeSnippet: `public class GreetYash {
    public static void main(String[] args) {
        System.out.println("Hello, Yash!");
    }
}`,
  },
  {
    id: "csharp",
    label: "C#",
    icon: "C#",
    version: "6.12.0",
    monacoLanguage: "csharp",
    fileExtension: "cs",
    oneCompilerLanguage: "csharp",
    category: "compiled",
    codeSnippet: `using System;

namespace GreetYash {
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello, Yash!");
        }
    }
}`,
  },
  {
    id: "php",
    label: "PHP",
    icon: "PHP",
    version: "8.2.3",
    monacoLanguage: "php",
    fileExtension: "php",
    oneCompilerLanguage: "php",
    category: "scripting",
    codeSnippet: `<?php
echo "Hello, Yash!";
?>`,
  },
  {
    id: "c",
    label: "C",
    icon: "C",
    version: "10.2.0",
    monacoLanguage: "c",
    fileExtension: "c",
    oneCompilerLanguage: "c",
    category: "compiled",
    codeSnippet: `#include <stdio.h>

int main() {
    printf("Hello, Yash!\\n");
    return 0;
}`,
  },
  {
    id: "cpp",
    label: "C++",
    icon: "C++",
    version: "11.2.0",
    monacoLanguage: "cpp",
    fileExtension: "cpp",
    oneCompilerLanguage: "cpp",
    category: "compiled",
    codeSnippet: `#include <iostream>

int main() {
    std::cout << "Hello, Yash!" << std::endl;
    return 0;
}`,
  },
  {
    id: "go",
    label: "Go",
    icon: "GO",
    version: "1.21.0",
    monacoLanguage: "go",
    fileExtension: "go",
    oneCompilerLanguage: "go",
    category: "compiled",
    codeSnippet: `package main

import "fmt"

func greetYash(name string) {
    fmt.Println("Hello, " + name + "!")
}

func main() {
    greetYash("Yash")
}`,
  },
  {
    id: "rust",
    label: "Rust",
    icon: "RS",
    version: "1.70.0",
    monacoLanguage: "rust",
    fileExtension: "rs",
    oneCompilerLanguage: "rust",
    category: "compiled",
    codeSnippet: `fn greet_yash(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    greet_yash("Yash");
}`,
  },
  {
    id: "kotlin",
    label: "Kotlin",
    icon: "KT",
    version: "1.9.0",
    monacoLanguage: "kotlin",
    fileExtension: "kt",
    oneCompilerLanguage: "kotlin",
    category: "compiled",
    codeSnippet: `fun greetYash(name: String) {
    println("Hello, \$name!")
}

fun main() {
    greetYash("Yash")
}`,
  },
  {
    id: "swift",
    label: "Swift",
    icon: "SW",
    version: "5.9.0",
    monacoLanguage: "swift",
    fileExtension: "swift",
    oneCompilerLanguage: "swift",
    category: "compiled",
    codeSnippet: `import Foundation

func greetYash(name: String) {
    print("Hello, \\(name)!")
}

greetYash(name: "Yash")`,
  },
  {
    id: "ruby",
    label: "Ruby",
    icon: "RB",
    version: "3.2.0",
    monacoLanguage: "ruby",
    fileExtension: "rb",
    oneCompilerLanguage: "ruby",
    category: "scripting",
    codeSnippet: `def greet_yash(name)
  puts "Hello, #{name}!"
end

greet_yash("Yash")`,
  },
  {
    id: "bash",
    label: "Bash",
    icon: "SH",
    version: "5.2.0",
    monacoLanguage: "shell",
    fileExtension: "sh",
    oneCompilerLanguage: "bash",
    category: "scripting",
    codeSnippet: `#!/bin/bash

function greet_yash() {
    echo "Hello, $1!"
}

greet_yash "Yash"`,
  },
];

export const createLanguageMaps = () => {
  const versions = {};
  const languageMap = {};
  const snippets = {};
  const monacoMap = {};
  const extensionMap = {};

  languageConfig.forEach((lang) => {
    versions[lang.id] = lang.version;
    languageMap[lang.id] = lang.oneCompilerLanguage;
    snippets[lang.id] = lang.codeSnippet;
    monacoMap[lang.id] = lang.monacoLanguage;
    extensionMap[lang.id] = lang.fileExtension;
  });

  return {
    LANGUAGE_VERSIONS: versions,
    LANGUAGE_MAP: languageMap,
    CODE_SNIPPETS: snippets,
    MONACO_LANGUAGE_MAP: monacoMap,
    FILE_EXTENSIONS: extensionMap,
  };
};

export const getLanguageConfig = (languageId) => {
  return languageConfig.find((lang) => lang.id === languageId);
};

export const isLanguageSupported = (languageId) => {
  return languageConfig.some((lang) => lang.id === languageId);
};

export const getLanguagesByCategory = (category) => {
  return languageConfig.filter((lang) => lang.category === category);
};

export const getLanguageCategories = () => {
  const categories = new Set(languageConfig.map((lang) => lang.category));
  return Array.from(categories);
};

export const {
  LANGUAGE_VERSIONS,
  LANGUAGE_MAP,
  CODE_SNIPPETS,
  MONACO_LANGUAGE_MAP,
  FILE_EXTENSIONS,
} = createLanguageMaps();
