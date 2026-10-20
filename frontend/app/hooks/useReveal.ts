import { useEffect, useRef } from "react";

/**
 * Fades an element in when it scrolls into view. Only elements that start below the
 * visible area are hidden, and only in the browser without "reduce motion", so the
 * prerendered page and visitors without JavaScript always see all content.
 * State lives in a data attribute, styled in base.css.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (element.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    element.style.setProperty("--reveal-delay", `${String(delayMs)}ms`);
    element.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [delayMs]);

  return ref;
}
