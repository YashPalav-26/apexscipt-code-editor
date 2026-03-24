import React from "react";
import CodeEditor from "./Components/CodeEditor";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider value={{}}>
      <CodeEditor />
    </ThemeProvider>
  );
}

export default App;
