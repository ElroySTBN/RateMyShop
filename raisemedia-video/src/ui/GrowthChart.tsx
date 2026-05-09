import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  width?: number;
  height?: number;
  progress: number; // 0..1 — drawing progress
  peakLabel?: string;
};

const POINTS = [
  [0, 0.85],
  [0.13, 0.78],
  [0.27, 0.7],
  [0.4, 0.62],
  [0.55, 0.5],
  [0.7, 0.4],
  [0.84, 0.25],
  [1, 0.1],
];

export const GrowthChart: React.FC<Props> = ({
  width = 880,
  height = 460,
  progress,
  peakLabel,
}) => {
  const padX = 60;
  const padY = 80;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = POINTS.map(([x, y]) => [padX + x * innerW, padY + y * innerH]);
  const path = points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`),
    "",
  );

  // Approx total length for stroke-dasharray
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i][0] - points[i - 1][0];
    const dy = points[i][1] - points[i - 1][1];
    length += Math.sqrt(dx * dx + dy * dy);
  }
  const offset = length * (1 - progress);

  // Position of the leading dot along the path (approx, at progress)
  const idxF = progress * (points.length - 1);
  const idx = Math.min(points.length - 2, Math.floor(idxF));
  const t = idxF - idx;
  const dotX = points[idx][0] + (points[idx + 1][0] - points[idx][0]) * t;
  const dotY = points[idx][1] + (points[idx + 1][1] - points[idx][1]) * t;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ filter: `drop-shadow(0 0 24px ${colors.blueGlowSoft})` }}
    >
      {/* baseline */}
      <line
        x1={padX}
        y1={height - padY}
        x2={width - padX}
        y2={height - padY}
        stroke={colors.greySoft}
        strokeWidth={1}
      />
      {/* grid hints */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={padX}
          y1={padY + innerH * g}
          x2={width - padX}
          y2={padY + innerH * g}
          stroke={colors.greySoft}
          strokeOpacity={0.4}
          strokeWidth={1}
          strokeDasharray="2 6"
        />
      ))}
      {/* line */}
      <path
        d={path}
        fill="none"
        stroke={colors.blue}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={length}
        strokeDashoffset={offset}
      />
      {/* leading dot */}
      {progress > 0 && progress < 1 && (
        <circle cx={dotX} cy={dotY} r={6} fill={colors.blue} />
      )}
      {/* peak dot + label */}
      {progress >= 1 && (
        <g>
          <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={6} fill={colors.green} />
          {peakLabel && (
            <text
              x={points[points.length - 1][0]}
              y={points[points.length - 1][1] - 24}
              textAnchor="end"
              fontFamily={fonts.sans}
              fontSize={28}
              fontWeight={600}
              fill={colors.green}
            >
              {peakLabel}
            </text>
          )}
        </g>
      )}
    </svg>
  );
};
