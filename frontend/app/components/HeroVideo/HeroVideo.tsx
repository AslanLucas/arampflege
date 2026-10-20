import { useRef, useState } from "react";
import { useHydrated } from "../../hooks/useHydrated";
import { useMediaQuery, useSaveData } from "../../hooks/useMediaQuery";
import { PauseIcon, PlayIcon } from "../Icon/icons";
import styles from "./HeroVideo.module.css";

type HeroVideoProps = {
  clips: string[];
  poster: string;
};

/**
 * Decorative background: clips play one after another, muted, under a brand-coloured
 * layer. Only on wide screens, without "reduce motion" and without data saving; otherwise
 * the still image stays. Moving content needs a pause control (WCAG 2.2.2).
 */
export function HeroVideo({ clips, poster }: HeroVideoProps) {
  const hydrated = useHydrated();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wide = useMediaQuery("(min-width: 40rem)");
  const saveData = useSaveData();
  const [clip, setClip] = useState(0);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const playVideo = hydrated && wide && !reducedMotion && !saveData && clips.length > 0;

  return (
    <>
      <div className={styles.media} aria-hidden="true">
        <img className={styles.still} src={poster} alt="" width={960} height={540} />
        {playVideo && (
          <video
            ref={video}
            key={clips[clip]}
            className={styles.video}
            src={clips[clip]}
            poster={clip === 0 ? poster : undefined}
            autoPlay={!paused}
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              setClip((current) => (current + 1) % clips.length);
            }}
          />
        )}
        <div className={styles.overlay} />
      </div>
      {playVideo && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => {
            const element = video.current;
            if (paused) {
              void element?.play();
            } else {
              element?.pause();
            }
            setPaused(!paused);
          }}
        >
          {paused ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
          {paused ? "Video abspielen" : "Video anhalten"}
        </button>
      )}
    </>
  );
}
