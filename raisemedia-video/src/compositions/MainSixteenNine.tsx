import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { fonts } from "../fonts";
import { CTA } from "../scenes/CTA";
import { ColdOpen } from "../scenes/ColdOpen";
import { Cost } from "../scenes/Cost";
import { Demo } from "../scenes/Demo";
import { Pivot } from "../scenes/Pivot";
import { Problem } from "../scenes/Problem";
import { Protocol } from "../scenes/Protocol";
import { Results } from "../scenes/Results";
import { SCENES } from "../theme";

// Audio: drop files in public/audio/ then flip these flags.
// public/audio/music.mp3      → background score (60s, ~ -14 LUFS)
// public/audio/sfx-hits.mp3   → bed of whooshes/dings synced to scene cuts
const ENABLE_MUSIC = false;
const ENABLE_SFX = false;

export const MainSixteenNine: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0A0A0A", fontFamily: fonts.display }}>
      <Sequence from={SCENES.coldOpen.from} durationInFrames={SCENES.coldOpen.len} layout="none">
        <ColdOpen />
      </Sequence>
      <Sequence from={SCENES.problem.from} durationInFrames={SCENES.problem.len} layout="none">
        <Problem />
      </Sequence>
      <Sequence from={SCENES.cost.from} durationInFrames={SCENES.cost.len} layout="none">
        <Cost />
      </Sequence>
      <Sequence from={SCENES.pivot.from} durationInFrames={SCENES.pivot.len} layout="none">
        <Pivot />
      </Sequence>
      <Sequence from={SCENES.protocol.from} durationInFrames={SCENES.protocol.len} layout="none">
        <Protocol />
      </Sequence>
      <Sequence from={SCENES.demo.from} durationInFrames={SCENES.demo.len} layout="none">
        <Demo />
      </Sequence>
      <Sequence from={SCENES.results.from} durationInFrames={SCENES.results.len} layout="none">
        <Results />
      </Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.len} layout="none">
        <CTA />
      </Sequence>

      {ENABLE_MUSIC && <Audio src={staticFile("audio/music.mp3")} volume={0.6} />}
      {ENABLE_SFX && <Audio src={staticFile("audio/sfx-hits.mp3")} volume={0.85} />}
    </AbsoluteFill>
  );
};
