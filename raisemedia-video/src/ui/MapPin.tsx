import { colors } from "../theme";

type Props = {
  size?: number;
  glow?: number;
  pulseProgress?: number; // 0..1 ring ripples
  rings?: number;
  color?: string;
};

export const MapPin: React.FC<Props> = ({
  size = 80,
  glow = 1,
  pulseProgress = 0,
  rings = 3,
  color = colors.blue,
}) => {
  return (
    <div style={{ position: "relative", width: size * 2.5, height: size * 2 }}>
      {/* concentric rings on the ground */}
      {Array.from({ length: rings }).map((_, i) => {
        const baseScale = 1 + i * 0.6;
        const expandedScale = baseScale + pulseProgress * 1.6;
        const opacity = (1 - pulseProgress * 0.6) * (0.55 - i * 0.15);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 8,
              width: size * 1.6,
              height: size * 0.4,
              borderRadius: "50%",
              border: `1px solid ${color}`,
              opacity,
              transform: `translateX(-50%) scale(${expandedScale})`,
            }}
          />
        );
      })}
      {/* the pin */}
      <svg
        width={size}
        height={size * 1.3}
        viewBox="0 0 24 32"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 12,
          transform: "translateX(-50%)",
          filter: `drop-shadow(0 0 ${20 * glow}px ${colors.blueGlow})`,
        }}
      >
        <path
          d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
          fill={color}
        />
        <circle cx="12" cy="12" r="4.5" fill={colors.bg} />
      </svg>
    </div>
  );
};
