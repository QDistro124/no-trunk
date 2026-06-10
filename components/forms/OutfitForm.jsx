"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { CLOSET_CATEGORIES } from "@/lib/constants";
import { Btn, Field } from "@/components/ui/primitives";
import PieceThumb from "@/components/ui/PieceThumb";
import PhotoInput from "@/components/ui/PhotoInput";

/* Outfit builder — looks are composed from closet pieces, not typed */
export default function OutfitForm({ outfit, closet, ownerId, onSave, onClose }) {
  const [form, setForm] = useState(outfit || { name: "", itemIds: [], notes: "", photo: null });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (id) =>
    set("itemIds", form.itemIds.includes(id) ? form.itemIds.filter((i) => i !== id) : [...form.itemIds, id]);

  const ownerCloset = closet.filter((p) => p.ownerId === ownerId);
  const grouped = CLOSET_CATEGORIES
    .map((cat) => [cat, ownerCloset.filter((p) => p.category === cat)])
    .filter(([, ps]) => ps.length);

  return (
    <div>
      <Field label="Look name">
        <input value={form.name} onChange={(e) => set("name", e.target.value)}
          placeholder="Roman Holiday" style={{ fontFamily: serif, fontSize: 17 }} />
      </Field>

      <Field label={`From the closet · ${form.itemIds.length} selected`}>
        {grouped.length === 0 && (
          <div style={{ fontSize: 13, color: T.muted, padding: "14px 0", fontFamily: serif, fontStyle: "italic" }}>
            This traveler&apos;s closet is empty — add pieces in the Closet tab first.
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {grouped.map(([cat, pieces]) => (
            <div key={cat}>
              <div style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: T.faintText, marginBottom: 8,
              }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pieces.map((p) => {
                  const sel = form.itemIds.includes(p.id);
                  return (
                    <button key={p.id} onClick={() => toggle(p.id)} style={{
                      display: "flex", alignItems: "center", gap: 9,
                      padding: "7px 14px 7px 7px", borderRadius: 100,
                      border: `1.5px solid ${sel ? T.ink : T.border}`,
                      background: sel ? T.ink : T.card,
                      color: sel ? "#F6F2EC" : T.text,
                      fontSize: 12.5, fontWeight: 500, transition: "all 0.2s ease",
                    }}>
                      <PieceThumb piece={p} size={28} radius={100} />
                      {p.name}
                      {sel && <Check size={12} strokeWidth={2.5} />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Field>

      <Field label="Photo of the full look">
        <PhotoInput value={form.photo} onChange={(p) => set("photo", p)} label="Add photo" variant="button" />
      </Field>
      <Field label="Styling notes">
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)}
          placeholder="Bring a scarf for church entry" />
      </Field>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <Btn onClick={() => onSave(form)} style={{ flex: 1 }}>Save look</Btn>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
      </div>
    </div>
  );
}
