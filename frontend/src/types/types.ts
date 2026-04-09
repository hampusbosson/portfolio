export interface Project {
  id: string;
  image: string;
  video?: string;
  title: string;
  shortTitle: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
}

export type Position = [number, number, number];

export type Page = "start" | "projects" | "about";

export type imageTexture =
  | HTMLImageElement
  | HTMLCanvasElement
  | ImageBitmap
  | undefined;

export type BubbleVariant = {
  timeOffset: number;
  posFreq: number;
  timeFreq: number;
  strength: number;
  warpPosFreq: number;
  warpTimeFreq: number;
  warpStrength: number;
};

export type Bubble = {
  id: string;
  radius: number;
  detail: number;
  position: [number, number, number];
  variant: BubbleVariant;
};
