import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { fonts } from "../fonts";
import { Block01 } from "../scenes/Block01";
import { Block02 } from "../scenes/Block02";
import { Block03 } from "../scenes/Block03";
import { BLOCKS, colors } from "../theme";

// Audio slots — drop files in public/audio/, then flip flags.
// public/audio/voiceover.mp3 — voix off masculine ou féminine, posée, grave
// public/audio/music.mp3      — bed musical 60 s, ambient/cinematic, ~ -16 LUFS
// public/audio/sfx.mp3        — sound design (clics doux, pulses, whooshes, scan)
const ENABLE_VO = false;
const ENABLE_MUSIC = false;
const ENABLE_SFX = false;

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

      {ENABLE_VO && <Audio src={staticFile("audio/voiceover.mp3")} volume={1} />}
      {ENABLE_MUSIC && <Audio src={staticFile("audio/music.mp3")} volume={0.55} />}
      {ENABLE_SFX && <Audio src={staticFile("audio/sfx.mp3")} volume={0.7} />}
    </AbsoluteFill>
  );
};
