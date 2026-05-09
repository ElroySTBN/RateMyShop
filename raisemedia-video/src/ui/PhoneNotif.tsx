import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  title?: string;
  subtitle?: string;
  width?: number;
  glow?: number;
};

export const PhoneNotif: React.FC<Props> = ({
  title = "Cabinet Dentaire",
  subtitle = "Appel entrant",
  width = 720,
  glow = 1,
}) => {
  return (
    <div
      style={{
        width,
        padding: "20px 22px",
        borderRadius: 22,
        background: "rgba(245,245,247,0.06)",
        border: `1px solid ${colors.greySoft}`,
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        gap: 18,
        boxShadow: `0 12px 60px rgba(0,0,0,0.5), 0 0 ${36 * glow}px ${colors.blueGlowSoft}`,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "rgba(50,161,237,0.10)",
          border: `1px solid ${colors.blue}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 4c-2 0-3 1.5-3 3 0 4 1 6 2 9 .5 1.5 1 3 2 3s1.5-1 2-3l.5-2c.2-1 .5-1 1 0l.5 2c.5 2 1 3 2 3s1.5-1.5 2-3c1-3 2-5 2-9 0-1.5-1-3-3-3-1.5 0-2 1-4 1s-2.5-1-4-1z"
            stroke={colors.blue}
            strokeWidth="1.4"
          />
        </svg>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: -0.3,
            color: colors.white,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            color: colors.grey,
            letterSpacing: 0.3,
          }}
        >
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: "#E25241",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ transform: "rotate(135deg)" }}>
            <path
              d="M5 4l3-1 2 4-2 1c1 2 2.5 3.5 4.5 4.5l1-2 4 2-1 3c-1 1-3 1-5 0-3-1.5-6-4.5-7.5-7.5-1-2-1-4 0-5z"
              fill={colors.white}
            />
          </svg>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: colors.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px rgba(50,209,122,0.6)`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M5 4l3-1 2 4-2 1c1 2 2.5 3.5 4.5 4.5l1-2 4 2-1 3c-1 1-3 1-5 0-3-1.5-6-4.5-7.5-7.5-1-2-1-4 0-5z"
              fill={colors.white}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
