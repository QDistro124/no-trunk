"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { fmtDate } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Eyebrow, Serif } from "@/components/ui/primitives";
import { SegmentControl } from "@/components/ui/controls";
import Modal from "@/components/ui/Modal";
import OutfitCard from "@/components/OutfitCard";
import OutfitForm from "@/components/forms/OutfitForm";

export default function LooksPage() {
  const { trip, itinerary, setItinerary, closet, travelers } = useTrip();
  const [modal, setModal] = useState(null);
  const [scope, setScope] = useState("all");

  const scoped = itinerary.filter((i) => scope === "all" || i.travelerId === scope);
  const looks = scoped.filter((i) => i.outfit?.name);
  const unstyled = scoped.filter((i) => !i.outfit?.name);

  const saveOutfit = (form) => {
    setItinerary((prev) => prev.map((i) => (i.id === modal.item.id ? { ...i, outfit: form } : i)));
    setModal(null);
  };

  return (
    <div className="page-enter">
      <div style={{ margin: "34px 0 20px" }}>
        <Eyebrow style={{ marginBottom: 8 }}>The wardrobe plan</Eyebrow>
        <Serif size={32}>Looks</Serif>
        <p style={{ fontSize: 13.5, color: T.muted, marginTop: 8, lineHeight: 1.5 }}>
          Every look, styled from your closet before you leave.
        </p>
      </div>

      {travelers.length > 1 && (
        <div style={{ marginBottom: 22 }}>
          <SegmentControl
            options={[{ id: "all", name: "Everyone" }, ...travelers]}
            value={scope}
            onChange={setScope}
          />
        </div>
      )}

      {/* Coverage strip */}
      <Surface tone="panel" style={{
        padding: "18px 22px", marginBottom: 26,
        display: "flex", gap: 24, alignItems: "baseline", flexWrap: "wrap",
      }}>
        {[
          [scoped.length, "Activities"],
          [looks.length, "Styled"],
          [unstyled.length, "Missing"],
        ].map(([v, l]) => (
          <div key={l}>
            <span style={{ fontFamily: serif, fontSize: 26, fontWeight: 500 }}>{v}</span>
            <span style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginLeft: 7 }}>{l}</span>
          </div>
        ))}
      </Surface>

      {unstyled.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <Eyebrow style={{ marginBottom: 14 }}>Still to style</Eyebrow>
          {unstyled.map((item) => (
            <Surface key={item.id} hover onClick={() => setModal({ item })} style={{ marginBottom: 10, padding: "18px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>
                    {fmtDate(item.date)} · {trip.cities.find((c) => c.id === item.cityId)?.name} · {item.timeOfDay}
                  </div>
                  <Serif size={17}>{item.activity}</Serif>
                </div>
                <Sparkles size={16} strokeWidth={1.3} color={T.accent} />
              </div>
            </Surface>
          ))}
        </div>
      )}

      {looks.map((item) => (
        <OutfitCard
          key={item.id}
          item={item}
          city={trip.cities.find((c) => c.id === item.cityId)}
          traveler={travelers.find((t) => t.id === item.travelerId)}
          closet={closet}
          onEdit={() => setModal({ item })}
          tall
        />
      ))}

      {modal && (
        <Modal title="Style this look" onClose={() => setModal(null)}>
          <OutfitForm
            outfit={modal.item.outfit}
            closet={closet}
            ownerId={modal.item.travelerId}
            onSave={saveOutfit}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  );
}
