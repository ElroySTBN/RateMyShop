import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { useLocal } from "../lib/useLocal";
import { F } from "../theme";
import { colors } from "../theme";
import { AppointmentCard } from "../ui/AppointmentCard";
import { CTAButton } from "../ui/CTAButton";
import { GoogleCardMini } from "../ui/GoogleCardMini";
import { GrowthChart } from "../ui/GrowthChart";
import { LeadCard } from "../ui/LeadCard";
import { PhoneNotif } from "../ui/PhoneNotif";
import { RaiseLogomark } from "../ui/RaiseLogomark";
import { Timeline } from "../ui/Timeline";
import { Vignette } from "../ui/Vignette";

type FrameProps = { frame: number; from: number; dur: number };

const Caption: React.FC<{ text: string; opacity?: number; small?: boolean; bottom?: number }> = ({
  text,
  opacity = 1,
  small = false,
  bottom = 240,
}) => (
  <div
    style={{
      position: "absolute",
      bottom,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: fonts.sans,
      fontSize: small ? 30 : 42,
      fontWeight: 400,
      letterSpacing: -0.4,
      color: colors.white,
      opacity,
      padding: "0 80px",
      lineHeight: 1.25,
    }}
  >
    {text}
  </div>
);

// F33 — fiche optimisée, pop in
const F33: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(local, [0, 18], [0.94, 1], { easing: easings.pop, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ transform: `scale(${scale})` }}>
        <GoogleCardMini name="Cabinet Dentaire" rating={4.9} reviews={186} recent="implantologie · soins esthétiques" highlighted showThumb width={760} />
      </div>
      <Caption text="Être crédible." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F34 — rating + avis récent + photo activent séquentiellement
const F34: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [16, 26], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const items = [
    { label: "4,8", sub: "★★★★★" },
    { label: "Avis récent", sub: "il y a 2 jours" },
    { label: "Photo du cabinet", sub: "" },
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 720 }}>
        {items.map((it, i) => {
          const t = interpolate(local, [i * 5, i * 5 + 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "18px 22px",
                borderRadius: 18,
                background: "rgba(50,161,237,0.04)",
                border: `1px solid ${colors.blue}`,
                opacity: t,
                transform: `translateX(${(1 - t) * -16}px)`,
                boxShadow: `0 0 ${24 * t}px ${colors.blueGlowSoft}`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: colors.blue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5 9-11" stroke={colors.bg} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 500, color: colors.white }}>
                  {it.label}
                </span>
                {it.sub && (
                  <span style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.grey, letterSpacing: 0.4 }}>
                    {it.sub}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Caption text="Preuve visible." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F35 — bouton téléphone central, glow pulse
const F35: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(local / 5) * 0.5 + 0.5);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div
        style={{
          position: "relative",
          width: 240,
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[0, 1].map((i) => {
          const p = ((local + i * 14) / 28) % 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 240,
                height: 240,
                borderRadius: 999,
                border: `1px solid ${colors.blue}`,
                opacity: (1 - p) * 0.55,
                transform: `scale(${0.5 + p * 0.9})`,
              }}
            />
          );
        })}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 999,
            background: colors.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${40 + pulse * 40}px ${colors.blueGlowStrong}, 0 0 ${100 + pulse * 60}px ${colors.blueGlow}`,
            transform: `scale(${1 + pulse * 0.05})`,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24">
            <path
              d="M5 4l3-1 2 4-2 1c1 2 2.5 3.5 4.5 4.5l1-2 4 2-1 3c-1 1-3 1-5 0-3-1.5-6-4.5-7.5-7.5-1-2-1-4 0-5z"
              fill={colors.white}
            />
          </svg>
        </div>
      </div>
      <Caption text="L'appel est simple." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F36 — notification appel entrant, slide in
const F36: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slide = interpolate(local, [0, 14], [-40, 0], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slideOpacity = interpolate(local, [0, 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ transform: `translateY(${slide}px)`, opacity: slideOpacity }}>
        <PhoneNotif title="Cabinet Dentaire" subtitle="Appel entrant" width={760} />
      </div>
      <Caption text="Ils vous contactent." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F37 — carte lead qualifié
const F37: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const appear = interpolate(local, [0, 16], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <LeadCard appear={appear} width={680} />
      <Caption text="Le bon prospect." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F38 — demande de RDV confirmée
const F38: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const appear = interpolate(local, [0, 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const confirmed = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <AppointmentCard appear={appear} confirmed={confirmed} width={760} />
      <Caption text="Le rendez-vous est pris." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// Timeline progress shared between F39-F43
const TimelineFrame: React.FC<FrameProps & { progress: number; caption: string; finalCheck?: boolean }> = ({
  frame, from, dur, progress, caption, finalCheck = false,
}) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <Timeline width={920} progress={progress} finalCheck={finalCheck} />
      <Caption text={caption} opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F39 — J+0 (progress=0)
const F39: React.FC<FrameProps> = (p) => {
  const local = p.frame - p.from;
  const progress = interpolate(local, [0, 30], [0, 0.10], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <TimelineFrame {...p} progress={progress} caption="Le suivi commence." />;
};
// F40 — J+15 (~0.30)
const F40: React.FC<FrameProps> = (p) => {
  const local = p.frame - p.from;
  const progress = interpolate(local, [-30, 30], [0.10, 0.30], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <TimelineFrame {...p} progress={progress} caption="On avance." />;
};
// F41 — J+30 (~0.55)
const F41: React.FC<FrameProps> = (p) => {
  const local = p.frame - p.from;
  const progress = interpolate(local, [-30, 30], [0.30, 0.55], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <TimelineFrame {...p} progress={progress} caption="Premiers signaux." />;
};
// F42 — J+60 (~0.78)
const F42: React.FC<FrameProps> = (p) => {
  const local = p.frame - p.from;
  const progress = interpolate(local, [-30, 30], [0.55, 0.78], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <TimelineFrame {...p} progress={progress} caption="La dynamique s'installe." />;
};
// F43 — J+90 + tick (1.0)
const F43: React.FC<FrameProps> = (p) => {
  const local = p.frame - p.from;
  const progress = interpolate(local, [-20, 22], [0.78, 1], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <TimelineFrame {...p} progress={progress} caption="Garantie claire." finalCheck />;
};

// F44 — courbe de croissance
const F44: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [12, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const progress = interpolate(local, [0, 26], [0, 1], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <GrowthChart width={920} height={460} progress={progress} peakLabel="+112%" />
      <Caption text="Croissance mesurable." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F45 — écran noir, question seule (4s)
const F45: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const reveal = interpolate(local, [10, 80], [0, 1], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fade = interpolate(local, [dur - 30, dur], [1, 0], { easing: easings.exit, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, padding: "0 100px" }}>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 64,
          fontWeight: 500,
          letterSpacing: -1.4,
          lineHeight: 1.18,
          color: colors.white,
          textAlign: "center",
          opacity: reveal * fade,
        }}
      >
        Combien de clients
        <br />
        perdez-vous
        <br />
        <span style={{ color: colors.blue }}>sans le savoir ?</span>
      </div>
    </AbsoluteFill>
  );
};

// F46 — logomark seul
const F46: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const draw = interpolate(local, [0, 22], [0, 1], { easing: easings.mask, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = interpolate(local, [10, 30], [0.4, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <RaiseLogomark size={300} draw={draw} glow={glow} />
    </AbsoluteFill>
  );
};

// F47 — tagline
const F47: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const t1 = interpolate(local, [0, 18], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t2 = interpolate(local, [12, 30], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, padding: "0 80px", textAlign: "center" }}>
      <RaiseLogomark size={150} draw={1} glow={0.6} />
      <div style={{ marginTop: 60 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: -0.6,
            color: colors.white,
            opacity: t1,
            transform: `translateY(${(1 - t1) * 8}px)`,
            lineHeight: 1.25,
          }}
        >
          Vos clients vous cherchent.
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: fonts.sans,
            fontSize: 44,
            fontWeight: 500,
            letterSpacing: -0.6,
            color: colors.blue,
            opacity: t2,
            transform: `translateY(${(1 - t2) * 8}px)`,
            lineHeight: 1.25,
          }}
        >
          On s'assure qu'ils vous trouvent.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// F48 — CTA pulse
const F48: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const ctaAppear = interpolate(local, [0, 18], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(local / 5) * 0.5 + 0.5);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, padding: "0 60px" }}>
      <RaiseLogomark size={130} draw={1} glow={0.5} />
      <div style={{ marginTop: 40 }} />
      <div style={{ opacity: ctaAppear, transform: `translateY(${(1 - ctaAppear) * 10}px)` }}>
        <CTAButton text="Diagnostic digital gratuit — 48 h" pulse={pulse} width={780} />
      </div>
      <div
        style={{
          marginTop: 28,
          fontFamily: fonts.mono,
          fontSize: 14,
          letterSpacing: 4,
          color: colors.grey,
          textTransform: "uppercase",
          opacity: ctaAppear,
        }}
      >
        raisemedia.fr
      </div>
    </AbsoluteFill>
  );
};

export const Block03: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <F33 frame={frame} from={F.F33.from} dur={F.F33.len} />
      <F34 frame={frame} from={F.F34.from} dur={F.F34.len} />
      <F35 frame={frame} from={F.F35.from} dur={F.F35.len} />
      <F36 frame={frame} from={F.F36.from} dur={F.F36.len} />
      <F37 frame={frame} from={F.F37.from} dur={F.F37.len} />
      <F38 frame={frame} from={F.F38.from} dur={F.F38.len} />
      <F39 frame={frame} from={F.F39.from} dur={F.F39.len} />
      <F40 frame={frame} from={F.F40.from} dur={F.F40.len} />
      <F41 frame={frame} from={F.F41.from} dur={F.F41.len} />
      <F42 frame={frame} from={F.F42.from} dur={F.F42.len} />
      <F43 frame={frame} from={F.F43.from} dur={F.F43.len} />
      <F44 frame={frame} from={F.F44.from} dur={F.F44.len} />
      <F45 frame={frame} from={F.F45.from} dur={F.F45.len} />
      <F46 frame={frame} from={F.F46.from} dur={F.F46.len} />
      <F47 frame={frame} from={F.F47.from} dur={F.F47.len} />
      <F48 frame={frame} from={F.F48.from} dur={F.F48.len} />
      <Vignette strength={0.45} />
    </AbsoluteFill>
  );
};
