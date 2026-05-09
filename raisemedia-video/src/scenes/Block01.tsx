import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fonts } from "../fonts";
import { easings } from "../lib/easings";
import { useLocal } from "../lib/useLocal";
import { F } from "../theme";
import { colors } from "../theme";
import { DotPulse } from "../ui/DotPulse";
import { GoogleCardMini } from "../ui/GoogleCardMini";
import { LocalResultRow } from "../ui/LocalResultRow";
import { MapBackground } from "../ui/MapBackground";
import { MapPin } from "../ui/MapPin";
import { OrbCore } from "../ui/OrbCore";
import { OrbitalSignals } from "../ui/OrbitalSignals";
import { SearchBar } from "../ui/SearchBar";
import { Vignette } from "../ui/Vignette";

type FrameProps = { frame: number; from: number; dur: number };

const Caption: React.FC<{ text: string; opacity?: number; y?: number; small?: boolean }> = ({
  text,
  opacity = 1,
  y = 0,
  small = false,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 240,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: fonts.sans,
      fontSize: small ? 28 : 38,
      fontWeight: 400,
      letterSpacing: -0.4,
      color: colors.white,
      opacity,
      transform: `translateY(${y}px)`,
      padding: "0 80px",
      lineHeight: 1.25,
    }}
  >
    {text}
  </div>
);

// F01 — point bleu minuscule, fade in, static hold
const F01: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const dotOpacity = interpolate(local, [0, 16], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ opacity: dotOpacity }}>
        <DotPulse size={20} glow={1} />
      </div>
    </AbsoluteFill>
  );
};

// F02 — pulse ring, slow push-in
const F02: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const pulse = (local / dur) % 1;
  const scale = interpolate(local, [0, dur], [1, 1.06], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, transform: `scale(${scale})` }}>
      <DotPulse size={20} glow={1} ring pulseProgress={pulse} />
    </AbsoluteFill>
  );
};

// F03 — barre de recherche se dessine en SVG
const F03: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const draw = interpolate(local, [0, 22], [0, 1], { easing: easings.mask, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(local, [0, dur], [0.98, 1.02], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, transform: `scale(${scale})` }}>
      <SearchBar width={840} drawProgress={draw} />
    </AbsoluteFill>
  );
};

// F04 — typing dans la barre + caption
const F04: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const query = "dentiste près de moi";
  const chars = Math.max(0, Math.min(query.length, Math.floor(local / 1.2)));
  const captionOpacity = interpolate(local, [10, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <SearchBar width={840} drawProgress={1} query={query} charsTyped={chars} showCursor frame={frame} voiceIcon />
      <Caption text="Chaque jour, vos futurs clients vous cherchent." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F05 — premiers résultats locaux stylisés
const F05: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <SearchBar width={760} drawProgress={1} query="dentiste près de moi" charsTyped={20} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 360 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[0, 1, 2].map((i) => {
            const start = i * 4;
            const fade = interpolate(local, [start, start + 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const y = interpolate(local, [start, start + 14], [16, 0], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: fade, transform: `translateY(${y}px)` }}>
                <LocalResultRow rating={4.5 + i * 0.1} dim={i > 0} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// F06 — un concurrent se détache, highlight + scale
const F06: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const highlight = interpolate(local, [0, 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <SearchBar width={760} drawProgress={1} query="dentiste près de moi" charsTyped={20} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 360 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ transform: `scale(${1 + highlight * 0.04})` }}>
            <LocalResultRow rating={4.8} highlighted />
          </div>
          <LocalResultRow rating={4.6} dim />
          <LocalResultRow rating={4.4} dim />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// F07 — résultats visibles, mais pas vous + caption "Pas toujours vous"
const F07: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [4, 18], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 80 }}>
        <SearchBar width={760} drawProgress={1} query="dentiste près de moi" charsTyped={20} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 360 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <LocalResultRow rating={4.8} highlighted />
          <LocalResultRow rating={4.6} dim />
          <LocalResultRow rating={4.4} dim />
        </div>
      </AbsoluteFill>
      <Caption text="Pas toujours vous." opacity={captionOpacity} />
    </AbsoluteFill>
  );
};

// F08 — pin bleu sur carte abstraite, "Quelque part ici"
const F08: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 20], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (local / 30) % 1;
  return (
    <AbsoluteFill style={{ opacity, background: colors.bg }}>
      <MapBackground intensity={1} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <MapPin size={120} pulseProgress={pulse} />
      </AbsoluteFill>
      <Caption text="Quelque part ici." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F09 — zoom dans la carte, cercles de recherche, "Plus loin en surface"
const F09: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 20], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(local, [0, dur], [1, 1.18], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (local / 30) % 1;
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <MapBackground intensity={1.2} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <MapPin size={130} pulseProgress={pulse} />
      </AbsoluteFill>
      <Caption text="Plus loin en surface." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F10 — petit point gris éloigné, hors zone, "Et vous, hors champ"
const F10: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 24], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const distantOpacity = interpolate(local, [4, 22], [0, 0.55], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <MapBackground intensity={1.1} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <MapPin size={130} />
      </AbsoluteFill>
      {/* distant grey dot bottom-right */}
      <div
        style={{
          position: "absolute",
          right: 220,
          bottom: 580,
          width: 12,
          height: 12,
          borderRadius: 999,
          background: colors.grey,
          opacity: distantOpacity,
          boxShadow: `0 0 8px ${colors.grey}`,
        }}
      />
      <Caption text="Et vous, hors champ." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F11 — fiche faible, sombre, peu rassurante, "Une présence faible"
const F11: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [8, 20], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardOpacity = interpolate(local, [0, 14], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ opacity: cardOpacity }}>
        <GoogleCardMini name="Cabinet Dentaire" rating={1.4} reviews={23} recent="il y a 3 ans" dim showThumb width={760} />
      </div>
      <div style={{ marginTop: 80 }} />
      <Caption text="Une présence faible." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F12 — zoom sur avis faibles / anciens, "Peu d'avis. Ancien."
const F12: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(local, [0, dur], [1.05, 1.18], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
        }}
      >
        <GoogleCardMini name="Cabinet Dentaire" rating={1.4} reviews={23} recent="il y a 3 ans" dim showThumb width={760} />
      </AbsoluteFill>
      <Caption text="Peu d'avis. Ancien." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F13 — fiche concurrente plus crédible, slide up + glow
const F13: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slideY = interpolate(local, [0, 16], [40, 0], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slideOpacity = interpolate(local, [0, 16], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ opacity: slideOpacity, transform: `translateY(${slideY}px)` }}>
        <GoogleCardMini name="Cabinet Sourire" rating={4.8} reviews={186} recent="avis récent" highlighted showThumb width={760} />
      </div>
      <div style={{ marginTop: 80 }} />
      <Caption text="Un concurrent plus visible." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F14 — bouton appel concurrent qui s'illumine, "L'appel devient évident"
const F14: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const callGlow = (Math.sin(local / 4) * 0.5 + 0.5);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <GoogleCardMini name="Cabinet Sourire" rating={4.8} reviews={186} recent="avis récent" highlighted showThumb width={760} callButton callGlow={callGlow} />
      <div style={{ marginTop: 80 }} />
      <Caption text="L'appel devient évident." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F15 — fiche concurrente se dissout en particules bleues, "Ils captent l'attention"
const F15: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const dissolve = interpolate(local, [0, dur], [0, 1], { easing: easings.editorial, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionOpacity = interpolate(local, [10, 22], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Generate ~80 particles deterministically from frame
  const particles = Array.from({ length: 80 }).map((_, i) => {
    const rand = (n: number) => ((Math.sin(i * 9.7 + n) + 1) / 2);
    const ox = (rand(1) - 0.5) * 800;
    const oy = (rand(2) - 0.5) * 600;
    const size = 3 + rand(3) * 4;
    const delay = rand(4) * 0.4;
    const t = Math.max(0, Math.min(1, (dissolve - delay) / 0.6));
    const driftX = ox * (1 + t * 0.6);
    const driftY = oy * (1 + t * 0.6) - t * 200;
    return { x: driftX, y: driftY, size, opacity: 1 - t };
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ position: "relative", width: 760, height: 200, opacity: 1 - dissolve * 0.9 }}>
        <GoogleCardMini name="Cabinet Sourire" rating={4.8} reviews={186} recent="avis récent" highlighted showThumb width={760} />
      </div>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              width: p.size,
              height: p.size,
              borderRadius: 999,
              background: colors.blue,
              opacity: p.opacity * 0.9,
              boxShadow: `0 0 6px ${colors.blueGlow}`,
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 80 }} />
      <Caption text="Ils captent l'attention." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

// F16 — particules convergent vers orb central, orbites; "On lit les signaux."
const F16: React.FC<FrameProps> = ({ frame, from, dur }) => {
  const { visible, opacity, local } = useLocal(frame, from, dur);
  if (!visible) return null;
  const orbScale = interpolate(local, [0, 60], [0.6, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const orbAppear = interpolate(local, [0, 30], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringsAppear = interpolate(local, [40, 90], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const captionOpacity = interpolate(local, [80, 110], [0, 1], { easing: easings.enter, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rotation = local * 0.4;
  const pulse = (Math.sin(local / 18) * 0.5 + 0.5);

  // Convergent particles (decaying inward)
  const particles = Array.from({ length: 36 }).map((_, i) => {
    const rand = (n: number) => ((Math.sin(i * 11.3 + n) + 1) / 2);
    const angle = rand(1) * Math.PI * 2;
    const startR = 800 + rand(2) * 200;
    const t = Math.max(0, Math.min(1, (local - rand(3) * 24) / 60));
    const r = startR * (1 - t);
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    return { x, y, opacity: t < 1 ? 1 - t : 0 };
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 1 - ringsAppear }}>
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              width: 4,
              height: 4,
              borderRadius: 999,
              background: colors.blue,
              opacity: p.opacity,
              boxShadow: `0 0 6px ${colors.blueGlow}`,
            }}
          />
        ))}
      </div>
      <div style={{ transform: `scale(${orbScale})`, opacity: orbAppear }}>
        <OrbCore size={260} pulse={pulse} />
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: ringsAppear }}>
        <OrbitalSignals radius={420} rotation={rotation} appear={ringsAppear} />
      </div>
      <Caption text="On lit les signaux." opacity={captionOpacity} small />
    </AbsoluteFill>
  );
};

export const Block01: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <F01 frame={frame} from={F.F01.from} dur={F.F01.len} />
      <F02 frame={frame} from={F.F02.from} dur={F.F02.len} />
      <F03 frame={frame} from={F.F03.from} dur={F.F03.len} />
      <F04 frame={frame} from={F.F04.from} dur={F.F04.len} />
      <F05 frame={frame} from={F.F05.from} dur={F.F05.len} />
      <F06 frame={frame} from={F.F06.from} dur={F.F06.len} />
      <F07 frame={frame} from={F.F07.from} dur={F.F07.len} />
      <F08 frame={frame} from={F.F08.from} dur={F.F08.len} />
      <F09 frame={frame} from={F.F09.from} dur={F.F09.len} />
      <F10 frame={frame} from={F.F10.from} dur={F.F10.len} />
      <F11 frame={frame} from={F.F11.from} dur={F.F11.len} />
      <F12 frame={frame} from={F.F12.from} dur={F.F12.len} />
      <F13 frame={frame} from={F.F13.from} dur={F.F13.len} />
      <F14 frame={frame} from={F.F14.from} dur={F.F14.len} />
      <F15 frame={frame} from={F.F15.from} dur={F.F15.len} />
      <F16 frame={frame} from={F.F16.from} dur={F.F16.len} />
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};
