import { useEffect, useState } from "react";
import { sfx } from "../../audio/sfx";

interface MobileProjectControlsProps {
  onPrev: () => void;
  onNext: () => void;
  totalProjects: number;
  currentIndex: number;
}

export default function MobileProjectControls({
  onPrev,
  onNext,
  totalProjects,
  currentIndex,
}: MobileProjectControlsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalProjects - 1;

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 650);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-55 z-50 px-5">
      <div
        className={`mx-auto max-w-xs transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="mb-3 flex items-center justify-center gap-2">
          {Array.from({ length: totalProjects }, (_, index) => {
            const isActive = index === currentIndex;

            return (
              <span
                key={index}
                aria-hidden="true"
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2.5 w-6 bg-white/88 shadow-[0_0_16px_rgba(255,255,255,0.18)]"
                    : "h-2.5 w-2.5 bg-white/28"
                }`}
              />
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 pointer-events-auto">
            <button
              type="button"
              disabled={isFirst}
              onClick={onPrev}
              onPointerEnter={() => {
                if (!isFirst) sfx.play("hover");
              }}
              aria-label={`Previous project${currentIndex + 1} of ${totalProjects}`}
              className="rounded-2xl border border-white/14 bg-[rgba(12,14,20,0.56)] px-4 py-3 text-sm font-semibold text-white/88 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-lg transition-colors hover:bg-[rgba(22,24,32,0.78)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={onNext}
              onPointerEnter={() => {
                if (!isLast) sfx.play("hover");
              }}
              aria-label={`Next project${currentIndex + 1} of ${totalProjects}`}
              className="rounded-2xl border border-white/14 bg-[rgba(12,14,20,0.56)] px-4 py-3 text-sm font-semibold text-white/88 shadow-[0_12px_28px_rgba(0,0,0,0.28)] backdrop-blur-lg transition-colors hover:bg-[rgba(22,24,32,0.78)] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Next
            </button>
        </div>
      </div>
    </div>
  );
}
