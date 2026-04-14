import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const updateMobileSceneHeight = () => {
  if (typeof window === "undefined") return;

  const isMobileLike =
    window.matchMedia("(hover: none), (pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0;

  if (!isMobileLike) {
    document.documentElement.style.removeProperty("--mobile-scene-height");
    return;
  }

  const portrait = window.matchMedia("(orientation: portrait)").matches;
  const screenHeight = portrait
    ? Math.max(window.screen.height, window.screen.width)
    : Math.min(window.screen.height, window.screen.width);

  document.documentElement.style.setProperty(
    "--mobile-scene-height",
    `${screenHeight}px`,
  );
};

updateMobileSceneHeight();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

window.addEventListener("resize", updateMobileSceneHeight);
window.addEventListener("orientationchange", updateMobileSceneHeight);
window.visualViewport?.addEventListener("resize", updateMobileSceneHeight);

const bootLoader = document.getElementById("boot-loader");

if (bootLoader) {
  window.requestAnimationFrame(() => {
    bootLoader.classList.add("is-hidden");

    window.setTimeout(() => {
      bootLoader.remove();
    }, 260);
  });
}
