import { Img, staticFile } from "remotion";
import { colors } from "../theme";

type Props = {
  width?: number;
  glow?: number; // 0..1 — intensity of the blue drop-shadow halo
  scale?: number;
  opacity?: number;
};

const SVG_NATURAL_W = 1683.75;
const SVG_NATURAL_H = 1190.25;

export const RaiseLogomark: React.FC<Props> = ({
  width = 600,
  glow = 1,
  scale = 1,
  opacity = 1,
}) => {
  const aspect = SVG_NATURAL_H / SVG_NATURAL_W;
  const height = width * aspect;

  return (
    <div
      style={{
        width,
        height,
        opacity,
        transform: `scale(${scale})`,
        filter: `drop-shadow(0 0 ${28 * glow}px ${colors.blueGlow}) drop-shadow(0 0 ${64 * glow}px ${colors.blueGlowSoft})`,
      }}
    >
      <Img
        src={staticFile("raisemed-logo.svg")}
        style={{ width, height, display: "block" }}
      />
    </div>
  );
};
