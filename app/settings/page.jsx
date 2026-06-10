"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { uid, fmtDate } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Btn, Eyebrow, Serif, Field } from "@/components/ui/primitives";
import DropMenu from "@/components/ui/DropMenu";
import Modal from "@/components/ui/Modal";

export default function SettingsPage() {
  const { trip, setTrip, resetTrip } = useTrip();
  const [newCity, setNewCity] = useState({ name: "", startDate: "", endDate: "" });
  const [newTraveler, setNewTraveler] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);

  const addCity = () => {
    if (!newCity.name) return;
    setTrip((t) => ({ ...t, cities: [...t.cities, { ...newCity, id: uid() }] }));
    setNewCity({ name: "", startDate: "", endDate: "" });
  };
  const addTraveler = () => {
    if (!newTraveler.trim()) return;
    setTrip((t) => ({ ...t, travelers: [...t.travelers, { id: uid(), name: newTraveler.trim() }] }));
    setNewTraveler("");
  };
  const removeCity = (id) => setTrip((t) => ({ ...t, cities: t.cities.filter((c) => c.id !== id) }));
  const removeTraveler = (id) => setTrip((t) => ({ ...t, travelers: t.travelers.filter((tv) => tv.id !== id) }));

  return (
    <div className="page-enter">
      <div style={{ margin: "34px 0 26px" }}>
        <Eyebrow style={{ marginBottom: 8 }}>The details</Eyebrow>
        <Serif size={32}>Trip Settings</Serif>
      </div>

      <Eyebrow style={{ marginBottom: 12 }}>Trip name</Eyebrow>
      <Surface style={{ marginBottom: 30, padding: 22 }}>
        <input
          value={trip.name}
          onChange={(e) => setTrip((t) => ({ ...t, name: e.target.value }))}
          style={{ fontFamily: serif, fontSize: 20, border: "none", padding: 0, background: "transparent" }}
        />
      </Surface>

      <Eyebrow style={{ marginBottom: 12 }}>Destinations</Eyebrow>
      <Surface style={{ marginBottom: 30, padding: 0, overflow: "visible" }}>
        {trip.cities.map((c) => (
          <div key={c.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 22px", borderBottom: `1px solid ${T.hairline}`,
          }}>
            <div>
              <div style={{ fontFamily: serif, fontSize: 17, fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                {fmtDate(c.startDate)} — {fmtDate(c.endDate)}
              </div>
            </div>
            <DropMenu items={[
              { label: "Remove", icon: <Trash2 size={14} strokeWidth={1.5} />, onClick: () => removeCity(c.id), danger: true },
            ]} />
          </div>
        ))}
        <div style={{ padding: 22 }}>
          <Field label="City">
            <input value={newCity.name} onChange={(e) => setNewCity((n) => ({ ...n, name: e.target.value }))} placeholder="Santorini" />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Arrival">
              <input type="date" value={newCity.startDate} onChange={(e) => setNewCity((n) => ({ ...n, startDate: e.target.value }))} />
            </Field>
            <Field label="Departure">
              <input type="date" value={newCity.endDate} onChange={(e) => setNewCity((n) => ({ ...n, endDate: e.target.value }))} />
            </Field>
          </div>
          <Btn variant="secondary" small onClick={addCity}><Plus size={13} /> Add city</Btn>
        </div>
      </Surface>

      <Eyebrow style={{ marginBottom: 12 }}>Travelers</Eyebrow>
      <Surface style={{ padding: 0, overflow: "visible" }}>
        {trip.travelers.map((t) => (
          <div key={t.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 22px", borderBottom: `1px solid ${T.hairline}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", background: T.panelDeep,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: serif, fontSize: 17, fontWeight: 500, color: T.accent,
              }}>{t.name[0]}</div>
              <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 500 }}>{t.name}</span>
            </div>
            <DropMenu items={[
              { label: "Remove", icon: <Trash2 size={14} strokeWidth={1.5} />, onClick: () => removeTraveler(t.id), danger: true },
            ]} />
          </div>
        ))}
        <div style={{ padding: 22, display: "flex", gap: 10 }}>
          <input
            value={newTraveler}
            onChange={(e) => setNewTraveler(e.target.value)}
            placeholder="Traveler name"
            onKeyDown={(e) => e.key === "Enter" && addTraveler()}
          />
          <Btn variant="secondary" onClick={addTraveler} style={{ flexShrink: 0 }}>
            <Plus size={14} /> Add
          </Btn>
        </div>
      </Surface>

      <Eyebrow style={{ margin: "38px 0 12px" }}>Start fresh</Eyebrow>
      <Surface style={{ padding: 22 }}>
        <p style={{ fontSize: 13.5, color: T.muted, lineHeight: 1.5, marginBottom: 18 }}>
          Delete this trip and clear everything — closet, looks, itinerary, suitcase, and packing progress.
          Natalia and Orang stay as travelers.
        </p>
        <Btn
          variant="ghost"
          small
          onClick={() => setConfirmReset(true)}
          style={{ color: T.danger, border: `1px solid ${T.danger}`, padding: "10px 18px" }}
        >
          <Trash2 size={13} strokeWidth={1.5} /> Delete this trip
        </Btn>
      </Surface>

      {confirmReset && (
        <Modal title="Delete this trip?" onClose={() => setConfirmReset(false)}>
          <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.55, marginBottom: 24 }}>
            This clears <strong style={{ color: T.text }}>{trip.name}</strong> and all its data.
            It cannot be undone.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="secondary" onClick={() => setConfirmReset(false)} style={{ flex: 1 }}>
              Cancel
            </Btn>
            <Btn
              onClick={() => { resetTrip(); setConfirmReset(false); }}
              style={{ flex: 1, background: T.danger }}
            >
              Delete everything
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
