import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { fonts } from "../fonts";
import { Block01 } from "../scenes/Block01";
import { Block02 } from "../scenes/Block02";
import { Block03 } from "../scenes/Block03";
import { BLOCKS, colors } from "../theme";

// Drop public/audio/voiceover.mp3 then flip ENABLE_VO to add the voix off.
const ENABLE_VO = false;

type SfxEvent = { from: number; src: string; volume?: number };

// Audio events synchronised to each scene cut. Frame numbers are absolute
// within the master timeline and match the F.* offsets in theme.ts.
const SFX: SfxEvent[] = [
  // Block 01
  { from: 0,    src: "audio/thump.mp3", volume: 0.4 },
  { from: 70,   src: "audio/whoosh.mp3", volume: 0.55 },
  { from: 112,  src: "audio/click.mp3", volume: 0.35 },
  { from: 118,  src: "audio/click.mp3", volume: 0.35 },
  { from: 124,  src: "audio/click.mp3", volume: 0.35 },
  { from: 130,  src: "audio/click.mp3", volume: 0.35 },
  { from: 136,  src: "audio/click.mp3", volume: 0.35 },
  { from: 142,  src: "audio/click.mp3", volume: 0.35 },
  { from: 165,  src: "audio/tick.mp3", volume: 0.4 },
  { from: 200,  src: "audio/ping.mp3", volume: 0.3 },
  { from: 280,  src: "audio/thump.mp3", volume: 0.45 },
  { from: 385,  src: "audio/thump.mp3", volume: 0.4 },
  { from: 485,  src: "audio/ping.mp3", volume: 0.4 },
  { from: 535,  src: "audio/ring.mp3", volume: 0.4 },
  { from: 585,  src: "audio/whoosh.mp3", volume: 0.6 },
  { from: 630,  src: "audio/orb_hum.mp3", volume: 0.55 },
  // Block 02
  { from: 720,  src: "audio/lock.mp3", volume: 0.7 },
  { from: 770,  src: "audio/tick.mp3", volume: 0.4 },
  { from: 800,  src: "audio/whoosh.mp3", volume: 0.4 },
  { from: 845,  src: "audio/tick.mp3", volume: 0.4 },
  { from: 875,  src: "audio/whoosh.mp3", volume: 0.35 },
  { from: 925,  src: "audio/click.mp3", volume: 0.5 },
  { from: 935,  src: "audio/click.mp3", volume: 0.5 },
  { from: 970,  src: "audio/tick.mp3", volume: 0.4 },
  { from: 1000, src: "audio/whoosh.mp3", volume: 0.4 },
  { from: 1050, src: "audio/click.mp3", volume: 0.4 },
  { from: 1060, src: "audio/click.mp3", volume: 0.4 },
  { from: 1070, src: "audio/click.mp3", volume: 0.4 },
  { from: 1100, src: "audio/tick.mp3", volume: 0.4 },
  { from: 1130, src: "audio/whoosh.mp3", volume: 0.4 },
  { from: 1180, src: "audio/pulse.mp3", volume: 0.5 },
  { from: 1225, src: "audio/tick.mp3", volume: 0.4 },
  { from: 1255, src: "audio/whoosh.mp3", volume: 0.3 },
  { from: 1295, src: "audio/ping.mp3", volume: 0.4 },
  { from: 1345, src: "audio/orb_hum.mp3", volume: 0.6 },
  // Block 03
  { from: 1440, src: "audio/ping.mp3", volume: 0.5 },
  { from: 1485, src: "audio/click.mp3", volume: 0.4 },
  { from: 1500, src: "audio/click.mp3", volume: 0.4 },
  { from: 1515, src: "audio/click.mp3", volume: 0.4 },
  { from: 1540, src: "audio/ring.mp3", volume: 0.45 },
  { from: 1585, src: "audio/ring.mp3", volume: 0.5 },
  { from: 1630, src: "audio/ping.mp3", volume: 0.4 },
  { from: 1680, src: "audio/ding.mp3", volume: 0.5 },
  { from: 1735, src: "audio/tick.mp3", volume: 0.4 },
  { from: 1765, src: "audio/tick.mp3", volume: 0.4 },
  { from: 1795, src: "audio/tick.mp3", volume: 0.4 },
  { from: 1840, src: "audio/tick.mp3", volume: 0.4 },
  { from: 1870, src: "audio/ding.mp3", volume: 0.55 },
  { from: 1925, src: "audio/glissando.mp3", volume: 0.5 },
  // F45 silence (no sfx around 1990-2110)
  { from: 2110, src: "audio/ping.mp3", volume: 0.5 },
  { from: 2245, src: "audio/lock.mp3", volume: 0.55 },
];

export const Main9x16: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily: fonts.sans }}>
      <Sequence from={BLOCKS.one.from} durationInFrames={BLOCKS.one.len} layout="none">
        <Block01 />
      </Sequence>
      <Sequence from={BLOCKS.two.from} durationInFrames={BLOCKS.two.len} layout="none">
        <Block02 />
      </Sequence>
      <Sequence from={BLOCKS.three.from} durationInFrames={BLOCKS.three.len} layout="none">
        <Block03 />
      </Sequence>

      {/* Music bed — gentle ambient drone underneath everything */}
      <Audio src={staticFile("audio/music.mp3")} volume={() => 0.45} />

      {/* SFX events — synthesised, timed to each visual cut */}
      {SFX.map((e, i) => {
        const vol = e.volume ?? 0.5;
        return (
          <Sequence key={i} from={e.from} layout="none">
            <Audio src={staticFile(e.src)} volume={() => vol} />
          </Sequence>
        );
      })}

      {ENABLE_VO && <Audio src={staticFile("audio/voiceover.mp3")} volume={() => 1} />}
    </AbsoluteFill>
  );
};
