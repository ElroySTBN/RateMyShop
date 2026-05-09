import { colors } from "../theme";

type Props = {
  progress: number; // 0..1
  width: number;
  height: number;
};

export const ScanLine: React.FC<Props> = ({ progress, width, height }) => {
  const y = height * progress;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width,
        height,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: y - 1,
          width,
          height: 2,
          background: colors.blue,
          boxShadow: `0 0 24px ${colors.blueGlowStrong}, 0 0 48px ${colors.blueGlow}`,
        }}
      />
      {/* faint trail */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height: y,
          background: `linear-gradient(180deg, transparent 0%, ${colors.blueGlowSoft} 100%)`,
          opacity: 0.6,
        }}
      />
    </div>
  );
};
