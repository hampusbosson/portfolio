import { useEffect, useState } from "react";
import { sfx } from "../audio/sfx";

export default function AssistantOrbOverlay() {
  const [startup, setStartup] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setStartup(false), 2000);
    const showTimeout = window.setTimeout(() => {
      setShowHint(true);
      window.requestAnimationFrame(() => setHintVisible(true));
    }, 500);
    const hideTimeout = window.setTimeout(() => {
      setHintVisible(false);
      window.setTimeout(() => setShowHint(false), 260);
    }, 6200);

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(showTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-45">
      <div className="pointer-events-auto fixed bottom-3 right-3 md:bottom-5 md:right-5">
        <button
          type="button"
          aria-label="Open AI chat assistant"
          onPointerEnter={() => {
            if (!hovered) sfx.play("hover");
            setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onClick={() => {}}
          className={`group relative h-[110px] w-[110px] outline-none transition-transform duration-200 ${
            hovered ? "scale-[1.08] cursor-pointer" : "scale-100"
          }`}
        >
          <span
            className={`assistant-codepen-sphere ${startup ? "assistant-codepen-sphere-startup" : ""}`}
          >
            <span
              className={`assistant-codepen-lava ${
                startup ? "assistant-codepen-lava-startup" : ""
              }`}
            />
          </span>
        </button>

        {showHint && (
          <div
            className={`assistant-chat-hint ${
              hintVisible ? "assistant-chat-hint-visible" : ""
            }`}
          >
            Chat with me
          </div>
        )}

        <div
          className={`assistant-chat-hint assistant-chat-hint-hover ${
            hovered ? "assistant-chat-hint-visible" : ""
          }`}
        >
          Click to chat
        </div>
      </div>
    </div>
  );
}
