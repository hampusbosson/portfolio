function ControlsOverlay() {
  return (
    <div className="pointer-events-none fixed bottom-8 left-8 z-50">
      <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-medium tracking-wide text-white/85 shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex items-center gap-1.5 text-white/90">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/25 bg-white/10">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/25 bg-white/10">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current" aria-hidden="true">
              <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <span className="text-white/75">Nxt / Prev.</span>
      </div>
    </div>
  );
}

export default ControlsOverlay;
