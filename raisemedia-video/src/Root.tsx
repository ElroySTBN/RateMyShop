import "./index.css";
import { Composition } from "remotion";
import { Main9x16 } from "./compositions/Main9x16";
import { TOTAL_FRAMES, fps } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RaiseMedia-9x16"
      component={Main9x16}
      durationInFrames={TOTAL_FRAMES}
      fps={fps}
      width={1080}
      height={1920}
    />
  );
};
