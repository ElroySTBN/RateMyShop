import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  letter: string;
  size?: number;
  glow?: number; // 0..1
  outlined?: boolean;
  opacity?: number;
};

export const RaiseLetter: React.FC<Props> = ({
  letter,
  size = 360,
  glow = 1,
  outlined = false,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontSize: size,
        fontWeight: 800,
        lineHeight: 0.85,
        letterSpacing: -size * 0.05,
        color: outlined ? "transparent" : colors.blue,
        WebkitTextStroke: outlined ? `2px ${colors.blue}` : "none",
        opacity,
        textShadow: outlined
          ? "none"
          : `0 0 ${30 * glow}px ${colors.blueGlow}, 0 0 ${80 * glow}px ${colors.blueGlowSoft}`,
      }}
    >
      {letter}
    </div>
  );
};

type RowProps = {
  active?: number; // index 0..4 of currently glowing letter; -1 = all neutral
  size?: number;
  glow?: number;
};

export const RaiseRow: React.FC<RowProps> = ({ active = -1, size = 180, glow = 0.8 }) => {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
      {["R", "A", "I", "S", "E"].map((l, i) => (
        <RaiseLetter
          key={l}
          letter={l}
          size={size}
          glow={i === active ? glow : 0.2}
          outlined={i !== active && active !== -1}
          opacity={active === -1 || i === active ? 1 : 0.5}
        />
      ))}
    </div>
  );
};
