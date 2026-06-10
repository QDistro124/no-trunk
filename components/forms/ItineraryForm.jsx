"use client";

import { useState } from "react";
import { ACTIVITY_TYPES, TIME_OF_DAY } from "@/lib/constants";
import { Btn, Field } from "@/components/ui/primitives";

export default function ItineraryForm({ item, cities, travelers, onSave, onClose }) {
  const [form, setForm] = useState(item || {
    date: "", cityId: cities[0]?.id || "", timeOfDay: "Daytime",
    activity: "", type: "Sightseeing", notes: "", travelerId: travelers[0]?.id || "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Date">
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </Field>
        <Field label="City">
          <select value={form.cityId} onChange={(e) => set("cityId", e.target.value)}>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Time of Day">
          <select value={form.timeOfDay} onChange={(e) => set("timeOfDay", e.target.value)}>
            {TIME_OF_DAY.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Type">
          <select value={form.type} onChange={(e) => set("type", e.target.value)}>
            {ACTIVITY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Activity">
        <input value={form.activity} onChange={(e) => set("activity", e.target.value)} placeholder="What are you doing?" />
      </Field>
      <Field label="Traveler">
        <select value={form.travelerId} onChange={(e) => set("travelerId", e.target.value)}>
          {travelers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </Field>
      <Field label="Notes">
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Btn onClick={() => onSave(form)} style={{ flex: 1 }}>Save</Btn>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      </div>
    </div>
  );
}
