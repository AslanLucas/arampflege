import { fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LottieScene, playbackSpeed } from "./LottieScene";

const animation = {
  totalFrames: 240,
  frameRate: 30,
  isPaused: true,
  listeners: new Map<string, () => void>(),
  addEventListener(name: string, listener: () => void) {
    this.listeners.set(name, listener);
  },
  setSpeed: vi.fn(),
  play: vi.fn(),
  goToAndPlay: vi.fn(),
  goToAndStop: vi.fn(),
  destroy: vi.fn(),
};

vi.mock("lottie-web/build/player/lottie_light", () => ({
  default: { loadAnimation: vi.fn(() => animation) },
}));

function mockMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce") }));
}

beforeEach(() => {
  animation.listeners.clear();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(private callback: (entries: { isIntersecting: boolean }[]) => void) {}
      observe() {
        this.callback([{ isIntersecting: true }]);
      }
      disconnect() {
        return undefined;
      }
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function renderLoaded() {
  const { container } = render(<LottieScene src="/animations/test.json" width={500} height={350} />);
  await waitFor(() => {
    expect(animation.listeners.has("DOMLoaded")).toBe(true);
  });
  animation.listeners.get("DOMLoaded")?.();
  return container.firstElementChild as HTMLElement;
}

describe("playbackSpeed", () => {
  it("fits one run into the time limit", () => {
    expect(playbackSpeed(240, 30, 5)).toBe(1.6);
    expect(playbackSpeed(150, 30, 5)).toBe(1);
    expect(playbackSpeed(60, 30, 5)).toBe(1);
  });
});

describe("LottieScene", () => {
  it("is decorative and keeps its aspect ratio", async () => {
    mockMotion(false);
    const scene = await renderLoaded();
    expect(scene).toHaveAttribute("aria-hidden", "true");
    expect(scene.style.aspectRatio).toBe("500 / 350");
  });

  it("plays once within five seconds and again on hover", async () => {
    mockMotion(false);
    const scene = await renderLoaded();
    expect(animation.setSpeed).toHaveBeenCalledWith(1.6);
    expect(animation.play).toHaveBeenCalledOnce();
    fireEvent.pointerEnter(scene);
    expect(animation.goToAndPlay).toHaveBeenCalledWith(0, true);
  });

  it("shows only the first frame with reduced motion", async () => {
    mockMotion(true);
    const scene = await renderLoaded();
    expect(animation.goToAndStop).toHaveBeenCalledWith(0, true);
    expect(animation.play).not.toHaveBeenCalled();
    fireEvent.pointerEnter(scene);
    expect(animation.goToAndPlay).not.toHaveBeenCalled();
  });
});
