"use client";

import { useState } from "react";
import { ESSENTIAL_CATEGORIES } from "@/lib/constants";
import { Btn, Field } from "@/components/ui/primitives";

export default function EssentialForm({ item, travelers, onSave, onClose }) {
  const [form, setForm] = useState(item || {
    name: "", qty: 1, category: "Toiletries",
    travelerId: travelers[0]?.id || "", notes: "", packed: false,
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <Field label="Item">
        <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="SPF 50 sunscreen" />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Quantity">
          <input type="number" min={1} value={form.qty} onChange={(e) => set("qty", +e.target.value)} />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)}>
            {ESSENTIAL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Traveler">
        <select value={form.travelerId} onChange={(e) => set("travelerId", e.target.value)}>
          {travelers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </Field>
      <Field label="Notes">
        <input value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Btn onClick={() => onSave(form)} style={{ flex: 1 }}>Save</Btn>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      </div>
    </div>
  );
}
