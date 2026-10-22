import { useEffect, useRef } from "react";
import { cx } from "../../utils/cx";
import styles from "./LottieScene.module.css";

type LottieSceneProps = {
  /** Path of a prepared animation in public/animations (scripts/prepare-lottie.py). */
  src: string;
  width: number;
  height: number;
  /** One run never lasts longer than this, so no pause control is needed (WCAG 2.2.2). */
  durationLimitSec?: number;
  className?: string;
};

/** Speed factor that fits one run of the animation into the time limit. */
export function playbackSpeed(totalFrames: number, frameRate: number, limitSec: number): number {
  const seconds = totalFrames / frameRate;
  return Math.max(1, seconds / limitSec);
}

/**
 * Decorative illustration (exception from DESIGN.md, decision 2026-10-22). The player loads
 * only when the scene scrolls into view, plays once and plays again on hover. With "reduce
 * motion" it shows the first frame; without JavaScript only the calm background stays.
 */
export function LottieScene({ src, width, height, durationLimitSec = 5, className }: LottieSceneProps) {
  const frame = useRef<HTMLDivElement>(null);
  const replay = useRef<() => void>(() => undefined);

  useEffect(() => {
    const container = frame.current;
    if (!container) {
      return;
    }
    let destroyed = false;
    let destroy: () => void = () => undefined;

    const start = async () => {
      const { default: lottie } = await import("lottie-web/build/player/lottie_light");
      if (destroyed) {
        return;
      }
      const animation = lottie.loadAnimation({
        container,
        path: src,
        renderer: "svg",
        loop: false,
        autoplay: false,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      destroy = () => {
        animation.destroy();
      };
      animation.addEventListener("DOMLoaded", () => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          animation.goToAndStop(0, true);
          return;
        }
        animation.setSpeed(playbackSpeed(animation.totalFrames, animation.frameRate, durationLimitSec));
        animation.play();
        replay.current = () => {
          if (animation.isPaused) {
            animation.goToAndPlay(0, true);
          }
        };
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void start();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(container);

    return () => {
      destroyed = true;
      observer.disconnect();
      destroy();
    };
  }, [src, durationLimitSec]);

  return (
    <div
      ref={frame}
      className={cx(styles.scene, className)}
      style={{ aspectRatio: `${String(width)} / ${String(height)}` }}
      aria-hidden="true"
      onPointerEnter={() => {
        replay.current();
      }}
    />
  );
}
