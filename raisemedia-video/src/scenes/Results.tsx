import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { colors } from "../theme";
import { Grain } from "../ui/Grain";
import { Vignette } from "../ui/Vignette";

const KPIS = [
  {
    pre: "Trafic qualifié — J+60 à J+90",
    big: "+40",
    bigUnit: "→ +120",
    suffix: "%",
    after: "clics entrants depuis Google",
    accent: false,
  },
  {
    pre: "Note Google atteinte",
    big: "4,6",
    bigUnit: null as string | null,
    suffix: "★",
    after: "moyenne mesurée à 6 mois",
    accent: true,
  },
  {
    pre: "Garantie contractuelle",
    big: "90",
    bigUnit: null as string | null,
    suffix: "J",
    after: "ou remboursé · sans discussion",
    accent: false,
  },
];

export const Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const vertical = height > width;

  const headOpacity = interpolate(frame, [0, 22], [0, 1], {
    easing: easings.enter,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headClip = interpolate(frame, [0, 32], [0, 100], {
    easing: easings.mask,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const out = interpolate(frame, [248, 270], [1, 0], {
    easing: easings.exit,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.bg, opacity: out }}>
      <AbsoluteFill style={{ padding: vertical ? "0 80px" : "0 120px", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: 6,
            color: colors.textMute,
            textTransform: "uppercase",
            marginBottom: 14,
            opacity: headOpacity,
          }}
        >
          Mesuré · contractuel · garanti
        </div>
        <div
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: 76,
            lineHeight: 1,
            letterSpacing: -2,
            color: colors.text,
            clipPath: `inset(0 ${100 - headClip}% 0 0)`,
            maxWidth: 1200,
          }}
        >
          Pas des projections.
          <br />
          <span style={{ fontStyle: "italic", fontFamily: fonts.serif, color: colors.textDim }}>
            des résultats prouvés.
          </span>
        </div>

        <div
          style={{
            marginTop: vertical ? 36 : 60,
            display: "grid",
            gridTemplateColumns: vertical ? "1fr" : "1fr 1fr 1fr",
            gap: vertical ? 16 : 28,
          }}
        >
          {KPIS.map((kpi, i) => {
            const start = 28 + i * 24;
            const cardOpacity = interpolate(
              frame,
              [start, start + 28],
              [0, 1],
              {
                easing: easings.enter,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );
            const cardY = interpolate(frame, [start, start + 28], [40, 0], {
              easing: easings.enter,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const numClip = interpolate(
              frame,
              [start + 8, start + 38],
              [0, 100],
              {
                easing: easings.mask,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px)`,
                  padding: "32px 32px 32px 32px",
                  background: kpi.accent
                    ? "linear-gradient(180deg, rgba(245,181,68,0.10), rgba(245,181,68,0.02))"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${kpi.accent ? "rgba(245,181,68,0.35)" : colors.line}`,
                  borderRadius: 18,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: vertical ? 240 : 360,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: 3,
                    color: kpi.accent ? colors.gold : colors.textMute,
                    textTransform: "uppercase",
                  }}
                >
                  {kpi.pre}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    flexWrap: "wrap",
                    clipPath: `inset(${100 - numClip}% 0 0 0)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 900,
                      fontSize: vertical ? 140 : 180,
                      lineHeight: 0.85,
                      letterSpacing: vertical ? -5 : -7,
                      color: kpi.accent ? colors.gold : colors.text,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {kpi.big}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontWeight: 700,
                      fontSize: vertical ? 48 : 64,
                      color: kpi.accent ? colors.gold : colors.text,
                    }}
                  >
                    {kpi.suffix}
                  </span>
                </div>
                {kpi.bigUnit && (
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 18,
                      color: colors.textDim,
                      letterSpacing: 1,
                      marginTop: -6,
                    }}
                  >
                    {kpi.bigUnit}%
                  </div>
                )}
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontStyle: "italic",
                    fontSize: 20,
                    color: colors.textDim,
                    lineHeight: 1.35,
                    marginTop: 18,
                  }}
                >
                  {kpi.after}
                </div>
              </div>
            );
          })}
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
        +120 entreprises · 4,8★ moyenne
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
        06 / 07
      </div>
      <Vignette strength={0.5} />
      <Grain opacity={0.05} />
    </AbsoluteFill>
  );
};
