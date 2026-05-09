import { colors } from "../theme";
import { fonts } from "../fonts";

type Signal = { label: string; angleDeg: number };

type Props = {
  signals?: Signal[];
  radius?: number;
  rotation?: number; // degrees, drives orbit rotation
  appear?: number; // 0..1 mass appearance
};

export const OrbitalSignals: React.FC<Props> = ({
  signals = [
    { label: "avis", angleDeg: -90 },
    { label: "photos", angleDeg: -210 },
    { label: "maps", angleDeg: -30 },
    { label: "concurrence", angleDeg: 90 },
  ],
  radius = 380,
  rotation = 0,
  appear = 1,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* orbit ring */}
      <div
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: 999,
          border: `1px dashed ${colors.blue}`,
          opacity: 0.25 * appear,
        }}
      />
      {signals.map((s, i) => {
        const angle = ((s.angleDeg + rotation) * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={s.label}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: `translate(-50%, -50%)`,
              opacity: appear,
              display: "flex",
              alignItems: "center",
              gap: 8,
              transitionDelay: `${i * 30}ms`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: colors.blue,
                boxShadow: `0 0 12px ${colors.blueGlow}`,
              }}
            />
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                letterSpacing: 3,
                color: colors.grey,
                textTransform: "lowercase",
              }}
            >
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
