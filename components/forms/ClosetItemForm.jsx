"use client";

import { useState } from "react";
import { serif } from "@/lib/theme";
import { CLOSET_CATEGORIES } from "@/lib/constants";
import { Btn, Field } from "@/components/ui/primitives";
import PhotoInput from "@/components/ui/PhotoInput";

export default function ClosetItemForm({ piece, travelers, onSave, onClose }) {
  const [form, setForm] = useState(
    piece || { name: "", category: "Dresses", color: "", notes: "", photo: null, ownerId: travelers[0]?.id || "" }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <Field label="Photo">
        <PhotoInput value={form.photo} onChange={(p) => set("photo", p)} label="Photograph this piece" />
      </Field>
      <Field label="Name">
        <input value={form.name} onChange={(e) => set("name", e.target.value)}
          placeholder="White linen midi dress" style={{ fontFamily: serif, fontSize: 16 }} />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)}>
            {CLOSET_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Color">
          <input value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="Ivory" />
        </Field>
      </div>
      <Field label="Belongs to">
        <select value={form.ownerId} onChange={(e) => set("ownerId", e.target.value)}>
          {travelers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </Field>
      <Field label="Notes">
        <input value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Dry clean only" />
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Btn onClick={() => form.name && onSave(form)} style={{ flex: 1 }}>Save piece</Btn>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      </div>
    </div>
  );
}
