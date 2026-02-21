import React from "react";
import type { Page } from "../types/types";

interface SceneOverlayProps {
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

function SceneOverlay({ setActivePage }: SceneOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <div className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 flex gap-3">
        <button
          onClick={() => setActivePage("start")}
          className="text-white border border-white/30 px-3 py-2 rounded bg-black/40"
        >
          Start
        </button>
        <button
          onClick={() => setActivePage("projects")}
          className="text-white border border-white/30 px-3 py-2 rounded bg-black/40"
        >
          Projects
        </button>
      </div>
    </div>
  );
}

export default SceneOverlay;
