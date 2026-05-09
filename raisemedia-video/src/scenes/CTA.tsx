import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();

  const headOpacity = interpolate(frame, [0, 26], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headY = interpolate(frame, [0, 30], [22, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [22, 50], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lockOpacity = interpolate(frame, [60, 100], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lockScale = interpolate(frame, [60, 110], [0.94, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breath = Math.sin(frame / 12) * 0.5 + 0.5;
  const halo = interpolate(breath, [0, 1], [0.18, 0.32]);

  // CTA pulse on the URL
  const urlOpacity = interpolate(frame, [110, 140], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade-to-black
  const out = interpolate(frame, [180, 210], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, opacity: out }}>
      {/* Soft gold breathing halo */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, rgba(245,181,68,${halo * 0.18}), transparent 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.textMute,
            textTransform: "uppercase",
            opacity: subOpacity,
            marginBottom: 28,
          }}
        >
          Verdict Digital™ — diagnostic gratuit · 48 h
        </div>

        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 92,
            lineHeight: 1.02,
            letterSpacing: -2.4,
            color: colors.text,
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            maxWidth: 1400,
          }}
        >
          Sachez quels deals
          <br />
          <span style={{ fontStyle: "italic", fontFamily: fonts.serif, color: colors.gold }}>
            vous perdez en silence.
          </span>
        </div>

        <div
          style={{
            marginTop: 46,
            opacity: lockOpacity,
            transform: `scale(${lockScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            {["R", "A", "I", "S", "E"].map((l, i) => (
              <span
                key={l}
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 100,
                  lineHeight: 1,
                  letterSpacing: -3,
                  color: i === 1 ? colors.gold : colors.text,
                }}
              >
                {l}
              </span>
            ))}
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                color: colors.textDim,
                marginLeft: 4,
                transform: "translateY(-50px)",
              }}
            >
              ™
            </span>
          </div>
          <div
            style={{
              opacity: urlOpacity,
              padding: "14px 32px",
              borderRadius: 999,
              border: `1px solid ${colors.lineStrong}`,
              fontFamily: fonts.mono,
              fontSize: 18,
              letterSpacing: 4,
              color: colors.text,
              textTransform: "uppercase",
            }}
          >
            raisemedia.fr / diagnostic
          </div>
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
        © RaiseMed.IA — Ingénierie de marque
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
        Fin · 07 / 07
      </div>
      <Vignette strength={0.7} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
