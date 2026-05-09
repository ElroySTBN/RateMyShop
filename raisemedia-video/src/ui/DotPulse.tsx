import { colors } from "../theme";

type Props = {
  size?: number;
  pulseProgress?: number; // 0..1, ring expansion
  glow?: number; // 0..1
  ring?: boolean;
};

export const DotPulse: React.FC<Props> = ({
  size = 12,
  pulseProgress = 0,
  glow = 1,
  ring = false,
}) => {
  const ringScale = 1 + pulseProgress * 12;
  const ringOpacity = (1 - pulseProgress) * 0.6;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ring && (
        <>
          <div
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: 999,
              border: `1px solid ${colors.blue}`,
              opacity: ringOpacity,
              transform: `scale(${ringScale})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: 999,
              border: `1px solid ${colors.blue}`,
              opacity: ringOpacity * 0.5,
              transform: `scale(${ringScale * 1.4})`,
            }}
          />
        </>
      )}
      <div
        style={{
          width: size * 0.5,
          height: size * 0.5,
          borderRadius: 999,
          background: colors.blue,
          boxShadow: `0 0 ${36 * glow}px ${colors.blueGlow}`,
        }}
      />
    </div>
  );
};
