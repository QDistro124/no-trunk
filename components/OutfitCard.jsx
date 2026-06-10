"use client";

import { useState } from "react";
import { Pencil, Shirt, Check, AlertCircle } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { fmtDate } from "@/lib/helpers";
import { Capsule, Eyebrow, Serif, Divider, TimeIcon } from "./ui/primitives";
import PieceThumb from "./ui/PieceThumb";

/* Editorial outfit card — the hero component.
   Pieces are resolved from the closet by id.
   showPackState renders per-piece packed checkmarks (Trip Mode). */
export default function OutfitCard({
  item, city, traveler, closet,
  packedPieces, onEdit, tall = false, showPackState = false,
}) {
  const o = item.outfit;
  const [h, setH] = useState(false);
  const pieces = (o.itemIds || []).map((id) => closet.find((p) => p.id === id)).filter(Boolean);

  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 24, overflow: "hidden", marginBottom: 18,
        background: T.card, border: `1px solid ${T.border}`,
        boxShadow: h ? "0 20px 50px rgba(34,31,27,0.13)" : "0 4px 16px rgba(34,31,27,0.05)",
        transform: h ? "translateY(-4px)" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Image, or an editorial collage of the pieces when no full-look photo */}
      <div style={{ position: "relative", height: tall ? 280 : (o.photo ? 230 : 0), overflow: "hidden" }}>
        {o.photo ? (
          <img src={o.photo} alt={o.name} style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: h ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }} />
        ) : tall ? (
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(150deg, ${T.panel} 0%, ${T.panelDeep} 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 10, flexWrap: "wrap", padding: 28,
          }}>
            {pieces.slice(0, 5).map((p) => <PieceThumb key={p.id} piece={p} size={72} radius={18} />)}
            {pieces.length === 0 && <Shirt size={28} strokeWidth={1} color="rgba(34,31,27,0.3)" />}
          </div>
        ) : null}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <Capsule dark><TimeIcon time={item.timeOfDay} size={11} />{item.timeOfDay}</Capsule>
        </div>
        {onEdit && (
          <button onClick={onEdit} style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(251,249,246,0.92)", backdropFilter: "blur(10px)",
            border: "none", borderRadius: 100, padding: 8, display: "flex", color: T.text,
            opacity: h ? 1 : 0, transition: "opacity 0.3s",
          }}><Pencil size={13} strokeWidth={1.5} /></button>
        )}
      </div>

      {/* Editorial caption */}
      <div style={{ padding: "20px 22px 22px" }}>
        <Eyebrow style={{ marginBottom: 6 }}>{fmtDate(item.date)}{city ? ` — ${city.name}` : ""}</Eyebrow>
        <Serif size={24} style={{ marginBottom: 3 }}>{o.name}</Serif>
        <div style={{ fontSize: 13, color: T.muted, marginBottom: 16 }}>{item.activity}</div>
        <Divider style={{ marginBottom: 6 }} />

        {pieces.map((p, idx) => {
          const isPacked = packedPieces?.has(p.id);
          return (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
              borderBottom: idx < pieces.length - 1 ? `1px solid ${T.hairline}` : "none",
            }}>
              <PieceThumb piece={p} size={40} radius={11} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: T.faintText, marginTop: 1 }}>
                  {p.category}{p.color ? ` · ${p.color}` : ""}
                </div>
              </div>
              {showPackState && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: 10.5, fontWeight: 500, letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: isPacked ? T.muted : T.danger,
                }}>
                  {isPacked
                    ? <><Check size={11} strokeWidth={2.5} /> Packed</>
                    : <><AlertCircle size={11} strokeWidth={2} /> Not packed</>}
                </span>
              )}
            </div>
          );
        })}
        {pieces.length === 0 && (
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: T.faintText, padding: "12px 0" }}>
            No pieces selected yet
          </div>
        )}

        {o.notes && (
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: T.muted, marginTop: 12 }}>
            {o.notes}
          </div>
        )}
        {traveler && <div style={{ marginTop: 14 }}><Capsule>{traveler.name}</Capsule></div>}
      </div>
    </div>
  );
}
