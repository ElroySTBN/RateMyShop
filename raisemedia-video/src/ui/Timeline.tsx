import { colors } from "../theme";
import { fonts } from "../fonts";

type Step = { label: string; subtitle?: string };

type Props = {
  width?: number;
  steps?: Step[];
  progress: number; // 0..1 across full timeline
  finalCheck?: boolean;
};

const DEFAULT_STEPS: Step[] = [
  { label: "J+0" },
  { label: "J+15" },
  { label: "J+30", subtitle: "+ visibilité" },
  { label: "J+60" },
  { label: "J+90", subtitle: "garantie" },
];

export const Timeline: React.FC<Props> = ({
  width = 880,
  steps = DEFAULT_STEPS,
  progress,
  finalCheck = false,
}) => {
  const segments = steps.length - 1;
  const lineWidth = width - 80;
  const filled = Math.max(0, Math.min(1, progress)) * lineWidth;

  return (
    <div style={{ width, position: "relative" }}>
      {/* labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 0",
          fontFamily: fonts.mono,
          fontSize: 14,
          letterSpacing: 1.2,
          color: colors.grey,
          marginBottom: 26,
        }}
      >
        {steps.map((s, i) => {
          const stepProgress = progress * segments - i;
          const reached = stepProgress >= 0;
          return (
            <span
              key={s.label}
              style={{
                color: reached ? colors.white : colors.grey,
                opacity: reached ? 1 : 0.7,
                fontWeight: reached ? 500 : 400,
              }}
            >
              {s.label}
            </span>
          );
        })}
      </div>
      {/* line */}
      <div
        style={{
          position: "relative",
          height: 4,
          background: colors.greySoft,
          borderRadius: 2,
          marginLeft: 40,
          marginRight: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: filled,
            background: colors.blue,
            borderRadius: 2,
            boxShadow: `0 0 14px ${colors.blueGlow}`,
          }}
        />
      </div>
      {/* dots */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 36,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {steps.map((s, i) => {
          const stepProgress = progress * segments - i;
          const reached = stepProgress >= 0;
          const isLast = i === steps.length - 1;
          const isLastReached = isLast && reached && finalCheck;
          return (
            <div key={s.label} style={{ position: "relative" }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: reached
                    ? isLastReached
                      ? colors.green
                      : colors.blue
                    : colors.greySoft,
                  border: reached ? "none" : `2px solid ${colors.greySoft}`,
                  marginTop: -7,
                  boxShadow: reached
                    ? isLastReached
                      ? `0 0 24px rgba(50,209,122,0.7)`
                      : `0 0 24px ${colors.blueGlow}`
                    : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLastReached && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-11" stroke={colors.bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {s.subtitle && reached && (
                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    color: isLastReached ? colors.green : colors.blue,
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.subtitle}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
