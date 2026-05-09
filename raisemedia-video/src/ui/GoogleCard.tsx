import { fonts } from "../fonts";
import { colors } from "../theme";
import { Stars } from "./Stars";

type Props = {
  rating: number;
  reviews: number;
  name?: string;
  category?: string;
  address?: string;
};

export const GoogleCard: React.FC<Props> = ({
  rating,
  reviews,
  name = "Cabinet Vandermeulen",
  category = "Cabinet d'avocats · Lyon",
  address = "12 rue de la République · 69002",
}) => {
  return (
    <div
      style={{
        width: 760,
        background: "#FFFFFF",
        color: "#202124",
        borderRadius: 14,
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
        overflow: "hidden",
        fontFamily: fonts.mono,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 18px",
          borderBottom: "1px solid #EDEDED",
          background: "#FAFAFA",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background:
              "conic-gradient(from 90deg, #4285F4, #34A853, #FBBC04, #EA4335, #4285F4)",
          }}
        />
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            border: "1px solid #DADCE0",
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 14,
            color: "#5F6368",
          }}
        >
          {category}
        </div>
      </div>
      <div style={{ padding: "22px 24px 20px 24px" }}>
        <div
          style={{
            fontFamily: fonts.display,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: -0.4,
            color: "#202124",
            lineHeight: 1.05,
          }}
        >
          {name}
        </div>
        <div style={{ marginTop: 6, fontSize: 14, color: "#5F6368" }}>
          {category}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 30,
              fontWeight: 700,
              color: rating < 3.6 ? colors.red : "#1F1F1F",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {rating.toFixed(1).replace(".", ",")}
          </span>
          <Stars value={rating} size={26} gap={4} />
          <span style={{ fontSize: 14, color: "#5F6368" }}>
            ({Math.round(reviews)} avis)
          </span>
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
          <button
            style={{
              padding: "9px 16px",
              background: "#1A73E8",
              color: "#FFF",
              border: "none",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: 0.2,
            }}
          >
            Itinéraire
          </button>
          <button
            style={{
              padding: "9px 16px",
              background: "#FFF",
              color: "#1A73E8",
              border: "1px solid #DADCE0",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: 0.2,
            }}
          >
            Site web
          </button>
          <button
            style={{
              padding: "9px 16px",
              background: "#FFF",
              color: "#5F6368",
              border: "1px solid #DADCE0",
              borderRadius: 999,
              fontSize: 13,
              letterSpacing: 0.2,
            }}
          >
            Appeler
          </button>
        </div>
        <div
          style={{
            marginTop: 18,
            paddingTop: 16,
            borderTop: "1px solid #EDEDED",
            fontSize: 13,
            color: "#5F6368",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{address}</span>
          <span>Ouvert · Ferme à 18h</span>
        </div>
      </div>
    </div>
  );
};
