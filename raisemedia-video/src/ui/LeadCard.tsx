import { colors } from "../theme";
import { fonts } from "../fonts";
import { Badge } from "./Badge";

type Props = {
  width?: number;
  glow?: number;
  appear?: number;
};

export const LeadCard: React.FC<Props> = ({ width = 720, glow = 1, appear = 1 }) => {
  return (
    <div
      style={{
        width,
        padding: 32,
        borderRadius: 22,
        background: "rgba(50,161,237,0.05)",
        border: `1px solid ${colors.blue}`,
        boxShadow: `0 0 ${40 * glow}px ${colors.blueGlowSoft}, inset 0 0 0 1px ${colors.blue}`,
        opacity: appear,
        transform: `translateY(${(1 - appear) * 14}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 999,
          background: "rgba(50,161,237,0.10)",
          border: `1px solid ${colors.blue}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke={colors.blue} strokeWidth="1.6" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={colors.blue} strokeWidth="1.6" />
        </svg>
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: -0.4,
          color: colors.white,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Nouveau prospect
        <br />
        qualifié
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Badge text="Implantologie" />
        <Badge text="Intention forte" />
      </div>
    </div>
  );
};
