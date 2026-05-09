import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { useLocal } from "../lib/useLocal";
import { F } from "../theme";
import { colors } from "../theme";
import { Badge } from "../ui/Badge";
import { OrbCore } from "../ui/OrbCore";
import { OrbitalSignals } from "../ui/OrbitalSignals";
import { RaiseLetter, RaiseRow } from "../ui/RaiseLetter";
import { ScanLine } from "../ui/ScanLine";
import { SearchBar } from "../ui/SearchBar";
import { Vignette } from "../ui/Vignette";

type FrameProps = { frame: number; from: number; dur: number };

const Caption: React.FC<{ text: string; opacity?: number; small?: boolean; subtitle?: string }> = ({
  text,
  opacity = 1,
  small = false,
  subtitle,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 240,
      left: 0,
      right: 0,
      textAlign: "center",
      opacity,
      padding: "0 80px",
    }}
  >
    <div
      style={{
        fontFamily: fonts.sans,
        fontSize: small ? 30 : 42,
        fontWeight: 500,
        letterSpacing: -0.4,
        color: colors.white,
        lineHeight: 1.2,
      }}
    >
      {text}
    </div>
    {subtitle && (
      <div
        style={{
          marginTop: 12,
          fontFamily: fonts.mono,
          fontSize: 14,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: colors.grey,
        }}
      >
        {subtitle}
      </div>
    )}
  </div>
);

// F17 — mot RAISE large au centre
const F17: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const glow = interpolate(local, [0, 16], [0.2, 0.95], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", gap: 14 }}>
        {["R", "A", "I", "S", "E"].map((l) => (
          <RaiseLetter key={l} letter={l} size={220} glow={glow} />
        ))}
      </div>
      <Caption text="Protocole RAISE™" opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F18 — R s'isole et glow
const F18: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <RaiseRow active={0} size={240} glow={1} />
      <Caption text="Recherche." subtitle="Benchmark · veille concurrentielle" opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F19 — R + loupe / recherche locale; "Reverse engineering concurrentiel"
const F19: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const sbDraw = interpolate(local, [0, 18], [0, 1], { easing: easings.mask, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <RaiseLetter letter="R" size={260} glow={1} />
        <div style={{ transform: "translateY(-10px)" }}>
          <SearchBar width={520} drawProgress={sbDraw} query="dentiste près de moi" charsTyped={20} />
        </div>
      </div>
      <Caption text="Reverse engineering concurrentiel." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F20 — A prend le relais, "Analyse"
const F20: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <RaiseRow active={1} size={240} glow={1} />
      <Caption text="Analyse." subtitle="Diagnostic de crédibilité commerciale" opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F21 — A + scan vertical sur fiche
const F21: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scan = interpolate(local, [0, dur], [0, 1], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardW = 480;
  const cardH = 360;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <RaiseLetter letter="A" size={260} glow={1} />
        <div
          style={{
            position: "relative",
            width: cardW,
            height: cardH,
            border: `1px solid ${colors.greySoft}`,
            borderRadius: 20,
            background: "rgba(245,245,247,0.02)",
            overflow: "hidden",
            padding: 22,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ width: "60%", height: 14, background: colors.greySoft, borderRadius: 4 }} />
            <div style={{ width: "40%", height: 10, background: colors.greySoft, borderRadius: 4, opacity: 0.7 }} />
            <div style={{ marginTop: 16, display: "flex", gap: 4 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: colors.greySoft, opacity: 0.6 }} />
              ))}
            </div>
            <div style={{ marginTop: 16, height: 10, background: colors.greySoft, opacity: 0.5, borderRadius: 4 }} />
            <div style={{ width: "85%", height: 10, background: colors.greySoft, opacity: 0.5, borderRadius: 4 }} />
            <div style={{ width: "70%", height: 10, background: colors.greySoft, opacity: 0.5, borderRadius: 4 }} />
          </div>
          <ScanLine progress={scan} width={cardW} height={cardH} />
        </div>
      </div>
      <Caption text="Diagnostic de crédibilité commerciale." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F22 — deux badges apparaissent
const F22: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b1 = interpolate(local, [0, 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b2 = interpolate(local, [6, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <RaiseLetter letter="A" size={260} glow={1} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Badge text="score de crédibilité" appear={b1} />
          <Badge text="écart concurrentiel" appear={b2} />
        </div>
      </div>
      <Caption text="On mesure ce qu'ils voient." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F23 — I s'isole, "Implémentation"
const F23: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <RaiseRow active={2} size={240} glow={1} />
      <Caption text="Implémentation." subtitle="Vous validez · on exécute" opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F24 — I devient colonne / spine, "Déploiement"
const F24: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drawProgress = interpolate(local, [0, 18], [0, 1], { easing: easings.mask, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <RaiseLetter letter="I" size={260} glow={1} />
        <svg width={20} height={520} viewBox="0 0 20 520" style={{ filter: `drop-shadow(0 0 12px ${colors.blueGlow})` }}>
          <line x1={10} y1={10} x2={10} y2={510} stroke={colors.blue} strokeWidth={3} strokeLinecap="round"
            strokeDasharray={500} strokeDashoffset={500 * (1 - drawProgress)} />
          {/* dots along the spine */}
          {[120, 260, 400].map((y, i) => {
            const reveal = interpolate(local, [10 + i * 4, 22 + i * 4], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <circle key={y} cx={10} cy={y} r={6} fill={colors.blue} opacity={reveal} />
            );
          })}
        </svg>
      </div>
      <Caption text="Déploiement." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F25 — trois modules se connectent à la colonne; "fiche / avis / photos"
const F25: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [16, 26], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mods = ["fiche", "avis", "photos"];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <RaiseLetter letter="I" size={260} glow={1} />
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {mods.map((m, i) => {
            const t = interpolate(local, [i * 5, i * 5 + 12], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 12, opacity: t, transform: `translateX(${(1 - t) * -16}px)` }}>
                <div style={{ width: 24, height: 1, background: colors.blue, opacity: 0.6 }} />
                <Badge text={m} variant="blue" appear={t} />
              </div>
            );
          })}
        </div>
      </div>
      <Caption text="Vous validez. On exécute." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F26 — S prend le relais, "Scaling"
const F26: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <RaiseRow active={3} size={240} glow={1} />
      <Caption text="Scaling." subtitle="Amplification des signaux qui convertissent" opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F27 — S devient ligne de signal avec étoile / photo / message
const F27: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drawProgress = interpolate(local, [0, 18], [0, 1], { easing: easings.mask, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <RaiseLetter letter="S" size={260} glow={1} />
        <svg width={400} height={140} viewBox="0 0 400 140" style={{ filter: `drop-shadow(0 0 12px ${colors.blueGlow})` }}>
          <path
            d="M10,70 C 60,30 100,110 150,70 S 250,30 300,70 S 380,80 390,70"
            stroke={colors.blue}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={500}
            strokeDashoffset={500 * (1 - drawProgress)}
          />
          {/* icons along the path */}
          {[
            { x: 70, y: 50, glyph: "★" },
            { x: 200, y: 80, glyph: "📷" },
            { x: 330, y: 60, glyph: "💬" },
          ].map((c, i) => {
            const r = interpolate(local, [12 + i * 4, 22 + i * 4], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={i} opacity={r}>
                <circle cx={c.x} cy={c.y} r={18} fill="rgba(50,161,237,0.10)" stroke={colors.blue} strokeWidth={1.5} />
                <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={14} fill={colors.white}>
                  {c.glyph}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <Caption text="Amplification des signaux." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F28 — signal pulse, propagation, amplification; "qui convertissent"
const F28: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse1 = (local / 30) % 1;
  const pulse2 = ((local + 14) / 30) % 1;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ position: "relative", width: 600, height: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {[pulse1, pulse2].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: 999,
              border: `1px solid ${colors.blue}`,
              opacity: (1 - p) * 0.5,
              transform: `scale(${0.3 + p * 0.7})`,
            }}
          />
        ))}
        <RaiseLetter letter="S" size={300} glow={1} />
      </div>
      <Caption text="…qui convertissent." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F29 — E s'isole, "Évolution"
const F29: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <RaiseRow active={4} size={240} glow={1} />
      <Caption text="Évolution." subtitle="Surveillance · ajustements continus" opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F30 — E devient système de suivi, "Surveillance continue"
const F30: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // animated radar dots
  const dots = Array.from({ length: 9 }).map((_, i) => {
    const x = (i % 3 - 1) * 120;
    const y = (Math.floor(i / 3) - 1) * 90;
    const t = ((local + i * 4) / 18) % 1;
    return { x, y, opacity: (1 - t) * 0.9 };
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <RaiseLetter letter="E" size={260} glow={1} />
        <div style={{ position: "relative", width: 360, height: 240 }}>
          {dots.map((d, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `calc(50% + ${d.x}px)`,
                top: `calc(50% + ${d.y}px)`,
                width: 10,
                height: 10,
                borderRadius: 999,
                background: colors.blue,
                opacity: d.opacity,
                boxShadow: `0 0 12px ${colors.blueGlow}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>
      <Caption text="Surveillance continue." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F31 — classement local, "Votre entreprise" s'active, "Être visible."
const F31: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rows = [
    { rank: 1, name: "Cabinet Sourire", rating: 4.9, your: false },
    { rank: 2, name: "Dentisterie Lumière", rating: 4.7, your: false },
    { rank: 3, name: "Votre entreprise", rating: 4.8, your: true },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map((r, i) => {
          const t = interpolate(local, [i * 5, i * 5 + 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const highlightT = r.your ? interpolate(local, [16, 28], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
          return (
            <div
              key={i}
              style={{
                width: 760,
                height: 80,
                padding: "0 22px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                borderRadius: 16,
                border: `1px solid ${r.your && highlightT > 0.5 ? colors.blue : colors.greySoft}`,
                background: r.your && highlightT > 0.5 ? "rgba(50,161,237,0.06)" : "rgba(255,255,255,0.015)",
                opacity: t,
                transform: `translateX(${(1 - t) * -10}px)`,
                boxShadow: r.your && highlightT > 0.5 ? `0 0 24px ${colors.blueGlowSoft}` : "none",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: r.your && highlightT > 0.5 ? colors.blue : colors.greySoft,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fonts.sans,
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.white,
                }}
              >
                {r.rank}
              </div>
              <div style={{ flex: 1, fontFamily: fonts.sans, fontSize: 18, fontWeight: 500, color: colors.white }}>
                {r.name}
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, color: r.your && highlightT > 0.5 ? colors.blue : colors.grey }}>
                {r.rating.toFixed(1).replace(".", ",")} ★
              </div>
            </div>
          );
        })}
      </div>
      <Caption text="Être visible." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F32 — orb central, signaux orbitent; "Être visible. Être crédible. Être choisi." (3s)
const F32: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const orbAppear = interpolate(local, [0, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringsAppear = interpolate(local, [10, 36], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineOpacity = interpolate(local, [40, 70], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rotation = local * 0.4;
  const pulse = (Math.sin(local / 18) * 0.5 + 0.5);
  const lines = ["Être visible.", "Être crédible.", "Être choisi."];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ opacity: orbAppear }}>
        <OrbCore size={260} pulse={pulse} />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: ringsAppear }}>
        <OrbitalSignals radius={420} rotation={rotation} appear={ringsAppear} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {lines.map((l, i) => {
          const t = interpolate(local, [50 + i * 10, 70 + i * 10], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                fontFamily: fonts.sans,
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: -0.4,
                color: i === 2 ? colors.blue : colors.white,
                opacity: t * lineOpacity,
                transform: `translateY(${(1 - t) * 8}px)`,
                lineHeight: 1.5,
              }}
            >
              {l}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Block02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <F17 frame={frame} from={F.F17.from} dur={F.F17.len} />
      <F18 frame={frame} from={F.F18.from} dur={F.F18.len} />
      <F19 frame={frame} from={F.F19.from} dur={F.F19.len} />
      <F20 frame={frame} from={F.F20.from} dur={F.F20.len} />
      <F21 frame={frame} from={F.F21.from} dur={F.F21.len} />
      <F22 frame={frame} from={F.F22.from} dur={F.F22.len} />
      <F23 frame={frame} from={F.F23.from} dur={F.F23.len} />
      <F24 frame={frame} from={F.F24.from} dur={F.F24.len} />
      <F25 frame={frame} from={F.F25.from} dur={F.F25.len} />
      <F26 frame={frame} from={F.F26.from} dur={F.F26.len} />
      <F27 frame={frame} from={F.F27.from} dur={F.F27.len} />
      <F28 frame={frame} from={F.F28.from} dur={F.F28.len} />
      <F29 frame={frame} from={F.F29.from} dur={F.F29.len} />
      <F30 frame={frame} from={F.F30.from} dur={F.F30.len} />
      <F31 frame={frame} from={F.F31.from} dur={F.F31.len} />
      <F32 frame={frame} from={F.F32.from} dur={F.F32.len} />
      <Vignette strength={0.4} />
    </AbsoluteFill>
  );
};
