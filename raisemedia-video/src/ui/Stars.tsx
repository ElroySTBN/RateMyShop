import { colors } from "../theme";

type Props = {
  value: number; // 0..5
  size?: number;
  gap?: number;
  color?: string;
  dimColor?: string;
};

const StarShape: React.FC<{ fill: number; size: number; color: string; dimColor: string }> = ({
  fill,
  size,
  color,
  dimColor,
}) => {
  const id = `s-${Math.round(fill * 1000)}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor={color} />
          <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor={dimColor} />
        </linearGradient>
      </defs>
      <path
        d="M12 2.6l2.95 6.18 6.55 1.02-4.9 4.7 1.27 6.78L12 17.9l-5.87 3.28 1.27-6.78-4.9-4.7 6.55-1.02L12 2.6z"
        fill={`url(#${id})`}
      />
    </svg>
  );
};

export const Stars: React.FC<Props> = ({
  value,
  size = 28,
  gap = 5,
  color = colors.blue,
  dimColor = "rgba(255,255,255,0.10)",
}) => (
  <div style={{ display: "inline-flex", gap }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <StarShape
        key={i}
        fill={Math.max(0, Math.min(1, value - i))}
        size={size}
        color={color}
        dimColor={dimColor}
      />
    ))}
  </div>
);
