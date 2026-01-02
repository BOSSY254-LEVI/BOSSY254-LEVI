import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/ThemeProvider";

const rootElement = document.getElementById("root")!;

// 🔑 ensure React app stays above background
rootElement.style.position = "relative";
rootElement.style.zIndex = "10";

createRoot(rootElement).render(
  <ErrorBoundary>
    <ThemeProvider defaultTheme="obsidian-tech">
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);

// Register service worker for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered successfully:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
