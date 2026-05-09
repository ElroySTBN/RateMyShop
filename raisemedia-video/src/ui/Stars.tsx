import { colors } from "../theme";

const Star: React.FC<{ fill: number; size: number }> = ({ fill, size }) => {
  // fill in [0..1]
  const id = `star-${Math.round(fill * 1000)}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor={colors.gold} />
          <stop offset={`${Math.max(0, Math.min(1, fill)) * 100}%`} stopColor="rgba(255,255,255,0.10)" />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5l2.95 6.18L21.5 9.7l-4.9 4.7 1.27 6.78L12 17.9l-5.87 3.28L7.4 14.4 2.5 9.7l6.55-1.02L12 2.5z"
        fill={`url(#${id})`}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="0.7"
      />
    </svg>
  );
};

export const Stars: React.FC<{ value: number; size?: number; gap?: number }> = ({
  value,
  size = 32,
  gap = 6,
}) => {
  return (
    <div style={{ display: "inline-flex", gap }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return <Star key={i} fill={fill} size={size} />;
      })}
    </div>
  );
};
