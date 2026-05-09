import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  size?: number;
  glow?: number; // 0..1
  withWordmark?: boolean;
  draw?: number; // 0..1 SVG draw progress for the rings
};

// Approximation of the RaiseMed.IA glyph: blue disk with three concentric arcs.
// User can swap with their PNG by placing it in public/ and using <Img>.
export const RaiseLogomark: React.FC<Props> = ({
  size = 220,
  glow = 1,
  withWordmark = false,
  draw = 1,
}) => {
  const arcLengths = [Math.PI * 60, Math.PI * 80, Math.PI * 100];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg
        width={size}
        height={size}
        viewBox="-100 -100 200 200"
        style={{
          filter: `drop-shadow(0 0 ${28 * glow}px ${colors.blueGlow}) drop-shadow(0 0 ${64 * glow}px ${colors.blueGlowSoft})`,
        }}
      >
        <defs>
          <radialGradient id="rm-disk" cx="0.4" cy="0.35">
            <stop offset="0%" stopColor="#5DBDFA" />
            <stop offset="55%" stopColor={colors.blue} />
            <stop offset="100%" stopColor={colors.blueDeep} />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="92" fill="url(#rm-disk)" />
        {/* concentric arcs (top half "smile" rings) */}
        {[60, 78, 96].map((r, i) => {
          const len = arcLengths[i];
          return (
            <ellipse
              key={r}
              cx={0}
              cy={6}
              rx={r * 0.55}
              ry={r * 0.32}
              fill="none"
              stroke={colors.white}
              strokeOpacity={0.92}
              strokeWidth={3.4}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - draw)}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      {withWordmark && (
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: size * 0.62,
            fontWeight: 800,
            letterSpacing: -2,
            display: "flex",
            alignItems: "baseline",
            color: colors.white,
            lineHeight: 1,
          }}
        >
          <span>RaiseMed.</span>
          <span style={{ color: colors.blue }}>IA</span>
        </div>
      )}
    </div>
  );
};
