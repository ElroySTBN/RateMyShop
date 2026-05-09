import { Easing } from "remotion";

export const easings = {
  // Strong ease-out, no overshoot — UI entrance "Apple-like"
  enter: Easing.bezier(0.16, 1, 0.3, 1),
  // Symmetrical ease-in-out for slow holds
  editorial: Easing.bezier(0.45, 0, 0.55, 1),
  // Subtle overshoot for emphasis
  pop: Easing.bezier(0.34, 1.4, 0.64, 1),
  // Sharp exit (gravity)
  exit: Easing.bezier(0.7, 0, 0.84, 0),
  // Cinematic mask reveal
  mask: Easing.bezier(0.77, 0, 0.175, 1),
};
