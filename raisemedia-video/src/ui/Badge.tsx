import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  text: string;
  appear?: number; // 0..1
  variant?: "blue" | "neutral";
};

export const Badge: React.FC<Props> = ({ text, appear = 1, variant = "blue" }) => {
  const isBlue = variant === "blue";
  return (
    <div
      style={{
        padding: "10px 18px",
        borderRadius: 999,
        border: `1px solid ${isBlue ? colors.blue : colors.greySoft}`,
        background: isBlue ? "rgba(50,161,237,0.06)" : "rgba(255,255,255,0.02)",
        boxShadow: isBlue ? `0 0 18px ${colors.blueGlowSoft}` : "none",
        fontFamily: fonts.mono,
        fontSize: 14,
        letterSpacing: 0.6,
        color: isBlue ? colors.blue : colors.grey,
        opacity: appear,
        transform: `translateY(${(1 - appear) * 6}px)`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
