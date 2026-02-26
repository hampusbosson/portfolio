import React from "react";
import { useEffect, useState } from "react";
import type { Page } from "../types/types";

interface SceneOverlayProps {
  activePage: Page;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

function SceneOverlay({ activePage, setActivePage }: SceneOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <nav
        className={`pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 transition-all duration-1200 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-4xl border border-white/25 bg-white/05 p-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <button
            onClick={() => setActivePage("start")}
            className={`rounded-4xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
              activePage === "start"
                ? "bg-white text-black shadow-sm"
                : "text-white/85 hover:bg-white/15 hover:text-white"
            }`}
          >
            Start
          </button>
          <button
            onClick={() => setActivePage("projects")}
            className={`rounded-4xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 ${
              activePage === "projects"
                ? "bg-white text-black shadow-sm"
                : "text-white/85 hover:bg-white/15 hover:text-white"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActivePage("about")}
            className="rounded-4xl px-4 py-2 text-sm font-medium tracking-wide text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
            type="button"
          >
            About
          </button>
        </div>
      </nav>
    </div>
  );
}

export default SceneOverlay;
