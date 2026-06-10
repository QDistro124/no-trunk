"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin, ArrowRight, AlertCircle } from "lucide-react";
import { T, serif, DEFAULT_COVER } from "@/lib/theme";
import { fmtDate, tripDates, pieceUsage } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Eyebrow, Serif } from "@/components/ui/primitives";
import { ProgressLine } from "@/components/ui/controls";
import PieceThumb from "@/components/ui/PieceThumb";
import OutfitCard from "@/components/OutfitCard";

export default function DashboardPage() {
  const router = useRouter();
  const fileRef = useRef();
  const { trip, setTrip, itinerary, closet, packedPieceIds, essentials, travelers } = useTrip();

  const styled = itinerary.filter((i) => i.outfit?.name);
  const unstyled = itinerary.filter((i) => !i.outfit?.name);
  const days = tripDates(trip).length;
  const firstDate = trip.cities[0]?.startDate;
  const lastDate = trip.cities[trip.cities.length - 1]?.endDate;

  /* Suitcase derived from looks */
  const neededPieceIds = [...new Set(styled.flatMap((i) => i.outfit.itemIds || []))];
  const missingPieces = neededPieceIds
    .filter((id) => !packedPieceIds.has(id))
    .map((id) => closet.find((p) => p.id === id))
    .filter(Boolean);
  const totalToPack = neededPieceIds.length + essentials.length;
  const totalPacked =
    neededPieceIds.filter((id) => packedPieceIds.has(id)).length +
    essentials.filter((e) => e.packed).length;

  /* Smart reuse */
  const usage = pieceUsage(itinerary);
  const mostUsed = Object.entries(usage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, n]) => ({ piece: closet.find((p) => p.id === id), n }))
    .filter((x) => x.piece);

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTrip((t) => ({ ...t, coverPhoto: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="page-enter">
      {/* ── Hero cover ── */}
      <div style={{ position: "relative", height: 310, borderRadius: "0 0 28px 28px", overflow: "hidden", margin: "0 -18px" }}>
        {trip.coverPhoto ? (
          <img src={trip.coverPhoto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: DEFAULT_COVER }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(34,31,27,0.05) 30%, rgba(34,31,27,0.55) 100%)" }} />
        <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={handleCover} />
        <button onClick={() => fileRef.current.click()} style={{
          position: "absolute", top: 18, right: 18, background: "rgba(251,249,246,0.85)",
          backdropFilter: "blur(10px)", border: "none", borderRadius: 100,
          padding: "8px 10px", display: "flex", color: T.text,
        }}>
          <Camera size={14} strokeWidth={1.5} />
        </button>
        <div style={{ position: "absolute", left: 26, right: 26, bottom: 28 }}>
          <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(251,249,246,0.8)", fontWeight: 500, marginBottom: 10 }}>
            {fmtDate(firstDate)} — {fmtDate(lastDate)} · {days} days
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 38, fontWeight: 500, letterSpacing: "-0.015em", lineHeight: 1.05, color: "#FBF9F6" }}>
            {trip.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, color: "rgba(251,249,246,0.85)", fontSize: 13 }}>
            <MapPin size={13} strokeWidth={1.5} />
            {trip.cities.map((c) => c.name).join("  ·  ")}
          </div>
        </div>
      </div>

      {/* ── Outfit coverage — the planning KPI ── */}
      <Surface tone="panel" style={{ margin: "20px 0 16px", padding: 24 }}>
        <Eyebrow style={{ marginBottom: 16 }}>Styling progress</Eyebrow>
        <div style={{ display: "flex", alignItems: "baseline", gap: 22, flexWrap: "wrap" }}>
          {[
            [itinerary.length, "Activities"],
            [styled.length, "Styled"],
            [unstyled.length, "To style"],
          ].map(([v, l]) => (
            <div key={l}>
              <span style={{ fontFamily: serif, fontSize: 32, fontWeight: 500 }}>{v}</span>
              <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginLeft: 8 }}>{l}</span>
            </div>
          ))}
        </div>
        {unstyled.length > 0 && (
          <div
            onClick={() => router.push("/looks")}
            style={{
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
            }}
          >
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14.5, color: T.muted }}>
              {unstyled.length === 1 ? "One moment still needs a look" : `${unstyled.length} moments still need looks`}
            </span>
            <ArrowRight size={15} strokeWidth={1.5} color={T.faintText} />
          </div>
        )}
      </Surface>

      {/* ── Suitcase status with gaps ── */}
      <Surface style={{ marginBottom: 28, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <Eyebrow>The suitcase</Eyebrow>
          <button
            onClick={() => router.push("/suitcase")}
            style={{
              background: "none", border: "none", fontSize: 11, color: T.accent, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4,
            }}
          >
            Open <ArrowRight size={11} />
          </button>
        </div>
        <ProgressLine value={totalPacked} total={totalToPack} />
        {missingPieces.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{
              fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
              color: T.danger, marginBottom: 10, display: "flex", alignItems: "center", gap: 5,
            }}>
              <AlertCircle size={12} strokeWidth={1.8} /> Missing from suitcase
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {missingPieces.slice(0, 4).map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <PieceThumb piece={p} size={30} radius={9} />
                  <span style={{ fontSize: 13.5 }}>{p.name}</span>
                </div>
              ))}
              {missingPieces.length > 4 && (
                <span style={{ fontSize: 12, color: T.faintText, marginLeft: 40 }}>
                  and {missingPieces.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </Surface>

      {/* ── Most used pieces — smart reuse ── */}
      {mostUsed.length > 0 && (
        <>
          <Serif size={22} italic style={{ marginBottom: 14 }}>Hardest working pieces</Serif>
          <Surface tone="panel" style={{ padding: "8px 22px", marginBottom: 28 }}>
            {mostUsed.map(({ piece, n }, idx) => (
              <div key={piece.id} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 0",
                borderBottom: idx < mostUsed.length - 1 ? `1px solid ${T.border}` : "none",
              }}>
                <PieceThumb piece={piece} size={46} radius={13} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 500 }}>{piece.name}</div>
                  <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
                    Worn in {n} {n === 1 ? "look" : "looks"} — pack once
                  </div>
                </div>
                <span style={{ fontFamily: serif, fontSize: 24, color: T.accent }}>{n}×</span>
              </div>
            ))}
          </Surface>
        </>
      )}

      {/* ── Next look ── */}
      {styled.length > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <Serif size={22} italic>Your next look</Serif>
            <button
              onClick={() => router.push("/looks")}
              style={{
                background: "none", border: "none", fontSize: 11, color: T.accent, fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4,
              }}
            >
              All looks <ArrowRight size={11} />
            </button>
          </div>
          <OutfitCard
            item={styled[0]}
            city={trip.cities.find((c) => c.id === styled[0].cityId)}
            traveler={travelers.find((t) => t.id === styled[0].travelerId)}
            closet={closet}
            tall
          />
        </>
      )}
    </div>
  );
}
