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
  blueGlow: "rgba(50,161,237,0.45)",
  blueGlowSoft: "rgba(50,161,237,0.18)",
  blueGlowStrong: "rgba(50,161,237,0.75)",
  whiteSoft: "rgba(245,245,247,0.10)",
  whiteFaint: "rgba(245,245,247,0.04)",
} as const;

export const fps = 30;

// v3 — extended frame durations for breath, total ~77 s
// Each F's offset is the cumulative sum of previous frames within its block.
// Cross-fades are handled in useLocal (overlapping fade-in/out around boundaries).

const cumOffsets = (lens: readonly number[]) => {
  const out: number[] = [];
  let acc = 0;
  for (const l of lens) {
    out.push(acc);
    acc += l;
  }
  return { offsets: out, total: acc };
};

// --- Block 01 — 16 frames (720f / 24 s) ---
const B1 = [
  35, 35,         // F01, F02 — dot + pulse
  40, 55,         // F03, F04 — search bar draw + typing
  35, 35, 45,     // F05, F06, F07 — results, highlight, "pas toujours vous"
  35, 35, 35,     // F08, F09, F10 — pin, zoom, distant
  50, 50,         // F11, F12 — weak profile
  50, 50,         // F13, F14 — competitor + call glow
  45,             // F15 — dissolve
  90,             // F16 — orb hold
] as const;

// --- Block 02 — 16 frames (720f / 24 s) ---
const B2 = [
  50,             // F17 — RAISE wordmark hero
  30, 45,         // F18, F19 — R, R+search
  30, 50, 45,     // F20, F21, F22 — A, scan, badges
  30, 50, 50,     // F23, F24, F25 — I, spine, modules
  30, 50, 45,     // F26, F27, F28 — S, signal line, pulse
  30, 40,         // F29, F30 — E, radar
  50,             // F31 — local ranking
  95,             // F32 — orb + 3 lines hero
] as const;

// --- Block 03 — 16 frames (880f / 29.3 s) ---
const B3 = [
  45, 55,         // F33, F34 — fiche optimisée + 3 checks
  45, 45,         // F35, F36 — phone btn + notif
  50, 55,         // F37, F38 — lead + appointment confirmed
  30, 30,         // F39, F40 — J+0, J+15
  45, 30,         // F41, F42 — J+30 (signaux), J+60
  55,             // F43 — J+90 + tick
  65,             // F44 — chart growth
  120,            // F45 — slow question 4 s
  50,             // F46 — logo reveal
  85,             // F47 — tagline 2 lignes
  75,             // F48 — CTA hero
] as const;

const b1 = cumOffsets(B1);
const b2 = cumOffsets(B2);
const b3 = cumOffsets(B3);

export const BLOCKS = {
  one:   { from: 0,                                 len: b1.total },
  two:   { from: b1.total,                          len: b2.total },
  three: { from: b1.total + b2.total,               len: b3.total },
} as const;

export const F = {
  F01: { from: b1.offsets[0],  len: B1[0]  },
  F02: { from: b1.offsets[1],  len: B1[1]  },
  F03: { from: b1.offsets[2],  len: B1[2]  },
  F04: { from: b1.offsets[3],  len: B1[3]  },
  F05: { from: b1.offsets[4],  len: B1[4]  },
  F06: { from: b1.offsets[5],  len: B1[5]  },
  F07: { from: b1.offsets[6],  len: B1[6]  },
  F08: { from: b1.offsets[7],  len: B1[7]  },
  F09: { from: b1.offsets[8],  len: B1[8]  },
  F10: { from: b1.offsets[9],  len: B1[9]  },
  F11: { from: b1.offsets[10], len: B1[10] },
  F12: { from: b1.offsets[11], len: B1[11] },
  F13: { from: b1.offsets[12], len: B1[12] },
  F14: { from: b1.offsets[13], len: B1[13] },
  F15: { from: b1.offsets[14], len: B1[14] },
  F16: { from: b1.offsets[15], len: B1[15] },

  F17: { from: b2.offsets[0],  len: B2[0]  },
  F18: { from: b2.offsets[1],  len: B2[1]  },
  F19: { from: b2.offsets[2],  len: B2[2]  },
  F20: { from: b2.offsets[3],  len: B2[3]  },
  F21: { from: b2.offsets[4],  len: B2[4]  },
  F22: { from: b2.offsets[5],  len: B2[5]  },
  F23: { from: b2.offsets[6],  len: B2[6]  },
  F24: { from: b2.offsets[7],  len: B2[7]  },
  F25: { from: b2.offsets[8],  len: B2[8]  },
  F26: { from: b2.offsets[9],  len: B2[9]  },
  F27: { from: b2.offsets[10], len: B2[10] },
  F28: { from: b2.offsets[11], len: B2[11] },
  F29: { from: b2.offsets[12], len: B2[12] },
  F30: { from: b2.offsets[13], len: B2[13] },
  F31: { from: b2.offsets[14], len: B2[14] },
  F32: { from: b2.offsets[15], len: B2[15] },

  F33: { from: b3.offsets[0],  len: B3[0]  },
  F34: { from: b3.offsets[1],  len: B3[1]  },
  F35: { from: b3.offsets[2],  len: B3[2]  },
  F36: { from: b3.offsets[3],  len: B3[3]  },
  F37: { from: b3.offsets[4],  len: B3[4]  },
  F38: { from: b3.offsets[5],  len: B3[5]  },
  F39: { from: b3.offsets[6],  len: B3[6]  },
  F40: { from: b3.offsets[7],  len: B3[7]  },
  F41: { from: b3.offsets[8],  len: B3[8]  },
  F42: { from: b3.offsets[9],  len: B3[9]  },
  F43: { from: b3.offsets[10], len: B3[10] },
  F44: { from: b3.offsets[11], len: B3[11] },
  F45: { from: b3.offsets[12], len: B3[12] },
  F46: { from: b3.offsets[13], len: B3[13] },
  F47: { from: b3.offsets[14], len: B3[14] },
  F48: { from: b3.offsets[15], len: B3[15] },
} as const;

export const TOTAL_FRAMES = b1.total + b2.total + b3.total;
