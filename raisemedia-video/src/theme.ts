// Brand palette per RaiseMed.IA editorial brief
export const colors = {
  bg: "#050505",
  graphite: "#1D1D1F",
  white: "#F5F5F7",
  grey: "#86868B",
  greySoft: "#3A3A3C",
  blue: "#32A1ED",
  blueDeep: "#165CAA",
  green: "#32D17A", // validation only (J+90, checks)
  // glow helpers (rgba)
  blueGlow: "rgba(50,161,237,0.45)",
  blueGlowSoft: "rgba(50,161,237,0.18)",
  blueGlowStrong: "rgba(50,161,237,0.75)",
  whiteSoft: "rgba(245,245,247,0.10)",
  whiteFaint: "rgba(245,245,247,0.04)",
} as const;

export const fps = 30;

// 48 frames mapped per editorial brief — 9:16 only, 60 s total
// Block 01 (probleme): 0-600   (20 s)
// Block 02 (RAISE):    600-1140 (18 s)
// Block 03 (transfo):  1140-1800 (22 s)

export const BLOCKS = {
  one: { from: 0, len: 600 },
  two: { from: 600, len: 540 },
  three: { from: 1140, len: 660 },
} as const;

// Frame offsets within each block (start frame relative to block start)
// Each "F" is the abs second mark from brief, mapped to frames at 30fps.
// Cross-fades are handled inside the frame components, not via Sequence overlap.
export const F = {
  // Block 01 — 0:00 to 0:20
  F01: { from: 0,   len: 30 },   // 0:00
  F02: { from: 30,  len: 30 },   // 0:01
  F03: { from: 60,  len: 30 },   // 0:02
  F04: { from: 90,  len: 30 },   // 0:03
  F05: { from: 120, len: 30 },   // 0:04
  F06: { from: 150, len: 30 },   // 0:05
  F07: { from: 180, len: 30 },   // 0:06
  F08: { from: 210, len: 30 },   // 0:07
  F09: { from: 240, len: 30 },   // 0:08
  F10: { from: 270, len: 30 },   // 0:09
  F11: { from: 300, len: 30 },   // 0:10
  F12: { from: 330, len: 30 },   // 0:11
  F13: { from: 360, len: 30 },   // 0:12
  F14: { from: 390, len: 30 },   // 0:13
  F15: { from: 420, len: 30 },   // 0:14
  F16: { from: 450, len: 150 },  // 0:15-0:20 — orb hold

  // Block 02 — 0:20 to 0:38 (relative offsets within block)
  F17: { from: 0,   len: 30 },   // 0:20
  F18: { from: 30,  len: 30 },   // 0:21
  F19: { from: 60,  len: 30 },   // 0:22
  F20: { from: 90,  len: 30 },   // 0:23
  F21: { from: 120, len: 30 },   // 0:24
  F22: { from: 150, len: 30 },   // 0:25
  F23: { from: 180, len: 30 },   // 0:26
  F24: { from: 210, len: 30 },   // 0:27
  F25: { from: 240, len: 30 },   // 0:28
  F26: { from: 270, len: 30 },   // 0:29
  F27: { from: 300, len: 30 },   // 0:30
  F28: { from: 330, len: 30 },   // 0:31
  F29: { from: 360, len: 30 },   // 0:32
  F30: { from: 390, len: 30 },   // 0:33
  F31: { from: 420, len: 30 },   // 0:34
  F32: { from: 450, len: 90 },   // 0:35-0:38

  // Block 03 — 0:38 to 1:00 (relative offsets within block)
  F33: { from: 0,   len: 30 },   // 0:38
  F34: { from: 30,  len: 30 },   // 0:39
  F35: { from: 60,  len: 30 },   // 0:40
  F36: { from: 90,  len: 30 },   // 0:41
  F37: { from: 120, len: 30 },   // 0:42
  F38: { from: 150, len: 30 },   // 0:43
  F39: { from: 180, len: 30 },   // 0:44
  F40: { from: 210, len: 30 },   // 0:45
  F41: { from: 240, len: 30 },   // 0:46
  F42: { from: 270, len: 30 },   // 0:47
  F43: { from: 300, len: 30 },   // 0:48
  F44: { from: 330, len: 30 },   // 0:49
  F45: { from: 360, len: 150 },  // 0:50-0:54 — slow question hold
  // 30f silent transition 0:54-0:55
  F46: { from: 540, len: 30 },   // 0:55
  F47: { from: 570, len: 60 },   // 0:56-0:57
  F48: { from: 630, len: 30 },   // 0:58-0:59 (final pulse spans last second)
} as const;

export const TOTAL_FRAMES = 1800;
