import { useEffect, useRef, useState } from "react";
import { sfx } from "../../audio/sfx";

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Give me a quick intro about yourself",
  "Which project should I check first?",
  "What stack do you use most?",
  "How do you approach performance?",
];

const FADE_MS = 220;

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const buildAssistantReply = (prompt: string): string => {
  const text = prompt.toLowerCase();
  if (text.includes("intro") || text.includes("yourself")) {
    return "I build interactive web experiences with React, Three.js, and a strong focus on smooth UX and performance.";
  }
  if (text.includes("stack")) {
    return "Main stack: React, TypeScript, React Three Fiber, Drei, GSAP, TailwindCSS, and Vite.";
  }
  if (text.includes("performance")) {
    return "I profile draw calls, cap DPR where needed, keep scenes demand-rendered when possible, and optimize mesh/material usage.";
  }
  if (text.includes("project")) {
    return "Start with the project that best shows both technical depth and polish, then explore the others by complexity.";
  }
  return "Great question. I can explain project choices, architecture decisions, performance tradeoffs, and implementation details.";
};

export default function ChatOverlay({ isOpen, onClose }: ChatOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const closeTimeout = useRef<number | null>(null);
  const replyTimeout = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const raf = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
      if (replyTimeout.current) window.clearTimeout(replyTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const listEl = listRef.current;
    if (!listEl) return;
    listEl.scrollTop = listEl.scrollHeight;
  }, [messages, isReplying, isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => {
      onClose();
    }, FADE_MS);
  };

  const submitMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isReplying) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setIsReplying(true);
    if (replyTimeout.current) window.clearTimeout(replyTimeout.current);
    replyTimeout.current = window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: buildAssistantReply(trimmed),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsReplying(false);
    }, 520);
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity duration-0 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="pointer-events-auto absolute inset-0 bg-black/58 backdrop-blur-md"
        onClick={handleClose}
      />

      <section
        className={`pointer-events-auto relative z-10 flex h-full w-full max-w-6xl flex-col px-6 pb-10 pt-8 md:px-12 md:pb-14 md:pt-12 transition-all duration-200 ${
          isVisible ? "translate-y-0" : "translate-y-1"
        }`}
        onWheelCapture={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-[10%] bottom-[18%] h-[44vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(239,146,255,0.2)_0%,rgba(135,157,255,0.14)_35%,rgba(20,22,30,0)_72%)] blur-3xl" />

        <div className="relative flex items-start justify-end">
          <button
            type="button"
            onClick={handleClose}
            onPointerEnter={() => sfx.play("hover")}
            className="rounded-full border border-white/16 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
          >
            Close
          </button>
        </div>

        <div className="relative mt-2 flex flex-col items-center text-center md:mt-2">
          <p className="text-2xl leading-none text-white/90">✦</p>
          <h2 className="mt-5 text-3xl font-medium tracking-tight text-white md:text-4xl">
            Ask me anything
          </h2>
        </div>

        <div className="relative mt-8 min-h-0 flex-1">
          <div
            ref={listRef}
            className="h-full overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.22)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
          >
            {messages.length === 0 && !isReplying ? (
              <div className="mx-auto mt-10 max-w-xl text-center text-sm text-white/52">
                Start by clicking a suggestion or typing your own question.
              </div>
            ) : (
              <div className="mx-auto flex max-w-3xl flex-col gap-3 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                      message.role === "user"
                        ? "ml-auto border border-brand-primary/35 bg-brand-primary/13 text-white"
                        : "border border-white/14 bg-white/[0.05] text-white/88"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isReplying && (
                  <div className="w-fit rounded-2xl border border-white/14 bg-white/[0.05] px-4 py-2.5 text-sm text-white/68">
                    Thinking...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-4">
          <p className="mb-3 text-sm font-medium text-white/60">
            Suggestions on what to ask AI
          </p>
          <div className="grid gap-2.5 md:grid-cols-3">
            {SUGGESTIONS.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onPointerEnter={() => sfx.play("hover")}
                onClick={() => submitMessage(suggestion)}
                className="rounded-xl border border-white/18 bg-white/[0.04] px-4 py-3 text-left text-[15px] leading-snug text-white/88 transition-colors hover:bg-white/[0.1]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitMessage(input);
          }}
          className="relative mt-4"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/18 bg-black/35 px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything about projects, stack, or process..."
              className="h-10 min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-white/36 outline-none"
            />
            <button
              type="submit"
              onPointerEnter={() => sfx.play("hover")}
              disabled={isReplying}
              className="rounded-xl border border-brand-primary/40 bg-brand-primary/16 px-3.5 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-primary/24"
            >
              {isReplying ? "..." : "Send"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
