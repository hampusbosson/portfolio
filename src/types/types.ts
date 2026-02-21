export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  githubLink: string;
}

export type Page = "start" | "projects";

export type imageTexture =
  | HTMLImageElement
  | HTMLCanvasElement
  | ImageBitmap
  | undefined;
