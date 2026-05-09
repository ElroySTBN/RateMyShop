import { colors } from "../theme";
import { fonts } from "../fonts";
import { Stars } from "./Stars";

type Props = {
  name?: string;
  rating?: number;
  reviews?: number;
  recent?: string;
  highlighted?: boolean;
  dim?: boolean;
  width?: number;
  callButton?: boolean;
  callGlow?: number; // 0..1 pulses the call button
  showThumb?: boolean;
};

export const GoogleCardMini: React.FC<Props> = ({
  name = "Cabinet Dentaire",
  rating = 4.8,
  reviews = 186,
  recent,
  highlighted = false,
  dim = false,
  width = 720,
  callButton = false,
  callGlow = 0,
  showThumb = false,
}) => {
  const opacity = dim ? 0.55 : 1;
  const borderColor = highlighted ? colors.blue : "rgba(245,245,247,0.1)";

  return (
    <div
      style={{
        width,
        padding: 26,
        borderRadius: 22,
        border: `1px solid ${borderColor}`,
        background: highlighted ? "rgba(50,161,237,0.04)" : "rgba(255,255,255,0.02)",
        boxShadow: highlighted
          ? `0 0 60px ${colors.blueGlowSoft}, inset 0 0 0 1px ${colors.blue}`
          : "none",
        opacity,
        display: "flex",
        gap: 22,
        alignItems: "center",
      }}
    >
      {showThumb && (
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 16,
            background:
              "linear-gradient(135deg, rgba(50,161,237,0.18), rgba(22,92,170,0.10))",
            border: `1px solid ${colors.greySoft}`,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 4c-2 0-3 1.5-3 3 0 4 1 6 2 9 .5 1.5 1 3 2 3s1.5-1 2-3l.5-2c.2-1 .5-1 1 0l.5 2c.5 2 1 3 2 3s1.5-1.5 2-3c1-3 2-5 2-9 0-1.5-1-3-3-3-1.5 0-2 1-4 1s-2.5-1-4-1z"
              stroke={colors.blue}
              strokeWidth="1.4"
            />
          </svg>
        </div>
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: -0.4,
            color: colors.white,
          }}
        >
          {name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: 22,
              fontWeight: 500,
              color: highlighted ? colors.blue : colors.white,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {rating.toFixed(1).replace(".", ",")}
          </span>
          <Stars
            value={rating}
            size={20}
            gap={3}
            color={highlighted ? colors.blue : colors.grey}
            dimColor="rgba(255,255,255,0.06)"
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.grey,
            }}
          >
            ({reviews} avis)
          </span>
        </div>
        {recent && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              color: colors.grey,
              marginTop: 2,
              letterSpacing: 0.2,
            }}
          >
            {recent}
          </div>
        )}
      </div>
      {callButton && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            background: colors.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `0 0 ${24 + callGlow * 56}px ${colors.blueGlowStrong}, 0 0 ${48 + callGlow * 80}px ${colors.blueGlow}`,
            transform: `scale(${1 + callGlow * 0.06})`,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 4l3-1 2 4-2 1c1 2 2.5 3.5 4.5 4.5l1-2 4 2-1 3c-1 1-3 1-5 0-3-1.5-6-4.5-7.5-7.5-1-2-1-4 0-5z"
              fill={colors.white}
            />
          </svg>
        </div>
      )}
    </div>
  );
};
