import { colors } from "../theme";

type Props = {
  intensity?: number; // 0..1
  topDown?: boolean;
};

export const MapBackground: React.FC<Props> = ({ intensity = 1, topDown = true }) => {
  // Concentric soft rings (top-down map abstraction)
  const rings = [180, 320, 480, 660, 860];
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="-540 -960 1080 1920"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0 }}
    >
      {topDown &&
        rings.map((r, i) => (
          <circle
            key={r}
            cx={0}
            cy={0}
            r={r}
            fill="none"
            stroke={colors.blue}
            strokeOpacity={(0.18 - i * 0.025) * intensity}
            strokeWidth={1}
          />
        ))}
      {/* faint grid lines */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = -540 + i * 135;
        return (
          <line
            key={`v${i}`}
            x1={x}
            y1={-960}
            x2={x}
            y2={960}
            stroke={colors.blue}
            strokeOpacity={0.04 * intensity}
          />
        );
      })}
      {Array.from({ length: 15 }).map((_, i) => {
        const y = -960 + i * 135;
        return (
          <line
            key={`h${i}`}
            x1={-540}
            y1={y}
            x2={540}
            y2={y}
            stroke={colors.blue}
            strokeOpacity={0.04 * intensity}
          />
        );
      })}
    </svg>
  );
};
