import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom does not implement layout APIs; node-environment tests have no DOM at all.
if (typeof Element !== "undefined") {
  Element.prototype.scrollIntoView = () => undefined;

  // jsdom has no media queries: behave like a narrow screen without motion preferences.
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }) satisfies MediaQueryList;

  // jsdom does not implement SMIL animation control on <svg>.
  Object.assign(SVGSVGElement.prototype, {
    pauseAnimations: () => undefined,
    unpauseAnimations: () => undefined,
    setCurrentTime: () => undefined,
    animationsPaused: () => true,
  });

  window.IntersectionObserver = class {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    observe = () => undefined;
    unobserve = () => undefined;
    disconnect = () => undefined;
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
}

afterEach(() => {
  cleanup();
});
