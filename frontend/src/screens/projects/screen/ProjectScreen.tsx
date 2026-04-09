import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { MeshStandardMaterial, SRGBColorSpace, VideoTexture } from "three";
import type * as THREE from "three";
import { projects } from "../../../content/projects";
import TextBox from "./TextBox";

// constants
const FRAME_BORDER = 0.03;
const FRAME_DEPTH = 0.01;
const BASE_OPEN_W = 2.48;
const PROJECT_VIDEO_URLS = [...new Set(projects.map((project) => project.video).filter(Boolean))];
const videoPreloadCache = new Map<string, HTMLVideoElement>();
const videoTextureCache = new Map<string, VideoTexture>();

interface ProjectScreenProps {
  activeIndex: number;
  onOpenProjectInfo: () => void;
}

type TextureSourceData = {
  videoWidth?: number;
  videoHeight?: number;
  naturalWidth?: number;
  naturalHeight?: number;
  width?: number;
  height?: number;
};

function getTextureDimensions(source: unknown) {
  if (!source || typeof source !== "object") {
    return { width: 0, height: 0 };
  }

  const data = source as TextureSourceData;

  return {
    width: data.videoWidth ?? data.naturalWidth ?? data.width ?? 0,
    height: data.videoHeight ?? data.naturalHeight ?? data.height ?? 0,
  };
}

function getOrCreateVideoElement(src: string) {
  let video = videoPreloadCache.get(src);

  if (!video) {
    video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.load();

    videoPreloadCache.set(src, video);
  }

  return video;
}

function getOrCreateVideoTexture(src: string) {
  let texture = videoTextureCache.get(src);

  if (!texture) {
    const video = getOrCreateVideoElement(src);
    texture = new VideoTexture(video);
    videoTextureCache.set(src, texture);
  }

  return texture;
}

function VideoInsetPlane({
  src,
  width,
  height,
}: {
  src: string;
  width: number;
  height: number;
}) {
  const videoTexture = useMemo(() => getOrCreateVideoTexture(src), [src]);

  useEffect(() => {
    const video = getOrCreateVideoElement(src);
    void video.play().catch(() => {});
  }, [src]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={videoTexture} toneMapped={false} />
    </mesh>
  );
}

function ImageInsetPlane({
  texture,
  width,
  height,
}: {
  texture: THREE.Texture;
  width: number;
  height: number;
}) {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// preload image textures
const PROJECT_IMAGE_URLS = projects.map((project) => project.image);
PROJECT_IMAGE_URLS.forEach((url) => useTexture.preload(url));

function preloadProjectVideos() {
  if (typeof document === "undefined") return;

  for (const src of PROJECT_VIDEO_URLS) {
    const video = getOrCreateVideoElement(src);
    getOrCreateVideoTexture(src);
    video.addEventListener(
      "canplaythrough",
      () => {
        void video.play().catch(() => {});
      },
      { once: true },
    );
  }
}

export default function ProjectScreen({
  activeIndex,
  onOpenProjectInfo,
}: ProjectScreenProps) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), projects.length - 1);
  const activeProject = projects[safeIndex];
  const title = activeProject.title;

  const imageTextures = useTexture(PROJECT_IMAGE_URLS);
  const activeTexture = imageTextures[safeIndex];

  // Ensure display textures are treated as sRGB color textures.
  useEffect(() => {
    for (const texture of imageTextures) {
      texture.colorSpace = SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [imageTextures]);

  useEffect(() => {
    preloadProjectVideos();
  }, []);

  const { width: sourceWidth, height: sourceHeight } = getTextureDimensions(
    activeTexture?.source?.data,
  );
  const imgW = sourceWidth || activeTexture?.image?.width || activeTexture?.width || 1;
  const imgH = sourceHeight || activeTexture?.image?.height || activeTexture?.height || 1;
  
  // memoize layout dimensions (prevent unnecessary re-renders)
  const { openW, openH, frameW, frameH } = useMemo(() => {
    const imgAspect = imgW / imgH;
    const openW = BASE_OPEN_W;
    const openH = BASE_OPEN_W / imgAspect;
    const frameW = openW + FRAME_BORDER * 2;
    const frameH = openH + FRAME_BORDER * 2;

    return { openW, openH, frameW, frameH };
  }, [imgW, imgH]);

  const frameMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#141414",
        metalness: 0.2,
        roughness: 0.8,
        envMapIntensity: 0.6,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      frameMaterial.dispose();
    };
  }, [frameMaterial]);

  return (
    <group position={[0, 0.75, 0]}>
      <TextBox
        key={activeProject.id}
        title={title}
        activeIndex={safeIndex}
        onInfoClick={onOpenProjectInfo}
      />

      {/* Inset image */}
      {activeProject.video ? (
        <VideoInsetPlane src={activeProject.video} width={openW} height={openH} />
      ) : (
        <ImageInsetPlane texture={activeTexture} width={openW} height={openH} />
      )}

      {/* Frame bars */}
      <mesh position={[0, (frameH - FRAME_BORDER) / 2, FRAME_DEPTH * 0.5]}>
        <boxGeometry args={[frameW, FRAME_BORDER, FRAME_DEPTH]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[0, -(frameH - FRAME_BORDER) / 2, FRAME_DEPTH * 0.5]}>
        <boxGeometry args={[frameW, FRAME_BORDER, FRAME_DEPTH]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[(frameW - FRAME_BORDER) / 2, 0, FRAME_DEPTH * 0.5]}>
        <boxGeometry
          args={[FRAME_BORDER, frameH - FRAME_BORDER * 2, FRAME_DEPTH]}
        />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[-(frameW - FRAME_BORDER) / 2, 0, FRAME_DEPTH * 0.5]}>
        <boxGeometry
          args={[FRAME_BORDER, frameH - FRAME_BORDER * 2, FRAME_DEPTH]}
        />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
    </group>
  );
}
