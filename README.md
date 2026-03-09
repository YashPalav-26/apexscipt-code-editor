<!-- @format -->

<div align="center">

# ApexScript Code Editor

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-4.6.0-0065FF?style=flat)](https://microsoft.github.io/monaco-editor)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](package.json)

A powerful, web-based code editor built with React for multi-language code execution.

</div>

## 📖 Description

ApexScript Code Editor is a modern, feature-rich online code editor that allows developers to write, edit, and execute code in multiple programming languages directly from their browser. Built with React, Vite, and Tailwind CSS, it provides a seamless coding experience with syntax highlighting, stdin input support, and real-time code execution via the OneCompiler API.

## ✨ Features

- **Multi-Language Support** — Write and execute code in JavaScript, TypeScript, Python, Java, C#, PHP, C, and C++
- **Syntax Highlighting** — Full-featured code editing with Monaco Editor's intelligent syntax highlighting
- **Dark/Light Theme** — Toggle between dark and light modes for comfortable coding in any environment
- **Stdin Input** — Provide custom input to your programs just like a real terminal
- **Real-Time Execution** — Execute code instantly using the OneCompiler API
- **Output Window** — View stdout, stderr, and execution time results
- **Language Selector** — Easily switch between supported programming languages
- **Code Snippets** — Pre-loaded starter code for each supported language
- **Responsive Design** — Works seamlessly on desktop and mobile devices
- **Modern UI** — Clean, professional interface built with Tailwind CSS

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18.3.1 |
| **Build Tool** | Vite 5.4.10 |
| **Styling** | Tailwind CSS 3.4.15 |
| **Code Editor** | Monaco Editor 4.6.0 |
| **HTTP Client** | Axios 1.7.7 |
| **Icons** | Font Awesome 6.7.0 |
| **Code Execution** | OneCompiler API |

## 🚀 Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/YashPalav-26/apexscipt-code-editor.git
cd ApexScript
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy the example environment file and add your OneCompiler API key:

```bash
cp .env.example .env
```

Edit the `.env` file and replace the placeholder:

```env
VITE_ONECOMPILER_API_KEY=your_api_key_here
```

> **Note:** You can obtain a free OneCompiler API key by signing up at [onecompiler.com](https://onecompiler.com/).

4. **Start the development server**

```bash
npm run dev
```

5. **Open in browser**

Navigate to `http://localhost:5173` to use the editor.

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_ONECOMPILER_API_KEY` | Your OneCompiler API key for code execution | Yes |

## 🌍 Supported Languages

| Language | Version | File Extension |
|----------|---------|----------------|
| JavaScript | 18.15.0 | `.js` |
| TypeScript | 5.0.3 | `.ts` |
| Python | 3.10.0 | `.py` |
| Java | 15.0.2 | `.java` |
| C# | 6.12.0 | `.cs` |
| PHP | 8.2.3 | `.php` |
| C | 10.2.0 | `.c` |
| C++ | 11.2.0 | `.cpp` |

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to ApexScript Code Editor, please follow these steps:

1. **Fork the repository**
   Click the "Fork" button at the top right of this page.

2. **Clone your fork**
   ```bash
   git clone https://github.com/YashPalav-26/apexscipt-code-editor.git
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   Implement your feature or bug fix.

5. **Commit your changes**
   ```bash
   git commit -m "Add your descriptive commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   Open a pull request against the `main` branch of this repository.

### Coding Standards

- Follow the existing code style and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure your code passes ESLint checks:
  ```bash
  npm run lint
  ```

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Copyright © 2026 [Yash Palav](https://github.com/YashPalav-26)

---

<div align="center">

Built with ❤️ using React & Monaco Editor

</div>
