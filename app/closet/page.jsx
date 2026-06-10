"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Camera } from "lucide-react";
import { T, serif, swatchFor } from "@/lib/theme";
import { CLOSET_CATEGORIES } from "@/lib/constants";
import { uid, pieceUsage } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Btn, Eyebrow, Serif } from "@/components/ui/primitives";
import { SegmentControl } from "@/components/ui/controls";
import Modal from "@/components/ui/Modal";
import DropMenu from "@/components/ui/DropMenu";
import ClosetItemForm from "@/components/forms/ClosetItemForm";

export default function ClosetPage() {
  const { closet, setCloset, itinerary, travelers } = useTrip();
  const [modal, setModal] = useState(null);
  const [scope, setScope] = useState(travelers[0]?.id || "all");

  const save = (form) => {
    if (modal.type === "add") setCloset((prev) => [...prev, { ...form, id: uid() }]);
    else setCloset((prev) => prev.map((p) => (p.id === modal.piece.id ? { ...p, ...form } : p)));
    setModal(null);
  };
  const remove = (id) => setCloset((prev) => prev.filter((p) => p.id !== id));

  const usage = pieceUsage(itinerary);
  const scoped = closet.filter((p) => scope === "all" || p.ownerId === scope);
  const grouped = CLOSET_CATEGORIES
    .map((cat) => [cat, scoped.filter((p) => p.category === cat)])
    .filter(([, ps]) => ps.length);

  return (
    <div className="page-enter">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "34px 0 20px" }}>
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>The wardrobe</Eyebrow>
          <Serif size={32}>Closet</Serif>
        </div>
        <Btn small onClick={() => setModal({ type: "add" })}>
          <Plus size={13} strokeWidth={2} /> Piece
        </Btn>
      </div>
      <p style={{ fontSize: 13.5, color: T.muted, marginBottom: 20, lineHeight: 1.5 }}>
        Photograph your pieces once — then build every look from them.
      </p>

      <div style={{ marginBottom: 26 }}>
        <SegmentControl
          options={[{ id: "all", name: "Everyone" }, ...travelers]}
          value={scope}
          onChange={setScope}
        />
      </div>

      {grouped.length === 0 && (
        <div
          onClick={() => setModal({ type: "add" })}
          style={{ border: `1.5px dashed ${T.border}`, borderRadius: 20, padding: "48px 24px", textAlign: "center", cursor: "pointer" }}
        >
          <Camera size={24} strokeWidth={1.1} color={T.accent} style={{ marginBottom: 12 }} />
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 17, color: T.muted }}>The closet is empty</div>
          <div style={{ fontSize: 12.5, color: T.faintText, marginTop: 6 }}>Add your first piece to start styling</div>
        </div>
      )}

      {grouped.map(([cat, pieces]) => (
        <div key={cat} style={{ marginBottom: 34 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
            <Serif size={21}>{cat}</Serif>
            <span style={{ fontSize: 11.5, color: T.faintText }}>{pieces.length}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {pieces.map((p) => {
              const owner = travelers.find((t) => t.id === p.ownerId);
              const used = usage[p.id] || 0;
              return (
                <Surface key={p.id} hover style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ position: "relative" }}>
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{
                        height: 130,
                        background: `linear-gradient(140deg, ${swatchFor(p.id)}, ${swatchFor(p.id + "x")})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 30, color: "rgba(34,31,27,0.35)" }}>
                          {p.name[0]}
                        </span>
                      </div>
                    )}
                    {used > 0 && (
                      <span style={{
                        position: "absolute", top: 8, left: 8,
                        background: "rgba(251,249,246,0.92)", backdropFilter: "blur(8px)",
                        borderRadius: 100, padding: "3px 10px", fontSize: 10, fontWeight: 600, color: T.text,
                      }}>
                        {used} {used === 1 ? "look" : "looks"}
                      </span>
                    )}
                    <div style={{ position: "absolute", top: 4, right: 4 }}>
                      <DropMenu items={[
                        { label: "Edit", icon: <Pencil size={14} strokeWidth={1.5} />, onClick: () => setModal({ type: "edit", piece: p }) },
                        { label: "Remove", icon: <Trash2 size={14} strokeWidth={1.5} />, onClick: () => remove(p.id), danger: true },
                      ]} />
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px 14px" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: T.faintText, marginTop: 4 }}>
                      {[p.color, scope === "all" ? owner?.name : null].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                </Surface>
              );
            })}
          </div>
        </div>
      ))}

      {modal?.type === "add" && (
        <Modal title="Add a piece" onClose={() => setModal(null)}>
          <ClosetItemForm travelers={travelers} onSave={save} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === "edit" && (
        <Modal title="Edit piece" onClose={() => setModal(null)}>
          <ClosetItemForm piece={modal.piece} travelers={travelers} onSave={save} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}
