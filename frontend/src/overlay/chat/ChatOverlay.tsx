import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getChatMessages, getChats, postChatMessage } from "../../api/chat";
import { sfx } from "../../audio/sfx";
import type { ApiChatStoredMessage, ChatMessage } from "../../types/chat";
import { useEscapeKey } from "../../utils/useEscapeKey";

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

function formatAssistantMarkdown(content: string) {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  if (!normalized) return normalized;

  return normalized
    .split("\n")
    .map((line, index, lines) => {
      if (!line.trim()) return "";

      const nextLine = lines[index + 1]?.trim() ?? "";
      const isMarkdownBlock =
        /^#{1,6}\s/.test(line) ||
        /^[-*+]\s/.test(line) ||
        /^\d+\.\s/.test(line) ||
        /^>\s/.test(line);

      if (isMarkdownBlock || !nextLine) {
        return line;
      }

      // Preserve single-line breaks for answers that come back as plain text.
      return `${line}  `;
    })
    .join("\n");
}

function toOverlayMessages(messages: ApiChatStoredMessage[]): ChatMessage[] {
  return messages
    .filter(
      (message): message is ApiChatStoredMessage & { role: "user" | "assistant" } =>
        message.role === "user" || message.role === "assistant",
    )
    .map((message, index) => ({
      id: Number.parseInt(message.id.replace(/\D/g, "").slice(-12), 10) || index,
      role: message.role,
      content: message.content,
    }));
}

export default function ChatOverlay({ isOpen, onClose }: ChatOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const closeTimeout = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const latestAssistantMessageRef = useRef<HTMLDivElement | null>(null);
  const loadRequestRef = useRef(0);
  const pendingScrollTargetRef = useRef<"bottom" | "assistant-start" | null>(
    null,
  );

  const handleClose = () => {
    setIsVisible(false);
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => {
      onClose();
    }, FADE_MS);
  };

  useEscapeKey(handleClose, isOpen);

  // Trigger entry visibility once mounted/opened.
  useEffect(() => {
    if (!isOpen) return;
    const raf = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen]);

  // Cleanup pending close/reply timers on unmount.
  useEffect(() => {
    return () => {
      if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const requestId = ++loadRequestRef.current;
    setIsLoadingHistory(true);

    void (async () => {
      try {
        const { chats } = await getChats();
        if (loadRequestRef.current !== requestId) return;

        if (chats.length === 0) {
          setChatId(null);
          setMessages([]);
          return;
        }

        const latestChat = await getChatMessages(chats[0].id);
        if (loadRequestRef.current !== requestId) return;

        setChatId(latestChat.id);
        pendingScrollTargetRef.current = "bottom";
        setMessages(toOverlayMessages(latestChat.messages));
      } catch (error) {
        if (loadRequestRef.current !== requestId) return;
        console.error(error);
        setChatId(null);
        setMessages([]);
      } finally {
        if (loadRequestRef.current !== requestId) return;
        setIsLoadingHistory(false);
      }
    })();
  }, [isOpen]);

  // Keep message scrolling aligned with the newest interaction.
  useEffect(() => {
    if (!isOpen) return;
    const listEl = listRef.current;
    if (!listEl) return;

    const pendingScrollTarget = pendingScrollTargetRef.current;
    if (!pendingScrollTarget) return;

    if (pendingScrollTarget === "assistant-start") {
      const assistantEl = latestAssistantMessageRef.current;
      if (assistantEl) {
        listEl.scrollTo({
          top: Math.max(0, assistantEl.offsetTop - 12),
          behavior: "auto",
        });
      }
    } else {
      listEl.scrollTop = listEl.scrollHeight;
    }

    pendingScrollTargetRef.current = null;
  }, [messages, isReplying, isOpen]);

  if (!isOpen) return null;

  const submitMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isReplying || isLoadingHistory) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    };
    pendingScrollTargetRef.current = "bottom";
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsReplying(true);

    try {
      const result = await postChatMessage({
        message: trimmed,
        chatId: chatId ?? undefined,
      });

      setChatId(result.chatId);

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: result.answer,
      };

      pendingScrollTargetRef.current = "assistant-start";
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Something went wrong while sending that message. Please try again.",
      };

      pendingScrollTargetRef.current = "assistant-start";
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[140] flex items-center justify-center p-4 transition-opacity duration-0 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="pointer-events-auto absolute inset-0 bg-black/86 backdrop-blur-md"
        onClick={handleClose}
      />

      <section
        className={`pointer-events-auto relative z-10 flex h-full w-full max-w-6xl flex-col px-6 pb-6 pt-2 md:px-12 md:pb-6 md:pt-2 transition-all duration-200 ${
          isVisible ? "translate-y-0" : "translate-y-2"
        }`}
        onWheelCapture={(event) => event.stopPropagation()}
      >

        <div className="relative mt-2 flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">
              Ask me anything
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            onPointerEnter={() => sfx.play("hover")}
            className="rounded-full border border-white/16 bg-white/[0.04] mt-2 px-3 py-1.5 text-xs font-medium text-white/84 transition-colors hover:bg-white/[0.1] hover:cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="relative mt-8 min-h-0 flex-1">
          <div
            ref={listRef}
            className="h-full overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.22)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
          >
            {isLoadingHistory ? (
              <div className="mx-auto mt-10 max-w-xl text-center text-sm text-white/52">
                Loading conversation...
              </div>
            ) : messages.length === 0 && !isReplying ? (
              <div className="mx-auto mt-10 max-w-xl text-center text-sm text-white/52">
                Start by clicking a suggestion or typing your own question.
              </div>
            ) : (
              <div className="mx-auto flex max-w-4xl flex-col gap-3 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    ref={
                      message.role === "assistant" &&
                      message.id === messages[messages.length - 1]?.id
                        ? latestAssistantMessageRef
                        : null
                    }
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                      message.role === "user"
                        ? "ml-auto border border-brand-primary/35 bg-brand-primary/13 text-white"
                        : "border border-white/14 bg-white/[0.05] text-white/88"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="chat-markdown max-w-none text-inherit">
                        <ReactMarkdown>{formatAssistantMarkdown(message.content)}</ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
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
            Suggestions on what to ask me
          </p>
          <div className="grid gap-2.5 md:grid-cols-3">
            {SUGGESTIONS.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onPointerEnter={() => sfx.play("hover")}
                onClick={() => {
                  void submitMessage(suggestion);
                }}
                className="rounded-3xl border border-white/18 bg-white/[0.04] px-4 py-3 text-left text-[13px] leading-snug text-white/88 transition-colors hover:bg-white/[0.1]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submitMessage(input);
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
              disabled={isReplying || isLoadingHistory}
              className="rounded-xl border border-brand-primary/40 bg-brand-primary/16 px-3.5 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-primary/24 hover:cursor-pointer"
            >
              {isReplying ? "..." : "Send"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
