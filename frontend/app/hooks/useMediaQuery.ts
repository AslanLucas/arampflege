import { useSyncExternalStore } from "react";

/** Matches a media query in the browser; false while prerendering and hydrating. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => {
        list.removeEventListener("change", onChange);
      };
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type NetworkInformation = { saveData?: boolean };

/** True when the visitor asked the browser to save data. */
export function useSaveData(): boolean {
  return useSyncExternalStore(
    () => () => undefined,
    () => (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true,
    () => false,
  );
}
