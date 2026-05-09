import { interpolate } from "remotion";
import { easings } from "./easings";

// Per-frame opacity envelope. Hard cut (no overlap) between adjacent frames
// so visually similar consecutive scenes (e.g. RAISE letters) don't ghost
// over each other. The visibility window keeps a small margin so the
// component is mounted slightly before from and after dur, but opacity
// strictly fades within [0, dur].
export const useLocal = (frame: number, from: number, dur: number) => {
  const local = frame - from;
  const fadeIn = Math.min(12, Math.max(6, Math.floor(dur * 0.18)));
  const fadeOut = Math.min(12, Math.max(6, Math.floor(dur * 0.18)));

  const visible = local >= -2 && local <= dur + 2;

  const opIn = interpolate(local, [0, fadeIn], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opOut = interpolate(local, [dur - fadeOut, dur], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return { local, visible, opacity: opIn * opOut };
};
