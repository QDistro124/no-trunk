"use client";

import { serif, swatchFor } from "@/lib/theme";

/* Closet piece thumbnail — photo if available, warm monogram swatch if not */
export default function PieceThumb({ piece, size = 56, radius = 14 }) {
  if (piece.photo) {
    return (
      <img
        src={piece.photo}
        alt={piece.name}
        style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", display: "block", flexShrink: 0 }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, flexShrink: 0,
      background: `linear-gradient(140deg, ${swatchFor(piece.id)}, ${swatchFor(piece.id + "x")})`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontFamily: serif, fontSize: size * 0.34, color: "rgba(34,31,27,0.4)", fontStyle: "italic" }}>
        {piece.name[0]}
      </span>
    </div>
  );
}
