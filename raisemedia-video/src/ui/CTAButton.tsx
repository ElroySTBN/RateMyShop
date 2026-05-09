import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  text?: string;
  pulse?: number; // 0..1 pulse intensity
  width?: number;
};

export const CTAButton: React.FC<Props> = ({
  text = "Diagnostic digital gratuit — livré en 48 h",
  pulse = 0,
  width = 760,
}) => {
  return (
    <div
      style={{
        width,
        padding: "20px 28px",
        borderRadius: 999,
        background: "rgba(50,161,237,0.08)",
        border: `1px solid ${colors.blue}`,
        boxShadow: `0 0 ${24 + pulse * 30}px ${colors.blueGlowSoft}, inset 0 0 0 1px ${colors.blue}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        transform: `scale(${1 + pulse * 0.02})`,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke={colors.blue} strokeWidth="1.6" />
        <path d="M3 9h18M8 3v4M16 3v4" stroke={colors.blue} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: -0.2,
          color: colors.white,
        }}
      >
        {text}
      </span>
    </div>
  );
};
