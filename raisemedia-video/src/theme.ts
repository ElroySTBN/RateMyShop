export const colors = {
  bg: "#0A0A0A",
  bgSoft: "#101010",
  surface: "#161616",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.18)",
  text: "#F4F1EA",
  textDim: "#9C9890",
  textMute: "#5C594F",
  gold: "#F5B544",
  goldDim: "#8A6520",
  red: "#E25241",
  redDim: "#5A1F1A",
  ink: "#0A0A0A",
} as const;

export const fps = 30;

export const SCENES = {
  coldOpen: { from: 0, len: 120 },
  problem: { from: 120, len: 270 },
  cost: { from: 390, len: 210 },
  pivot: { from: 600, len: 90 },
  protocol: { from: 690, len: 360 },
  demo: { from: 1050, len: 270 },
  results: { from: 1320, len: 270 },
  cta: { from: 1590, len: 210 },
} as const;

export const TOTAL_FRAMES = 1800;
