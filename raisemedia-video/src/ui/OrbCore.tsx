import { colors } from "../theme";

type Props = {
  size?: number;
  pulse?: number; // 0..1
  withGlyph?: boolean;
};

export const OrbCore: React.FC<Props> = ({ size = 280, pulse = 0, withGlyph = true }) => {
  const haloOpacity = 0.45 + pulse * 0.4;
  return (
    <div
      style={{
        position: "relative",
        width: size * 2.2,
        height: size * 2.2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* outer halo (no blur filter — uses radial-gradient softness instead) */}
      <div
        style={{
          position: "absolute",
          width: size * 2.2,
          height: size * 2.2,
          borderRadius: 999,
          background: `radial-gradient(circle at center, ${colors.blueGlowSoft} 0%, transparent 70%)`,
          opacity: haloOpacity,
        }}
      />
      {/* core orb */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: 999,
          background: `radial-gradient(circle at 35% 30%, #5DBDFA, ${colors.blue} 55%, ${colors.blueDeep})`,
          boxShadow: `0 0 ${100 + pulse * 80}px ${colors.blueGlow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {withGlyph && (
          <svg width={size * 0.6} height={size * 0.45} viewBox="-100 -60 200 120">
            {[34, 50, 66].map((r) => (
              <ellipse
                key={r}
                cx={0}
                cy={6}
                rx={r}
                ry={r * 0.55}
                fill="none"
                stroke={colors.white}
                strokeOpacity={0.85}
                strokeWidth={4}
                strokeLinecap="round"
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
};
