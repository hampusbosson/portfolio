export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  githubLink: string;
}

export type Position = [number, number, number];

export type Page = "start" | "projects";

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
