import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const FADE_MS = 260;
const FALLBACK_HIDE_MS = 2800;

export default function LoadingOverlay() {
  const { active, progress, item, total } = useProgress();
  const [hasStarted, setHasStarted] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const hideTimeoutRef = useRef<number | null>(null);
  const unmountTimeoutRef = useRef<number | null>(null);
  const fallbackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (active || total > 0 || progress > 0) {
      setHasStarted(true);
    }
  }, [active, total, progress]);

  useEffect(() => {
    fallbackTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      unmountTimeoutRef.current = window.setTimeout(() => {
        setIsMounted(false);
      }, FADE_MS);
    }, FALLBACK_HIDE_MS);

    return () => {
      if (fallbackTimeoutRef.current) {
        window.clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted || active || progress < 100) return;

    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      unmountTimeoutRef.current = window.setTimeout(() => {
        setIsMounted(false);
      }, FADE_MS);
    }, 140);

    return () => {
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [active, hasStarted, progress]);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      if (unmountTimeoutRef.current) {
        window.clearTimeout(unmountTimeoutRef.current);
      }
      if (fallbackTimeoutRef.current) {
        window.clearTimeout(fallbackTimeoutRef.current);
      }
    };
  }, []);

  if (!isMounted) return null;

  const displayProgress = hasStarted ? Math.min(100, Math.max(3, progress)) : 0;

  return (
    <div
      className={`fixed inset-0 z-[220] flex items-center justify-center bg-[#090b11] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        style={{ width: "min(calc(100% - 48px), 380px)" }}
      >
        <div className="box-border w-full rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <p className="text-[11px] font-medium tracking-[0.24em] text-brand-primary uppercase">
            Loading Portfolio
          </p>
          <h1 className="mt-3 text-[30px] font-medium tracking-tight text-brand-secondary">
            Hampus Bosson
          </h1>
          <p className="mt-3 text-sm leading-7 text-white/58">
            Preparing the 3D scene, project media, and interface.
          </p>

          <div className="mt-6">
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#c39449_0%,#e9f8ff_100%)] transition-[width] duration-300 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-white/52">
              <span>{Math.round(displayProgress)}%</span>
              <span className="truncate pl-4 text-right">
                {item ? item.split("/").pop() : "Loading assets"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
