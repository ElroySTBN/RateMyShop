import "./index.css";
import { Composition } from "remotion";
import { MainSixteenNine } from "./compositions/MainSixteenNine";
import { TOTAL_FRAMES, fps } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RaiseMedia-16x9"
        component={MainSixteenNine}
        durationInFrames={TOTAL_FRAMES}
        fps={fps}
        width={1920}
        height={1080}
      />
      <Composition
        id="RaiseMedia-9x16"
        component={MainSixteenNine}
        durationInFrames={TOTAL_FRAMES}
        fps={fps}
        width={1080}
        height={1920}
      />
    </>
  );
};
