import type { ProjectDetails } from "../types/projectDetails";

export const PROJECT_DETAILS: Record<string, ProjectDetails> = {
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
        src: "/images/portfolio-screenshots/jpg/start.jpg",
        alt: "Interactive Portfolio start screen",
        caption:
          "Start screen with the interactive 3D presentation, bubble interactions, and the initial portfolio introduction.",
      },
      {
        src: "/images/portfolio-screenshots/jpg/projects.jpg",
        alt: "Interactive Portfolio projects screen",
        caption:
          "Projects screen where the showcase is navigated through a 3D display system with project switching and embedded media.",
      },
      {
        src: "/images/portfolio-screenshots/jpg/project-details.jpg",
        alt: "Interactive Portfolio project details overlay",
        caption:
          "Project detail overlay used for deeper case-study style content, screenshots, stack breakdowns, and implementation notes.",
      },
      {
        src: "/images/portfolio-screenshots/jpg/about-me.jpg",
        alt: "Interactive Portfolio about page",
        caption:
          "About page with the sticky map header, layered profile content, and a more editorial presentation of background and skills.",
      },
      {
        src: "/images/portfolio-screenshots/jpg/chat-interface.jpg",
        alt: "Interactive Portfolio AI chat interface",
        caption:
          "Grounded AI assistant overlay connected to a backend knowledge base, designed to answer recruiter and visitor questions about the portfolio.",
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
