"use client";

import { useState } from "react";
import { ACTIVITY_TYPES, TIME_OF_DAY } from "@/lib/constants";
import { Btn, Field } from "@/components/ui/primitives";
import { SegmentControl } from "@/components/ui/controls";

export default function ItineraryForm({ item, cities, travelers, onSave, onClose, mode = "add" }) {
  const isAdd = mode === "add";
  const defaultTraveler = isAdd && travelers.length > 1 ? "both" : travelers[0]?.id || "";

  const [form, setForm] = useState(() => {
    if (item) {
      return {
        ...item,
        travelerSelection: item.travelerSelection || item.travelerId || travelers[0]?.id || "",
      };
    }
    return {
      date: "", cityId: cities[0]?.id || "", timeOfDay: "Daytime",
      activity: "", type: "Sightseeing", notes: "", travelerSelection: defaultTraveler,
    };
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const travelerOptions = isAdd && travelers.length > 1
    ? [...travelers, { id: "both", name: "Both" }]
    : travelers;

  const handleSave = () => {
    const { travelerSelection, ...rest } = form;
    const travelerIds = travelerSelection === "both"
      ? travelers.map((t) => t.id)
      : [travelerSelection];
    onSave({ ...rest, travelerIds });
  };

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
      {travelers.length > 0 && (
        <Field label={isAdd ? "Who's going" : "Traveler"}>
          {travelerOptions.length > 1 ? (
            <SegmentControl
              options={travelerOptions}
              value={form.travelerSelection}
              onChange={(id) => set("travelerSelection", id)}
            />
          ) : (
            <div style={{ fontSize: 13.5, color: "#7A736A" }}>{travelers[0]?.name}</div>
          )}
        </Field>
      )}
      <Field label="Notes">
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Btn onClick={handleSave} style={{ flex: 1 }}>
          {isAdd && form.travelerSelection === "both" ? "Save for both" : "Save"}
        </Btn>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      </div>
    </div>
  );
}
