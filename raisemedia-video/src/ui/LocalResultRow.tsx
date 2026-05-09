import { colors } from "../theme";
import { Stars } from "./Stars";

type Props = {
  highlighted?: boolean;
  dim?: boolean;
  rating?: number;
  width?: number;
  withDot?: boolean;
};

export const LocalResultRow: React.FC<Props> = ({
  highlighted = false,
  dim = false,
  rating = 4.5,
  width = 760,
  withDot = true,
}) => {
  const baseOpacity = dim ? 0.35 : 1;
  const border = highlighted
    ? `1px solid ${colors.blue}`
    : `1px solid ${dim ? colors.greySoft : "rgba(245,245,247,0.08)"}`;

  return (
    <div
      style={{
        width,
        height: 96,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 22px",
        borderRadius: 16,
        border,
        background: highlighted ? "rgba(50,161,237,0.06)" : "rgba(255,255,255,0.015)",
        opacity: baseOpacity,
        boxShadow: highlighted
          ? `0 0 32px ${colors.blueGlowSoft}, inset 0 0 0 1px ${colors.blue}`
          : "none",
      }}
    >
      {/* tooth-like icon placeholder */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          border: `1px solid ${highlighted ? colors.blue : colors.greySoft}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 4c-2 0-3 1.5-3 3 0 4 1 6 2 9 .5 1.5 1 3 2 3s1.5-1 2-3l.5-2c.2-1 .5-1 1 0l.5 2c.5 2 1 3 2 3s1.5-1.5 2-3c1-3 2-5 2-9 0-1.5-1-3-3-3-1.5 0-2 1-4 1s-2.5-1-4-1z"
            stroke={highlighted ? colors.blue : colors.grey}
            strokeWidth="1.4"
          />
        </svg>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          style={{
            height: 12,
            background: highlighted ? colors.blue : colors.greySoft,
            opacity: highlighted ? 0.9 : 0.6,
            borderRadius: 4,
            width: "70%",
          }}
        />
        <Stars
          value={rating}
          size={18}
          gap={3}
          color={highlighted ? colors.blue : colors.grey}
          dimColor={highlighted ? "rgba(50,161,237,0.18)" : "rgba(255,255,255,0.05)"}
        />
      </div>
      {withDot && (
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            border: `1px solid ${highlighted ? colors.blue : colors.greySoft}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 32">
            <path
              d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
              fill={highlighted ? colors.blue : colors.grey}
            />
          </svg>
        </div>
      )}
    </div>
  );
};
