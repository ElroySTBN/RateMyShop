import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

const QUERY = "agence immobilière paris";

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  // Typewriter: 1 char every 3 frames, starts at frame 18
  const charsTyped = Math.max(0, Math.min(QUERY.length, Math.floor((frame - 18) / 3)));
  const visible = QUERY.slice(0, charsTyped);
  const cursorBlink = Math.floor(frame / 10) % 2 === 0 ? 1 : 0;

  const baseOpacity = interpolate(frame, [0, 12], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [98, 120], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = baseOpacity * fadeOut;

  const verdictReveal = interpolate(frame, [55, 75], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, opacity }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "16px 22px",
            borderRadius: 12,
            border: `1px solid ${colors.line}`,
            background: "rgba(255,255,255,0.02)",
            minWidth: 580,
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.textMute,
              letterSpacing: 1.2,
            }}
          >
            G
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 22,
              color: colors.text,
              letterSpacing: 0.4,
            }}
          >
            {visible}
            <span
              style={{
                opacity: cursorBlink,
                color: colors.gold,
                marginLeft: 2,
              }}
            >
              ▍
            </span>
          </span>
        </div>
        <div
          style={{
            marginTop: 36,
            opacity: verdictReveal,
            transform: `translateY(${(1 - verdictReveal) * 12}px)`,
            fontFamily: fonts.serif,
            fontSize: 18,
            color: colors.textDim,
            fontStyle: "italic",
            letterSpacing: 0.2,
          }}
        >
          chaque jour, vos prospects tapent ces mots.
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
        Raise<span style={{ color: colors.gold }}>Med</span>.IA
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
        01 / 07
      </div>
      <Vignette strength={0.85} />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};
