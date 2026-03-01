import { projects } from "../../content/projects";
import { sfx } from "../../audio/sfx";

interface ProjectInfoOverlayProps {
  currentIndex: number;
  onClose: () => void;
}

type CaseStudy = {
  summary: string;
  video: string;
  demoNotes: string;
  technical: string[];
  results: string[];
  nextSteps: string[];
  role: string;
  timeline: string;
};

const DEFAULT_CASE_STUDY: CaseStudy = {
  summary:
    "A focused product build designed for fast iteration, clean interaction design, and reliable runtime performance.",
  video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  demoNotes:
    "The demo highlights the core user flow, transitions between primary states, and the final visual polish in realistic usage.",
  technical: [
    "Component architecture built around reusable UI blocks and clear state ownership.",
    "Motion and interaction tuned for predictable response without introducing render overhead.",
    "Performance checks applied during implementation to keep interactions smooth.",
  ],
  results: [
    "Consistent visual language across core screens.",
    "Improved interaction clarity and reduced friction in the main flow.",
    "Production-ready structure that supports future feature additions.",
  ],
  nextSteps: [
    "Add analytics and interaction telemetry to validate UX assumptions.",
    "Expand test coverage for state-heavy flows.",
    "Polish secondary edge-case states and loading transitions.",
  ],
  role: "Product + Frontend Engineering",
  timeline: "4-6 weeks",
};

const CASE_STUDY_BY_ID: Record<string, Partial<CaseStudy>> = {
  "proxy-inspector": {
    summary:
      "A developer-focused interface for inspecting proxy behavior and request flow with minimal friction.",
    role: "Frontend + Tooling",
  },
  "sneaker-store": {
    summary:
      "A modern storefront concept with emphasis on product presentation, responsive layout, and interaction quality.",
    role: "Frontend Developer",
  },
};

export default function ProjectInfoOverlay({
  currentIndex,
  onClose,
}: ProjectInfoOverlayProps) {
  const handleClose = () => {
    onClose();
  };

  const safeIndex = Math.min(Math.max(currentIndex, 0), projects.length - 1);
  const project = projects[safeIndex];
  const details: CaseStudy = { ...DEFAULT_CASE_STUDY, ...CASE_STUDY_BY_ID[project.id] };

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="pointer-events-auto absolute inset-0 bg-black/62 backdrop-blur-md"
        onClick={handleClose}
      />

      <section
        className="pointer-events-auto relative z-10 flex h-full w-full max-w-6xl flex-col px-6 pb-10 pt-8 text-white md:px-12 md:pb-14 md:pt-10"
        onWheelCapture={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-[8%] bottom-[22%] h-[40vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(128,146,255,0.16)_0%,rgba(205,120,244,0.12)_38%,rgba(16,18,24,0)_72%)] blur-3xl" />

        <div
          className="relative mt-2 min-h-0 flex-1 overflow-y-auto rounded-3xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl [scrollbar-color:rgba(255,255,255,0.24)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-white/24 [&::-webkit-scrollbar-thumb:hover]:bg-white/38 md:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-brand-primary text-[10px] font-medium tracking-[0.16em] uppercase">
                Case Study
              </p>
              <h2 className="mt-2 text-[32px] font-semibold leading-tight">{project.title}</h2>
              <p className="mt-1 text-[14px] text-white/72">
                {details.role} • {details.timeline}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              onPointerEnter={() => sfx.play("hover")}
              className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/86 transition-colors hover:bg-white/[0.1]"
            >
              Close
            </button>
          </div>

          <section>
            <h3 className="mt-7 text-base font-medium text-white">Overview</h3>
            <p className="mt-2 text-base leading-8 text-white/86">
              {project.description}
            </p>
            <p className="mt-3 text-base leading-8 text-white/82">
              {details.summary}
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-base font-medium text-white">Demo</h3>
            <div className="mt-3 grid items-start gap-4 md:grid-cols-[1.25fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-white/12 bg-black/35">
                <video
                  controls
                  muted
                  loop
                  playsInline
                  poster={project.image}
                  className="aspect-video w-full object-cover"
                >
                  <source src={details.video} type="video/mp4" />
                </video>
              </div>
              <div className="space-y-3">
                <p className="text-base leading-8 text-white/84">
                  The demo covers core workflow, state transitions, and final
                  interaction polish.
                </p>
                <p className="text-base leading-8 text-white/80">
                  Focus areas: clarity, responsiveness, and consistency across
                  the main flow.
                </p>
              </div>
            </div>
            <p className="mt-3 text-base leading-8 text-white/82">
              {details.demoNotes}
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-base font-medium text-white">Technical Details</h3>
            <div className="mt-3 space-y-2">
              {details.technical.map((item) => (
                <p key={item} className="text-base leading-8 text-white/82">
                  • {item}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-base font-medium text-white">Results</h3>
              <div className="mt-3 space-y-2">
                {details.results.map((item) => (
                  <p key={item} className="text-base leading-8 text-white/82">
                    • {item}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-white">Next Steps</h3>
              <div className="mt-3 space-y-2">
                {details.nextSteps.map((item) => (
                  <p key={item} className="text-base leading-8 text-white/82">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <footer className="mt-8 flex items-center gap-2 border-t border-white/10 pt-5">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={() => sfx.play("hover")}
              className="rounded-lg border border-white/20 bg-white/8 px-3 py-2 text-sm font-medium text-white/92 transition-colors hover:bg-white/16"
            >
              Open GitHub
            </a>
            <span className="text-sm text-white/62">Project #{safeIndex + 1}</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
