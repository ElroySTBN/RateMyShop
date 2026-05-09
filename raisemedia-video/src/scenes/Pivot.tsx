import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Grain } from "../ui/Grain";

export const Pivot: React.FC = () => {
  const frame = useCurrentFrame();

  // White flash bg: 0->1 in 6f, 1->0 in 18f
  const flashIn = interpolate(frame, [0, 6], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flashOut = interpolate(frame, [6, 28], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flash = flashIn * flashOut;

  const letters = ["R", "A", "I", "S", "E"];

  // Letters animate in starting at frame 18, staggered every 4f
  const lockOpacity = interpolate(frame, [16, 32], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const trademarkOpacity = interpolate(frame, [48, 64], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(frame, [56, 78], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill
        style={{
          background: "#FFFFFF",
          opacity: flash,
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: lockOpacity,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          {letters.map((l, i) => {
            const start = 18 + i * 4;
            const opacity = interpolate(frame, [start, start + 14], [0, 1], {
              easing: easings.enter,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(frame, [start, start + 14], [60, 0], {
              easing: easings.enter,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isAccent = i === 1; // 'A' as RAI(s)e accent gold
            return (
              <span
                key={l}
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 240,
                  lineHeight: 0.9,
                  color: isAccent ? colors.gold : colors.text,
                  letterSpacing: -8,
                  opacity,
                  display: "inline-block",
                  transform: `translateY(${y}px)`,
                }}
              >
                {l}
              </span>
            );
          })}
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 36,
              color: colors.textDim,
              opacity: trademarkOpacity,
              marginLeft: 6,
              transform: "translateY(-110px)",
            }}
          >
            ™
          </span>
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: fonts.mono,
            fontSize: 14,
            letterSpacing: 8,
            color: colors.textDim,
            textTransform: "uppercase",
            opacity: labelOpacity,
          }}
        >
          Le protocole — 5 étapes
        </div>
      </AbsoluteFill>
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
