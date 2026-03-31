export default function AboutHeadshot() {
  return (
    <div className="absolute right-6 bottom-0 w-[112px] translate-y-1/2 md:right-9 md:w-[200px]">
      <div className="about-headshot-card rounded-2xl border border-white/20 bg-black/20 p-1.5 shadow-[0_24px_38px_rgba(0,0,0,0.45)] backdrop-blur-sm md:rounded-3xl md:p-2">
        <img
          src="/images/headshot.webp"
          alt="Hampus portrait"
          className="h-full w-full rounded-xl object-cover md:rounded-2xl"
        />
      </div>
    </div>
  );
}
