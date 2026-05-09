import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: massive 82% reveal (0-50)
  const numScale = interpolate(frame, [0, 28], [1.18, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numClip = interpolate(frame, [4, 38], [0, 100], {
    easing: easings.mask,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pctOpacity = interpolate(frame, [22, 42], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: "DE VOS PROSPECTS" word reveal (40-90)
  const labelMaskA = interpolate(frame, [42, 76], [0, 100], {
    easing: easings.mask,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: serif italic "vous Googlisent" (90-150)
  const subOpacity = interpolate(frame, [86, 116], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [86, 116], [18, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: "avant le premier appel." (140-220) — type-on
  const punchPhrase = "avant le premier appel.";
  const punchChars = Math.max(
    0,
    Math.min(punchPhrase.length, Math.floor((frame - 140) / 1.5)),
  );
  const punchVisible = punchPhrase.slice(0, punchChars);

  // Group fade-out (240-270)
  const groupOut = interpolate(frame, [248, 270], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, opacity: groupOut }}>
      <AbsoluteFill
        style={{
          padding: "0 120px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.textMute,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Le vrai problème — chiffre n°1
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 22 }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 440,
              lineHeight: 0.85,
              color: colors.text,
              letterSpacing: -22,
              fontVariantNumeric: "tabular-nums",
              transform: `scale(${numScale})`,
              transformOrigin: "left bottom",
              clipPath: `inset(${100 - numClip}% 0 0 0)`,
            }}
          >
            82
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 180,
              lineHeight: 1,
              color: colors.gold,
              letterSpacing: -4,
              opacity: pctOpacity,
              paddingBottom: 30,
            }}
          >
            %
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.text,
              clipPath: `inset(0 ${100 - labelMaskA}% 0 0)`,
            }}
          >
            de vos prospects
          </div>
          <div
            style={{
              fontFamily: fonts.serif,
              fontStyle: "italic",
              fontSize: 56,
              color: colors.textDim,
              letterSpacing: -0.5,
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
            }}
          >
            vous Googlisent
          </div>
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: fonts.display,
            fontSize: 64,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: -1.5,
            lineHeight: 1.05,
          }}
        >
          {punchVisible}
          {punchChars > 0 && punchChars < punchPhrase.length && (
            <span style={{ color: colors.gold, marginLeft: 4 }}>▍</span>
          )}
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 64,
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: 4,
          color: colors.textMute,
          textTransform: "uppercase",
        }}
      >
        Source : étude B2B France
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 64,
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: 4,
          color: colors.textMute,
          textTransform: "uppercase",
        }}
      >
        02 / 07
      </div>
      <Vignette strength={0.65} />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};
