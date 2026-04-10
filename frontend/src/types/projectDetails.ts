export interface ProjectMediaItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ProjectDetails {
  role: string;
  timeline: string;
  overview: string[];
  media: ProjectMediaItem[];
  stack: string[];
  features: string[];
  challenges: string[];
  standout: string;
  award?: string;
}
