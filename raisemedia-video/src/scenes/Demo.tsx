import {
  AbsoluteFill,
  HtmlInCanvas,
  type HtmlInCanvasOnPaint,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { useCallback } from "react";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { GoogleCard } from "../ui/GoogleCard";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

const CARD_W = 760;
const CARD_H = 360;

export const Demo: React.FC = () => {
  const frame = useCurrentFrame();

  // Rating and reviews evolve from "before" to "after"
  const rating = interpolate(frame, [30, 200], [3.3, 4.6], {
    easing: easings.editorial,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reviews = interpolate(frame, [30, 200], [12, 184], {
    easing: easings.editorial,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blur curve: starts at 24px (heavy), drops to 0
  const blurPx = interpolate(frame, [0, 180], [22, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const onPaint: HtmlInCanvasOnPaint = useCallback(
    ({ canvas, element, elementImage }) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("2D context unavailable");
      ctx.reset();
      ctx.filter = `blur(${blurPx}px)`;
      const transform = ctx.drawElementImage(elementImage, 0, 0);
      element.style.transform = transform.toString();
    },
    [blurPx],
  );

  // Title and caption animations
  const titleClip = interpolate(frame, [4, 36], [0, 100], {
    easing: easings.mask,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionOpacity = interpolate(frame, [180, 220], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionY = interpolate(frame, [180, 220], [12, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Aura/halo glow that pulses as clarity returns
  const haloOpacity = interpolate(frame, [0, 180], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const out = interpolate(frame, [248, 270], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Before / After tag
  const beforeOpacity = interpolate(frame, [0, 20, 90, 110], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const afterOpacity = interpolate(frame, [120, 150], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, opacity: out }}>
      <AbsoluteFill style={{ padding: "0 120px" }}>
        <div
          style={{
            paddingTop: 100,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 12,
                letterSpacing: 6,
                color: colors.textMute,
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              RAISE™ Signal — démonstration
            </div>
            <div
              style={{
                fontFamily: fonts.display,
                fontWeight: 700,
                fontSize: 56,
                lineHeight: 1.05,
                color: colors.text,
                letterSpacing: -1.2,
                clipPath: `inset(0 ${100 - titleClip}% 0 0)`,
                maxWidth: 720,
              }}
            >
              Le signal qui<br />
              <span style={{ color: colors.gold }}>convertit avant l'appel.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: 4,
                color: colors.red,
                textTransform: "uppercase",
                opacity: beforeOpacity,
              }}
            >
              ● Avant
            </span>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: 4,
                color: colors.gold,
                textTransform: "uppercase",
                opacity: afterOpacity,
              }}
            >
              ● Après — 6 mois
            </span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 60,
        }}
      >
        {/* Halo behind the card */}
        <div
          style={{
            position: "absolute",
            width: CARD_W + 200,
            height: CARD_H + 200,
            borderRadius: 999,
            background:
              "radial-gradient(ellipse at center, rgba(245,181,68,0.18), transparent 60%)",
            opacity: haloOpacity,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            width: CARD_W,
            height: CARD_H,
            position: "relative",
          }}
        >
          <HtmlInCanvas width={CARD_W} height={CARD_H} onPaint={onPaint}>
            <GoogleCard rating={rating} reviews={reviews} />
          </HtmlInCanvas>
        </div>

        <div
          style={{
            marginTop: 36,
            opacity: captionOpacity,
            transform: `translateY(${captionY}px)`,
            fontFamily: fonts.serif,
            fontStyle: "italic",
            fontSize: 26,
            color: colors.textDim,
            letterSpacing: 0.2,
            textAlign: "center",
          }}
        >
          La même fiche. 6 mois plus tard. <br />
          <span style={{ color: colors.text, fontStyle: "normal", fontFamily: fonts.mono, fontSize: 14, letterSpacing: 4, textTransform: "uppercase" }}>
            +25% de taux de conversion par étoile gagnée
          </span>
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
        Cas client · cabinet d'avocats
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
        05 / 07
      </div>
      <Vignette strength={0.55} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
