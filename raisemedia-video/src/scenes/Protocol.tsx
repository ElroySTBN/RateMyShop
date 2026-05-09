import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

const STEPS = [
  {
    letter: "R",
    label: "Recherche",
    title: "Reverse engineering concurrentiel",
    body: "On cartographie ce que vos prospects trouvent quand ils Googlisent votre secteur. Pas d'intuition. Des données.",
  },
  {
    letter: "A",
    label: "Audit",
    title: "Audit complet de l'empreinte digitale",
    body: "Analyse des 10 concurrents directs. Identification des gaps exactement là où vos prospects cherchent — et ne vous trouvent pas.",
  },
  {
    letter: "I",
    label: "Ingénierie",
    title: "Construction des actifs qui convertissent",
    body: "Fiches Google, contenus, preuves sociales. Chaque actif est conçu pour une intention de recherche identifiée.",
  },
  {
    letter: "S",
    label: "Signal",
    title: "E-réputation commerciale active",
    body: "Avis collectés en continu, réponses calibrées, surveillance 24/7. Votre réputation parle avant votre commercial.",
  },
  {
    letter: "E",
    label: "Exécution",
    title: "Mesure, ajustement, garantie 90 jours",
    body: "Premiers signaux à 30 jours. Résultats contractuels à 90. Sinon, remboursé. Sans discussion.",
  },
];

const STEP_FRAMES = 72; // 5 × 72 = 360

const Step: React.FC<{
  step: (typeof STEPS)[number];
  index: number;
  frame: number;
  vertical: boolean;
}> = ({ step, index, frame, vertical }) => {
  const start = index * STEP_FRAMES;
  const end = start + STEP_FRAMES;

  // Card fade-in / fade-out (overlap for cross dissolve)
  const fadeIn = interpolate(frame, [start, start + 12], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - 10, end], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = fadeIn * fadeOut;

  // Big letter mask reveal
  const letterClip = interpolate(frame, [start + 4, start + 32], [0, 100], {
    easing: easings.mask,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title type-on
  const titleY = interpolate(frame, [start + 14, start + 36], [16, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [start + 14, start + 36], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOpacity = interpolate(frame, [start + 26, start + 48], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyY = interpolate(frame, [start + 26, start + 48], [12, 0], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < start - 2 || frame > end + 2) return null;

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill
        style={{
          padding: vertical ? "0 80px" : "0 120px",
          display: "grid",
          gridTemplateColumns: vertical ? "1fr" : "1.05fr 1fr",
          alignItems: "center",
          gap: vertical ? 40 : 80,
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
            Étape {index + 1} / 5 — {step.label}
          </div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: -1.4,
              color: colors.text,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            {step.title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: fonts.serif,
              fontStyle: "italic",
              fontSize: 24,
              lineHeight: 1.45,
              color: colors.textDim,
              maxWidth: 540,
              opacity: bodyOpacity,
              transform: `translateY(${bodyY}px)`,
            }}
          >
            {step.body}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: vertical ? "flex-start" : "center" }}>
          <div
            style={{
              position: "relative",
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: vertical ? 380 : 540,
              lineHeight: 0.85,
              letterSpacing: vertical ? -10 : -16,
              color: index === 3 ? colors.gold : colors.text,
              clipPath: `inset(${100 - letterClip}% 0 0 0)`,
              textShadow:
                index === 3
                  ? "0 0 100px rgba(245,181,68,0.25)"
                  : "0 0 60px rgba(244,241,234,0.06)",
            }}
          >
            {step.letter}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Protocol: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const vertical = height > width;

  // Top progress bar (0->5 across 360f)
  const progress = interpolate(frame, [0, 350], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      {STEPS.map((s, i) => (
        <Step key={s.letter} step={s} index={i} frame={frame} vertical={vertical} />
      ))}

      {/* progress rail */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 120,
          right: 120,
          display: "flex",
          gap: 10,
        }}
      >
        {STEPS.map((s, i) => {
          const localProgress = Math.max(
            0,
            Math.min(1, progress * 5 - i),
          );
          return (
            <div
              key={s.letter}
              style={{
                flex: 1,
                height: 2,
                background: colors.line,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: i === 3 ? colors.gold : colors.text,
                  transform: `scaleX(${localProgress})`,
                  transformOrigin: "left",
                }}
              />
            </div>
          );
        })}
      </div>

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
        Protocole RAISE™
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
        04 / 07
      </div>
      <Vignette strength={0.55} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
