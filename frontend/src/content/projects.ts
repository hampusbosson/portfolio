import type { Project } from "../types/types";

export const projects: Project[] = [
  {
    id: "collab-3d-editor",
    image: "/images/collab-3d-screenshots/jpg/scene-object-selected.jpg",
    video: "/videos/3d-collab-demo.mp4",
    title: "Collaborative 3D Editor",
    shortTitle: "3D Editor",
    description:
      "Real-time multi-user 3D scene editor with live sync, persistence, and interactive object editing in the browser.",
    githubLink: "https://github.com/hampusbosson/3D-collab-app",
    demoLink: "https://threed-collab-app-1.onrender.com",
  },
  {
    id: "proxy-inspector",
    image: "/images/proxy-server-screenshots/jpg/dashboard.jpg",
    video: "/videos/proxy-server-demo.mp4",
    title: "Proxy Inspector",
    shortTitle: "Proxy",
    description:
      "Custom HTTP forward proxy with rule-based filtering, monitoring API, and a live developer dashboard.",
    githubLink: "https://github.com/hampusbosson/proxy-server",
    demoLink: "",
  },
  {
    id: "studysphere",
    image: "/images/study-app-screenshots/jpg/dashboard.jpg",
    video: "/videos/study-app-x2.mp4",
    title: "Study App",
    shortTitle: "Study",
    description:
      "AI-assisted study workspace with summaries, quizzes, lecture organization, session planning, and a custom Passport.js + bcrypt auth system.",
    githubLink: "https://github.com/hampusbosson/study-app",
    demoLink: "",
  },
  {
    id: "github-security-scanner",
    image: "/images/security-app-screenshots/jpg/findings-view.jpg",
    video: "/videos/security-app-demo.mp4",
    title: "GitHub Security Scanner",
    shortTitle: "Scanner",
    description:
      "Full-stack security scanning workspace with queued execution, findings storage, and GitHub integration.",
    githubLink: "https://github.com/hampusbosson/security-app",
    demoLink: "",
  },
  {
    id: "interactive-portfolio",
    image: "/images/sneaker-store.jpg",
    title: "Interactive Portfolio",
    shortTitle: "Portfolio",
    description:
      "3D portfolio experience with custom screen-based navigation, a backend knowledge system, and a grounded AI assistant.",
    githubLink: "https://github.com/hampusbosson/portfolio",
    demoLink: "",
  },
];
