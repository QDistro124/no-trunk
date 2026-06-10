"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, MapPin, Sparkles } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { uid, fmtDateLong, tripDates } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Btn, Capsule, Eyebrow, Serif, TimeIcon } from "@/components/ui/primitives";
import { SegmentControl } from "@/components/ui/controls";
import Modal from "@/components/ui/Modal";
import PieceThumb from "@/components/ui/PieceThumb";
import OutfitCard from "@/components/OutfitCard";
import ItineraryForm from "@/components/forms/ItineraryForm";
import OutfitForm from "@/components/forms/OutfitForm";

export default function DaysPage() {
  const { trip, itinerary, setItinerary, closet, travelers } = useTrip();
  const [modal, setModal] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [scope, setScope] = useState("all");

  const dates = tripDates(trip);
  const scoped = itinerary.filter((i) => scope === "all" || i.travelerId === scope);

  const saveItem = (form) => {
    if (modal.type === "add") setItinerary((prev) => [...prev, { ...form, id: uid(), outfit: null }]);
    else setItinerary((prev) => prev.map((i) => (i.id === modal.item.id ? { ...i, ...form } : i)));
    setModal(null);
  };
  const saveOutfit = (form) => {
    setItinerary((prev) => prev.map((i) => (i.id === modal.item.id ? { ...i, outfit: form } : i)));
    setModal(null);
  };
  const deleteItem = (id) => setItinerary((prev) => prev.filter((i) => i.id !== id));

  return (
    <div className="page-enter">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "34px 0 8px" }}>
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>The journey</Eyebrow>
          <Serif size={32}>Itinerary</Serif>
        </div>
        <Btn small onClick={() => setModal({ type: "add" })}>
          <Plus size={13} strokeWidth={2} /> Add
        </Btn>
      </div>

      {travelers.length > 1 && (
        <div style={{ marginTop: 18, marginBottom: 4 }}>
          <SegmentControl
            options={[{ id: "all", name: "Everyone" }, ...travelers]}
            value={scope}
            onChange={setScope}
          />
        </div>
      )}

      {dates.map((date, dateIdx) => {
        const dayItems = scoped.filter((i) => i.date === date);
        const city = trip.cities.find((c) => date >= c.startDate && date <= c.endDate);
        return (
          <div key={date} style={{ marginTop: 38 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 16 }}>
              <span style={{
                fontFamily: serif, fontSize: 36, fontWeight: 500, lineHeight: 1,
                color: T.panelDeep, WebkitTextStroke: `1px ${T.accent}`,
              }}>
                {String(dateIdx + 1).padStart(2, "0")}
              </span>
              <div>
                <Serif size={19}>{fmtDateLong(date)}</Serif>
                {city && (
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={11} strokeWidth={1.5} />{city.name}
                  </div>
                )}
              </div>
            </div>

            {dayItems.length === 0 && (
              <div
                onClick={() => setModal({ type: "add", presetDate: date })}
                style={{
                  border: `1.5px dashed ${T.border}`, borderRadius: 18, padding: 22,
                  color: T.faintText, textAlign: "center", cursor: "pointer",
                  fontFamily: serif, fontStyle: "italic", fontSize: 15,
                }}
              >
                An open day — add something beautiful
              </div>
            )}

            {dayItems.map((item) => {
              const traveler = travelers.find((t) => t.id === item.travelerId);
              const expanded = expandedId === item.id;
              const pieces = item.outfit
                ? (item.outfit.itemIds || []).map((id) => closet.find((p) => p.id === id)).filter(Boolean)
                : [];
              return (
                <Surface key={item.id} hover style={{ marginBottom: 12, overflow: "visible" }}>
                  <div
                    onClick={() => setExpandedId(expanded ? null : item.id)}
                    style={{ cursor: "pointer", padding: "18px 22px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 9 }}>
                          <Capsule><TimeIcon time={item.timeOfDay} size={10} />{item.timeOfDay}</Capsule>
                          <Capsule>{item.type}</Capsule>
                          {traveler && <Capsule>{traveler.name}</Capsule>}
                        </div>
                        <Serif size={18}>{item.activity}</Serif>
                        {item.outfit?.name && (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                            <div style={{ display: "flex" }}>
                              {pieces.slice(0, 4).map((p, i) => (
                                <div key={p.id} style={{ marginLeft: i === 0 ? 0 : -8, border: `2px solid ${T.card}`, borderRadius: 100 }}>
                                  <PieceThumb piece={p} size={26} radius={100} />
                                </div>
                              ))}
                            </div>
                            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: T.accent }}>
                              {item.outfit.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <span style={{ color: T.faintText, flexShrink: 0 }}>
                        {expanded ? <ChevronUp size={16} strokeWidth={1.5} /> : <ChevronDown size={16} strokeWidth={1.5} />}
                      </span>
                    </div>
                  </div>
                  {expanded && (
                    <div className="expand-in" style={{ padding: "0 22px 20px" }}>
                      {item.notes && (
                        <p style={{ fontSize: 13.5, color: T.muted, marginBottom: 16, lineHeight: 1.5 }}>{item.notes}</p>
                      )}
                      {item.outfit ? (
                        <OutfitCard item={item} closet={closet} onEdit={() => setModal({ type: "outfit", item })} />
                      ) : (
                        <div
                          onClick={() => setModal({ type: "outfit", item })}
                          style={{
                            background: `linear-gradient(150deg, ${T.panel}, ${T.panelDeep})`,
                            borderRadius: 18, padding: "26px 22px", marginBottom: 14, cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 16,
                          }}
                        >
                          <div style={{
                            width: 44, height: 44, borderRadius: 100, background: "rgba(251,249,246,0.7)",
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          }}>
                            <Sparkles size={18} strokeWidth={1.3} color={T.accent} />
                          </div>
                          <div>
                            <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 500 }}>Style this moment</div>
                            <div style={{ fontSize: 12.5, color: T.muted, marginTop: 2 }}>Build a look from the closet</div>
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 8 }}>
                        <Btn variant="ghost" small onClick={() => setModal({ type: "edit", item })}>
                          <Pencil size={13} strokeWidth={1.5} /> Edit
                        </Btn>
                        <Btn variant="ghost" small onClick={() => deleteItem(item.id)}>
                          <Trash2 size={13} strokeWidth={1.5} /> Remove
                        </Btn>
                      </div>
                    </div>
                  )}
                </Surface>
              );
            })}
          </div>
        );
      })}

      {modal?.type === "add" && (
        <Modal title="Add to itinerary" onClose={() => setModal(null)}>
          <ItineraryForm
            item={modal.presetDate ? {
              date: modal.presetDate, cityId: trip.cities[0]?.id, timeOfDay: "Daytime",
              activity: "", type: "Sightseeing", notes: "",
              travelerId: scope === "all" ? travelers[0]?.id : scope,
            } : null}
            cities={trip.cities}
            travelers={travelers}
            onSave={saveItem}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
      {modal?.type === "edit" && (
        <Modal title="Edit activity" onClose={() => setModal(null)}>
          <ItineraryForm item={modal.item} cities={trip.cities} travelers={travelers} onSave={saveItem} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === "outfit" && (
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
