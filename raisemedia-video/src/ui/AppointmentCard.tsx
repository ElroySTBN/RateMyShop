import { colors } from "../theme";
import { fonts } from "../fonts";

type Props = {
  width?: number;
  appear?: number;
  confirmed?: number; // 0..1 reveal of confirmed state
};

export const AppointmentCard: React.FC<Props> = ({
  width = 720,
  appear = 1,
  confirmed = 0,
}) => {
  return (
    <div
      style={{
        width,
        padding: "26px 28px",
        borderRadius: 22,
        background: "rgba(245,245,247,0.04)",
        border: `1px solid ${colors.blue}`,
        boxShadow: `0 0 ${30 + confirmed * 20}px ${colors.blueGlowSoft}`,
        opacity: appear,
        display: "flex",
        alignItems: "center",
        gap: 22,
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: "rgba(50,161,237,0.08)",
          border: `1px solid ${colors.blue}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: 2,
            color: colors.blue,
            textTransform: "uppercase",
          }}
        >
          mar
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1,
          }}
        >
          14
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: -0.3,
            color: colors.white,
          }}
        >
          Demande de rendez-vous
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.grey,
            letterSpacing: 0.4,
          }}
        >
          Demain · 10:00
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: confirmed,
            transform: `translateY(${(1 - confirmed) * 6}px)`,
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: colors.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 14px rgba(50,209,122,0.55)`,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5 9-11" stroke={colors.bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              color: colors.green,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            }}
          >
            Confirmé
          </span>
        </div>
      </div>
    </div>
  );
};
