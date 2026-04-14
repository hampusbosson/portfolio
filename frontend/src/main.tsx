import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const bootLoader = document.getElementById("boot-loader");

if (bootLoader) {
  window.requestAnimationFrame(() => {
    bootLoader.classList.add("is-hidden");

    window.setTimeout(() => {
      bootLoader.remove();
    }, 260);
  });
}
