import { useSyncExternalStore } from "react";

const subscribeNothing = () => () => undefined;

/** False during prerendering and hydration, true once React runs in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}
