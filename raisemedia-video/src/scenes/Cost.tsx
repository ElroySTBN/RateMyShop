import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Stars } from "../ui/Stars";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

export const Cost: React.FC = () => {
  const frame = useCurrentFrame();

  // 3,3 number drop
  const numClip = interpolate(frame, [4, 38], [0, 100], {
    easing: easings.mask,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const numY = interpolate(frame, [0, 30], [-30, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stars fill from full gold to half-drained
  const starsValue = interpolate(frame, [22, 60], [5, 3.3], {
    easing: easings.editorial,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const starsOpacity = interpolate(frame, [22, 40], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline phrase reveal
  const headOpacity = interpolate(frame, [50, 80], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [50, 80], [16, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow killer line — type-on
  const killer = "Le deal est mort. Vous ne le saurez jamais.";
  const killerStart = 110;
  const killerChars = Math.max(
    0,
    Math.min(killer.length, Math.floor((frame - killerStart) / 1.6)),
  );
  const killerVisible = killer.slice(0, killerChars);
  const killerOpacity = interpolate(frame, [killerStart - 6, killerStart + 4], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red ambience pulse
  const redPulse = interpolate(
    frame,
    [0, 60, 120, 180, 210],
    [0, 0.18, 0.12, 0.22, 0.15],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const out = interpolate(frame, [188, 210], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, opacity: out }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 25% 70%, rgba(226,82,65,${redPulse}) 0%, transparent 55%)`,
        }}
      />
      <AbsoluteFill style={{ padding: "0 120px", justifyContent: "center" }}>
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
          La ligne rouge — chiffre n°2
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 380,
              lineHeight: 0.85,
              letterSpacing: -16,
              color: colors.red,
              fontVariantNumeric: "tabular-nums",
              clipPath: `inset(${100 - numClip}% 0 0 0)`,
              transform: `translateY(${numY}px)`,
              textShadow: "0 0 80px rgba(226,82,65,0.35)",
            }}
          >
            3,3
          </div>
          <div
            style={{
              opacity: starsOpacity,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Stars value={starsValue} size={70} gap={10} />
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                letterSpacing: 3,
                color: colors.textMute,
                textTransform: "uppercase",
              }}
            >
              note google moyenne
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            fontFamily: fonts.display,
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.1,
            color: colors.text,
            letterSpacing: -1,
            maxWidth: 1100,
          }}
        >
          Sous cette note, <span style={{ color: colors.red }}>1 prospect sur 2</span>
          <br />
          ne vous contacte jamais.
        </div>

        <div
          style={{
            marginTop: 30,
            opacity: killerOpacity,
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontSize: 36,
            lineHeight: 1.2,
            color: colors.textDim,
            letterSpacing: 0.2,
          }}
        >
          {killerVisible}
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
        Le coût du silence
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
        03 / 07
      </div>
      <Vignette strength={0.85} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};
