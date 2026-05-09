import { colors } from "../theme";

type Props = {
  frame: number;
  color?: string;
  height?: number;
};

export const Cursor: React.FC<Props> = ({ frame, color = colors.blue, height = 28 }) => {
  const visible = Math.floor(frame / 12) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: 2,
        height,
        background: color,
        verticalAlign: "middle",
        opacity: visible ? 1 : 0,
        boxShadow: `0 0 8px ${color}`,
      }}
    />
  );
};
