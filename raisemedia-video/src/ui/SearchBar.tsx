import { colors } from "../theme";
import { fonts } from "../fonts";
import { Cursor } from "./Cursor";

type Props = {
  width?: number;
  drawProgress?: number; // 0..1 — SVG draw progress
  query?: string;
  charsTyped?: number;
  showCursor?: boolean;
  frame?: number;
  voiceIcon?: boolean;
};

export const SearchBar: React.FC<Props> = ({
  width = 720,
  drawProgress = 1,
  query = "",
  charsTyped = 0,
  showCursor = false,
  frame = 0,
  voiceIcon = false,
}) => {
  const height = 92;
  const pad = 28;
  const r = height / 2;

  // Path length (approx) for the rounded-rect outline
  const totalLen = (width - height) * 2 + Math.PI * height;
  const dash = totalLen;
  const offset = totalLen * (1 - drawProgress);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          position: "absolute",
          inset: 0,
          filter: `drop-shadow(0 0 24px ${colors.blueGlow})`,
        }}
      >
        <rect
          x={1}
          y={1}
          width={width - 2}
          height={height - 2}
          rx={r}
          fill="none"
          stroke={colors.blue}
          strokeWidth={1.5}
          strokeDasharray={dash}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        style={{
          position: "relative",
          paddingLeft: pad + 4,
          paddingRight: pad,
          display: "flex",
          alignItems: "center",
          gap: 16,
          width: "100%",
          opacity: drawProgress > 0.7 ? 1 : 0,
        }}
      >
        <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke={colors.grey} strokeWidth="1.6" />
          <path d="M17 17l4 4" stroke={colors.grey} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            fontWeight: 400,
            color: colors.white,
            letterSpacing: -0.3,
            flex: 1,
          }}
        >
          {query.slice(0, charsTyped)}
          {showCursor && <Cursor frame={frame} height={32} />}
        </span>
        {voiceIcon && (
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
            <rect x="9" y="3" width="6" height="11" rx="3" fill={colors.blue} />
            <path
              d="M5 11a7 7 0 0014 0M12 18v3"
              stroke={colors.blue}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
