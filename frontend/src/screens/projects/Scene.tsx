import ProjectScreen from "./screen/ProjectScreen";
import ProjectFloor from "./ProjectFloor";

interface SceneProps {
  currentIndex: number;
  onOpenProjectInfo: () => void;
  isPaused: boolean;
  isMobile: boolean;
  isActive: boolean;
}

export default function Scene({
  currentIndex,
  onOpenProjectInfo,
  isPaused,
  isMobile,
  isActive,
}: SceneProps) {
  return (
    <group position={isMobile ? [0, -0.55, -0.2] : [0, -0.5, 0]}>
      <group
        position={isMobile ? [0, 0, 3] : [0, 0, 5]}
        scale={isMobile ? 0.7 : 1}
      >
        <ProjectScreen
          activeIndex={currentIndex}
          onOpenProjectInfo={onOpenProjectInfo}
          isActive={isActive}
        />
      </group>
      <ProjectFloor isPaused={isPaused} />
    </group>
  );
}
