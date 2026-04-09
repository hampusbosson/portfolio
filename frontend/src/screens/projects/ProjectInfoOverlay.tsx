import { useEffect, useState } from "react";
import { projects } from "../../content/projects";
import { sfx } from "../../audio/sfx";
import { useEscapeKey } from "../../utils/useEscapeKey";

interface ProjectInfoOverlayProps {
  currentIndex: number;
  onClose: () => void;
  isEscapeEnabled?: boolean;
}

type ProjectDetails = {
  role: string;
  timeline: string;
  overview: string[];
  media: {
    src: string;
    alt: string;
    caption: string;
  }[];
  stack: string[];
  features: string[];
  challenges: string[];
  standout: string;
  award?: string;
};

const PROJECT_DETAILS: Record<string, ProjectDetails> = {
  "collab-3d-editor": {
    role: "Full-stack Engineering",
    timeline: "Academic project",
    overview: [
      "A collaborative 3D scene editor built for the browser, where multiple users can work in the same scene with live synchronization.",
      "I used it to explore realtime architecture, shared state, 3D interaction design, and the practical difficulty of making multi-user tooling feel responsive and reliable.",
    ],
    media: [
      {
        src: "/images/collab-3d-screenshots/jpg/scene-object-selected.jpg",
        alt: "Collaborative 3D Editor scene with object selected",
        caption:
          "Main editor view with an active object selected for direct scene manipulation and editing.",
      },
      {
        src: "/images/collab-3d-screenshots/jpg/scene-other-user-active.jpg",
        alt: "Collaborative 3D Editor showing another active user",
        caption:
          "Collaborative scene state showing another user active in the workspace, highlighting the multi-user aspect of the project.",
      },
      {
        src: "/images/collab-3d-screenshots/jpg/dashboard-view.jpg",
        alt: "Collaborative 3D Editor dashboard view",
        caption:
          "Dashboard view for browsing saved scenes and entering the editing workflow.",
      },
      {
        src: "/images/collab-3d-screenshots/jpg/onboarding-screen.jpg",
        alt: "Collaborative 3D Editor onboarding screen",
        caption:
          "Onboarding flow where users can enter the editor and start a collaborative session.",
      },
    ],
    stack: [
      "TypeScript",
      "React",
      "React Three Fiber",
      "Three.js",
      "C#",
      "ASP.NET Core",
      "SignalR",
      "PostgreSQL",
    ],
    features: [
      "Realtime multi-user scene editing",
      "Live collaborator presence and selection indicators",
      "Scene persistence and object state storage",
      "3D object transform and material editing",
    ],
    challenges: [
      "Keeping shared scene state consistent across multiple connected users",
      "Separating REST-style persistence from realtime collaboration events cleanly",
      "Making browser-based 3D editing feel usable without sacrificing responsiveness",
    ],
    standout:
      "This is one of my strongest projects because it combines realtime collaboration, 3D interaction, backend architecture, and product polish in one system.",
    award: "Best project award in Webbprogrammering 2",
  },
  "proxy-inspector": {
    role: "Full-stack Engineering",
    timeline: "Course project",
    overview: [
      "A custom HTTP forward proxy paired with a monitoring dashboard for inspecting traffic, policy behavior, and request outcomes.",
      "The goal was to build backend infrastructure from lower-level primitives and then present that operational data through a clean frontend workflow.",
    ],
    media: [
      {
        src: "/images/proxy-server-screenshots/jpg/dashboard.jpg",
        alt: "Proxy Inspector preview",
        caption:
          "Dashboard view for monitoring proxy traffic, showing recent requests, filtering options, and traffic statistics.",
      },
    ],
    stack: [
      "Java",
      "HTTP",
      "REST API",
      "React",
      "TypeScript",
      "Vite",
      "JUnit 5",
    ],
    features: [
      "Custom request forwarding and inspection",
      "Rule-based filtering and blocking behavior",
      "Traffic statistics and recent transaction history",
      "Frontend dashboard for monitoring proxy activity",
    ],
    challenges: [
      "Handling protocol logic directly instead of leaning on a proxy framework",
      "Structuring proxy behavior, policies, logging, and API exposure cleanly",
      "Turning raw traffic data into a UI that is understandable at a glance",
    ],
    standout:
      "What makes this project useful is that it demonstrates backend depth, low-level networking work, and a product-minded monitoring interface around the system.",
    award: "Best project award in Programming for Internet",
  },
  "github-security-scanner": {
    role: "Full-stack Product Engineering",
    timeline: "Ongoing build",
    overview: [
      "A GitHub repository security scanning workspace built around authentication, repository sync, queued scans, and persisted findings.",
      "The project is designed to explore long-running job orchestration, GitHub integration, and how to shape technical scan output into a usable product flow.",
    ],
    media: [
      {
        src: "/images/security-app-screenshots/jpg/landing-page.jpg",
        alt: "GitHub Security Scanner landing page",
        caption:
          "Landing page introducing the security scanning workflow and product direction.",
      },
      {
        src: "/images/security-app-screenshots/jpg/github-login-view.jpg",
        alt: "GitHub Security Scanner GitHub login view",
        caption:
          "GitHub authentication flow that connects the user into the repository scanning workspace.",
      },
      {
        src: "/images/security-app-screenshots/jpg/dashboard-view.jpg",
        alt: "GitHub Security Scanner dashboard view",
        caption:
          "Dashboard view for selecting repositories, starting scans, and monitoring overall scan activity.",
      },
      {
        src: "/images/security-app-screenshots/jpg/findings-view.jpg",
        alt: "GitHub Security Scanner findings view",
        caption:
          "Findings workspace for reviewing scan output, vulnerabilities, and report details after execution.",
      },
    ],
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
    ],
    features: [
      "GitHub OAuth and GitHub App repository access",
      "Queued scan execution with persisted lifecycle state",
      "Report and vulnerability review workspace",
      "Recovery handling for interrupted or cancelled jobs",
    ],
    challenges: [
      "Connecting GitHub identity and installation flows into one coherent system",
      "Managing async scan execution without blocking the request cycle",
      "Designing a UI that makes findings and scan states easy to understand quickly",
    ],
    standout:
      "This project stands out because it deals with real product concerns like job orchestration, failure recovery, and turning backend scan output into something operationally useful.",
  },
  studysphere: {
    role: "Full-stack + AI Features",
    timeline: "Ongoing build",
    overview: [
      "An AI-assisted study workspace for organizing lecture material, generating summaries and quizzes, and planning study sessions.",
      "I approached it as a real product workflow rather than a single AI feature, with content, planning, practice, and account-based user flows tied together.",
      "The app also includes a fully working custom authentication system built with Passport.js and bcrypt, covering login, sign-up, and reset-password flows instead of relying on a managed auth provider.",
    ],
    media: [
      {
        src: "/images/study-app-screenshots/jpg/dashboard.jpg",
        alt: "Study App dashboard",
        caption:
          "Dashboard view showing the main study overview and the starting point for navigating courses, lectures, and planning.",
      },
      {
        src: "/images/study-app-screenshots/jpg/courses-page.jpg",
        alt: "Study App courses page",
        caption:
          "Courses page for organizing study material into structured course spaces.",
      },
      {
        src: "/images/study-app-screenshots/jpg/add-lecture-modal.jpg",
        alt: "Study App add lecture modal",
        caption:
          "Lecture creation flow for adding new material into the app and feeding the rest of the study workflow.",
      },
      {
        src: "/images/study-app-screenshots/jpg/pdf-view.jpg",
        alt: "Study App PDF reading view",
        caption:
          "Lecture reading workspace where source material can be reviewed directly inside the app.",
      },
      {
        src: "/images/study-app-screenshots/jpg/summary-view.jpg",
        alt: "Study App summary view",
        caption:
          "AI-generated summary view that turns lecture material into faster-to-review study notes.",
      },
      {
        src: "/images/study-app-screenshots/jpg/quiz-view.jpg",
        alt: "Study App quiz view",
        caption:
          "Quiz interface for practicing lecture content through generated questions and answers.",
      },
      {
        src: "/images/study-app-screenshots/jpg/calendar-page.jpg",
        alt: "Study App calendar page",
        caption:
          "Calendar view used for planning study sessions and tying course work to an actual schedule.",
      },
      {
        src: "/images/study-app-screenshots/jpg/login.jpg",
        alt: "Study App login screen",
        caption:
          "Login screen for entering the app and accessing the personalized study workspace.",
      },
      {
        src: "/images/study-app-screenshots/jpg/sign-up.jpg",
        alt: "Study App sign up screen",
        caption:
          "Sign-up flow for new users entering the platform for the first time.",
      },
      {
        src: "/images/study-app-screenshots/jpg/reset-password.jpg",
        alt: "Study App reset password screen",
        caption:
          "Password reset flow as part of the app's authentication and account management experience.",
      },
    ],
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Passport.js",
      "bcrypt",
      "Prisma",
      "PostgreSQL",
      "OpenAI API",
    ],
    features: [
      "Course and lecture organization",
      "AI-generated summaries and quiz questions",
      "Lecture reading workflow inside the app",
      "Calendar-based study session planning",
      "Custom authentication flow with sign-up, login, and password reset",
    ],
    challenges: [
      "Keeping lecture content, generated material, and planning in one coherent workflow",
      "Making AI output useful instead of bolting it on as a gimmick",
      "Designing an interface that feels product-like across multiple content-heavy screens",
      "Building and integrating a custom auth flow with Passport.js and bcrypt into the broader application experience",
    ],
    standout:
      "The strength of this project is that it treats AI as part of a broader learning product, while also handling core application concerns like authentication, structured data, and multi-screen workflow design.",
  },
  "interactive-portfolio": {
    role: "Frontend + Backend + Product Design",
    timeline: "Active project",
    overview: [
      "A portfolio platform built as an interactive product, combining 3D presentation, layered UI screens, and a backend knowledge system.",
      "I built it to explore how personal presentation can still have real engineering depth when treated as a system rather than a static site.",
    ],
    media: [
      {
        src: "/images/sneaker-store.jpg",
        alt: "Interactive Portfolio preview",
        caption:
          "Current placeholder image. Replace this with a screenshot of the 3D project screen or the about/chat overlays.",
      },
    ],
    stack: [
      "TypeScript",
      "React",
      "React Three Fiber",
      "Three.js",
      "Node.js",
      "Express",
      "OpenAI API",
      "Prisma",
    ],
    features: [
      "3D screen-based navigation",
      "Layered project, about, and chat overlays",
      "Grounded portfolio assistant backed by structured knowledge",
      "Persistent chat history and backend retrieval flow",
    ],
    challenges: [
      "Combining WebGL presentation with HTML-heavy content screens cleanly",
      "Keeping assistant answers grounded in curated project data",
      "Balancing visual personality with readability and product clarity",
    ],
    standout:
      "This project reflects how I like to work: interactive frontend systems, backend structure, and attention to the product feel as a whole.",
  },
};

export default function ProjectInfoOverlay({
  currentIndex,
  onClose,
  isEscapeEnabled = true,
}: ProjectInfoOverlayProps) {
  const safeIndex = Math.min(Math.max(currentIndex, 0), projects.length - 1);
  const project = projects[safeIndex];
  const details = PROJECT_DETAILS[project.id];
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveMediaIndex(0);
    setIsLightboxOpen(false);
  }, [project.id]);

  useEscapeKey(() => {
    if (isLightboxOpen) {
      setIsLightboxOpen(false);
      return;
    }

    onClose();
  }, isEscapeEnabled);

  const media = details.media;
  const activeMedia = media[Math.min(activeMediaIndex, media.length - 1)];

  const handlePrevMedia = () => {
    setActiveMediaIndex((current) =>
      current === 0 ? media.length - 1 : current - 1,
    );
  };

  const handleNextMedia = () => {
    setActiveMediaIndex((current) =>
      current === media.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="pointer-events-auto absolute inset-0 bg-black/66 backdrop-blur-md"
        onClick={onClose}
      />

      <section
        className="pointer-events-auto relative z-10 flex h-full w-full max-w-6xl flex-col px-6 pb-8 pt-8 text-white md:px-12 md:pb-10 md:pt-10"
        onWheelCapture={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[34vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(195,148,73,0.14)_0%,rgba(16,18,24,0)_70%)] blur-3xl" />

        <div className="relative mt-2 min-h-0 flex-1 overflow-y-auto rounded-[28px] border border-white/12 bg-[#0f131a]/92 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.36)] [scrollbar-color:rgba(255,255,255,0.24)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-white/24 [&::-webkit-scrollbar-thumb:hover]:bg-white/36 md:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div className="max-w-3xl">
              <p className="text-brand-primary text-[10px] font-medium tracking-[0.18em] uppercase">
                Project Case Study
              </p>
              <h2 className="mt-2 text-[30px] font-semibold leading-tight text-brand-secondary md:text-[38px]">
                {project.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-brand-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-white/62">
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
                  {details.role}
                </span>
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
                  {details.timeline}
                </span>
                {details.award ? (
                  <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1.5 text-brand-primary">
                    {details.award}
                  </span>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              onPointerEnter={() => sfx.play("hover")}
              className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/86 transition-colors hover:bg-white/[0.1]"
            >
              Close
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Media
                </h3>
                <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    onPointerEnter={() => sfx.play("hover")}
                    className="block w-full hover:cursor-pointer"
                  >
                    <img
                      src={activeMedia.src}
                      alt={activeMedia.alt}
                      className="aspect-video w-full object-cover transition-transform duration-200 hover:scale-[1.01]"
                    />
                  </button>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <p className="text-sm leading-7 text-white/68">
                    {activeMedia.caption}
                  </p>
                  {media.length > 1 ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMedia}
                        onPointerEnter={() => sfx.play("hover")}
                        className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMedia}
                        onPointerEnter={() => sfx.play("hover")}
                        className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                      >
                        Next
                      </button>
                    </div>
                  ) : null}
                </div>
                {media.length > 1 ? (
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {media.map((item, index) => (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        onClick={() => setActiveMediaIndex(index)}
                        onPointerEnter={() => sfx.play("hover")}
                        className={`overflow-hidden rounded-xl border transition-colors ${
                          index === activeMediaIndex
                            ? "border-brand-primary/40"
                            : "border-white/10 hover:border-white/22"
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="aspect-video w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Overview
                </h3>
                <div className="mt-3 space-y-4">
                  {details.overview.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-8 text-white/82"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Why It Stands Out
                </h3>
                <p className="mt-3 rounded-2xl border border-brand-primary/20 bg-brand-primary/8 px-4 py-4 text-[15px] leading-8 text-brand-secondary">
                  {details.standout}
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {details.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Key Features
                </h3>
                <div className="mt-3 space-y-3">
                  {details.features.map((item) => (
                    <p
                      key={item}
                      className="border-l border-white/12 pl-4 text-[15px] leading-7 text-white/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Technical Challenges
                </h3>
                <div className="mt-3 space-y-3">
                  {details.challenges.map((item) => (
                    <p
                      key={item}
                      className="border-l border-brand-primary/25 pl-4 text-[15px] leading-7 text-white/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Links
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      onPointerEnter={() => sfx.play("hover")}
                      className="rounded-lg border border-white/20 bg-white/8 px-3 py-2 text-sm font-medium text-white/92 transition-colors hover:bg-white/16"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      onPointerEnter={() => sfx.play("hover")}
                      className="rounded-lg border border-brand-primary/30 bg-brand-primary/12 px-3 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-primary/18"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen ? (
        <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-black/82 backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          />

          <div className="relative z-10 flex w-full max-w-7xl flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm leading-7 text-white/72">
                {activeMedia.caption}
              </p>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                onPointerEnter={() => sfx.play("hover")}
                className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/86 transition-colors hover:bg-white/[0.1]"
              >
                Close
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              <img
                src={activeMedia.src}
                alt={activeMedia.alt}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>

            {media.length > 1 ? (
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevMedia}
                  onPointerEnter={() => sfx.play("hover")}
                  className="rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                >
                  Previous Image
                </button>
                <span className="text-sm text-white/58">
                  {activeMediaIndex + 1} / {media.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextMedia}
                  onPointerEnter={() => sfx.play("hover")}
                  className="rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                >
                  Next Image
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
