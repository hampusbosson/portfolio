import { useCallback, useSyncExternalStore } from "react";

export const MOBILE_BREAKPOINT_PX = 768;

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT_PX) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 0.02}px)`);
      const handleChange = () => onStoreChange();

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    },
    [breakpoint],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(`(max-width: ${breakpoint - 0.02}px)`).matches;
  }, [breakpoint]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
