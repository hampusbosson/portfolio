import { useEffect, useRef, useState } from "react";
import { sfx } from "../../audio/sfx";
import type { Page } from "../../types/types";

interface AssistantOrbOverlayProps {
  onOpenChat: () => void;
  activePage: Page;
}

export default function AssistantOrbOverlay({
  onOpenChat,
  activePage,
}: AssistantOrbOverlayProps) {
  const [startup, setStartup] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const hasTriggeredProjectsOnboarding = useRef(false);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const removeTimeoutRef = useRef<number | null>(null);

  const clearOnboardingTimers = () => {
    if (showTimeoutRef.current) {
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    if (removeTimeoutRef.current) {
      window.clearTimeout(removeTimeoutRef.current);
      removeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => setStartup(false), 2000);

    return () => {
      window.clearTimeout(timeout);
      clearOnboardingTimers();
    };
  }, []);

  useEffect(() => {
    if (activePage !== "projects" || hasTriggeredProjectsOnboarding.current) {
      return;
    }

    hasTriggeredProjectsOnboarding.current = true;
    showTimeoutRef.current = window.setTimeout(() => {
      setShowOnboarding(true);
      window.requestAnimationFrame(() => setOnboardingVisible(true));
    }, 1000);

    hideTimeoutRef.current = window.setTimeout(() => {
      setOnboardingVisible(false);

      removeTimeoutRef.current = window.setTimeout(() => {
        setShowOnboarding(false);
      }, 260);
    }, 7950);
  }, [activePage]);

  const dismissOnboarding = () => {
    clearOnboardingTimers();
    setOnboardingVisible(false);
    removeTimeoutRef.current = window.setTimeout(() => setShowOnboarding(false), 260);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[130]">
      <div className="pointer-events-auto fixed bottom-3 right-3 md:bottom-5 md:right-5">
        {showOnboarding && (
          <div
            className={`assistant-chat-callout ${
              onboardingVisible ? "assistant-chat-callout-visible" : ""
            }`}
          >
            <p className="assistant-chat-callout-title">AI Assistant</p>
            <p className="assistant-chat-callout-copy">
              Click here anytime to ask about my projects, experience, or stack.
            </p>
          </div>
        )}

        <div
          className={`assistant-chat-label ${hovered ? "assistant-chat-label-hovered" : ""}`}
        >
          <span className="assistant-chat-label-title">AI ASSISTANT</span>
        </div>

        <button
          type="button"
          aria-label="Open AI chat assistant"
          onPointerEnter={() => {
            if (!hovered) sfx.play("hover");
            setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onClick={() => {
            dismissOnboarding();
            onOpenChat();
          }}
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
      </div>
    </div>
  );
}
