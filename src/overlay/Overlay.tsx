import { Html } from "@react-three/drei";

interface OverlayProps {
  setActiveScreen: (screen: string) => void;
}

export default function Overlay({ setActiveScreen }: OverlayProps) {
  // useFrame(() => {
  //   if (projectsActive) {

  //   }
  // })
  return (
    <>
      <Html fullscreen>
        <div className="pointer-events-none absolute inset-0 font-['Space_Grotesk'] text-white">
          <div className="absolute top-[clamp(12px,2vw,24px)] left-[clamp(12px,2vw,24px)]">
            <h1 className="m-0 text-[clamp(1rem,3vw,2rem)] leading-[1.1] font-bold tracking-[0.02em]">
              Hampus Bosson
            </h1>
            <p className="mt-[clamp(4px,0.8vw,10px)] text-[clamp(0.76rem,1.15vw,0.96rem)] font-medium tracking-[0.08em] text-white/80 uppercase">
              Software Developer
            </p>
          </div>
          <nav
            className="pointer-events-auto absolute top-[clamp(12px,2vw,24px)] left-1/2 flex -translate-x-1/2 items-center gap-[clamp(8px,1.2vw,18px)] max-md:top-auto max-md:bottom-[clamp(14px,4vw,24px)] max-md:w-[min(92vw,440px)] max-md:flex-wrap max-md:justify-center"
            aria-label="Main navigation"
          >
            <button
              onClick={() => setActiveScreen("start")}
              className="cursor-pointer rounded-full border border-white/25 bg-white/8 px-[clamp(12px,1.7vw,22px)] py-[clamp(8px,1vw,12px)] text-[clamp(0.68rem,0.95vw,0.88rem)] font-medium tracking-[0.05em] text-white/90 uppercase shadow-[0_8px_22px_rgba(0,0,0,0.2)] backdrop-blur-[4px] transition-all duration-180 hover:translate-y-[-1px] hover:scale-[1.01] hover:border-white/50 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/95 max-md:flex-1"
              type="button"
            >
              Start
            </button>
            <button
              onClick={() => setActiveScreen("projects")}
              className="cursor-pointer rounded-full border border-white/25 bg-white/8 px-[clamp(12px,1.7vw,22px)] py-[clamp(8px,1vw,12px)] text-[clamp(0.68rem,0.95vw,0.88rem)] font-medium tracking-[0.05em] text-white/90 uppercase shadow-[0_8px_22px_rgba(0,0,0,0.2)] backdrop-blur-[4px] transition-all duration-180 hover:translate-y-[-1px] hover:scale-[1.01] hover:border-white/50 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/95 max-md:flex-1"
              type="button"
            >
              Projects
            </button>
            <button
              className="cursor-pointer rounded-full border border-white/25 bg-white/8 px-[clamp(12px,1.7vw,22px)] py-[clamp(8px,1vw,12px)] text-[clamp(0.68rem,0.95vw,0.88rem)] font-medium tracking-[0.05em] text-white/90 uppercase shadow-[0_8px_22px_rgba(0,0,0,0.2)] backdrop-blur-[4px] transition-all duration-180 hover:translate-y-[-1px] hover:scale-[1.01] hover:border-white/50 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/95 max-md:flex-1"
              type="button"
            >
              About Me
            </button>
            <button
              className="cursor-pointer rounded-full border border-white/25 bg-white/8 px-[clamp(12px,1.7vw,22px)] py-[clamp(8px,1vw,12px)] text-[clamp(0.68rem,0.95vw,0.88rem)] font-medium tracking-[0.05em] text-white/90 uppercase shadow-[0_8px_22px_rgba(0,0,0,0.2)] backdrop-blur-[4px] transition-all duration-180 hover:translate-y-[-1px] hover:scale-[1.01] hover:border-white/50 hover:bg-white/12 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/95 max-md:flex-1"
              type="button"
            >
              Ask Me a Question
            </button>
          </nav>
        </div>
      </Html>
    </>
  );
}
