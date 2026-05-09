import { interpolate } from "remotion";
import { easings } from "./easings";

// Computes per-frame opacity envelope with cross-fade-friendly windows.
// Visibility window extends BEFORE frame.from and AFTER frame.from + dur,
// so adjacent frames overlap visually for a natural cinematic dissolve.
export const useLocal = (frame: number, from: number, dur: number) => {
  const local = frame - from;
  const fadeIn = Math.min(14, Math.max(8, Math.floor(dur * 0.22)));
  const fadeOut = Math.min(14, Math.max(8, Math.floor(dur * 0.22)));

  const visible = local >= -fadeIn && local <= dur + fadeOut;

  // Fades cross zero (negative range) to overlap with previous frame
  const opIn = interpolate(local, [-fadeIn, fadeIn], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opOut = interpolate(local, [dur - fadeOut, dur + fadeOut], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { local, visible, opacity: opIn * opOut };
};
