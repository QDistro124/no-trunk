"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, AlertCircle } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { CLOSET_CATEGORIES, ESSENTIAL_CATEGORIES } from "@/lib/constants";
import { uid, pieceUsage } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Btn, Eyebrow, Serif, Divider } from "@/components/ui/primitives";
import { ProgressLine, PackToggle, SegmentControl } from "@/components/ui/controls";
import Modal from "@/components/ui/Modal";
import DropMenu from "@/components/ui/DropMenu";
import PieceThumb from "@/components/ui/PieceThumb";
import EssentialForm from "@/components/forms/EssentialForm";

export default function SuitcasePage() {
  const {
    itinerary, closet, travelers,
    packedPieceIds, togglePiece,
    essentials, setEssentials,
  } = useTrip();
  const [modal, setModal] = useState(null);
  const [scope, setScope] = useState("all");

  /* The wardrobe section is GENERATED from the looks:
     every referenced piece appears exactly once, however many looks use it. */
  const usage = pieceUsage(itinerary);
  const neededPieces = Object.keys(usage)
    .map((id) => closet.find((p) => p.id === id))
    .filter(Boolean)
    .filter((p) => scope === "all" || p.ownerId === scope);

  const scopedEssentials = essentials.filter((e) => scope === "all" || e.travelerId === scope);

  const toggleEssential = (id) =>
    setEssentials((prev) => prev.map((e) => (e.id === id ? { ...e, packed: !e.packed } : e)));
  const saveEssential = (form) => {
    if (modal.type === "add") setEssentials((prev) => [...prev, { ...form, id: uid() }]);
    else setEssentials((prev) => prev.map((e) => (e.id === modal.item.id ? { ...e, ...form } : e)));
    setModal(null);
  };
  const removeEssential = (id) => setEssentials((prev) => prev.filter((e) => e.id !== id));

  const packedWardrobe = neededPieces.filter((p) => packedPieceIds.has(p.id)).length;
  const packedEss = scopedEssentials.filter((e) => e.packed).length;
  const totalPacked = packedWardrobe + packedEss;
  const totalAll = neededPieces.length + scopedEssentials.length;
  const missing = neededPieces.filter((p) => !packedPieceIds.has(p.id));

  const wardrobeGrouped = CLOSET_CATEGORIES
    .map((cat) => [cat, neededPieces.filter((p) => p.category === cat)])
    .filter(([, ps]) => ps.length);
  const essGrouped = ESSENTIAL_CATEGORIES
    .map((cat) => [cat, scopedEssentials.filter((e) => e.category === cat)])
    .filter(([, es]) => es.length);

  return (
    <div className="page-enter">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", margin: "34px 0 12px" }}>
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>Generated from your looks</Eyebrow>
          <Serif size={32}>Suitcase</Serif>
        </div>
        <Btn small onClick={() => setModal({ type: "add" })}>
          <Plus size={13} strokeWidth={2} /> Essential
        </Btn>
      </div>
      <p style={{ fontSize: 13.5, color: T.muted, marginBottom: 20, lineHeight: 1.5 }}>
        Each piece appears once, no matter how many looks it&apos;s in.
      </p>

      <div style={{ marginBottom: 18 }}>
        <SegmentControl
          options={[{ id: "all", name: "Everyone" }, ...travelers]}
          value={scope}
          onChange={setScope}
        />
      </div>

      <Surface tone="panel" style={{ padding: "22px 24px", marginBottom: 20 }}>
        <ProgressLine value={totalPacked} total={totalAll} />
      </Surface>

      {/* ── Packing gaps ── */}
      {missing.length > 0 && (
        <Surface style={{ padding: "20px 22px", marginBottom: 32, border: "1px solid #D8C4B8" }}>
          <div style={{
            fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.danger, marginBottom: 12, display: "flex", alignItems: "center", gap: 6,
          }}>
            <AlertCircle size={13} strokeWidth={1.8} /> Missing from suitcase · {missing.length}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {missing.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <PieceThumb piece={p} size={34} radius={10} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontSize: 11.5, color: T.faintText, marginLeft: 8 }}>
                    {usage[p.id]} {usage[p.id] === 1 ? "look" : "looks"}
                  </span>
                </div>
                <PackToggle checked={false} onToggle={() => togglePiece(p.id)} />
              </div>
            ))}
          </div>
        </Surface>
      )}

      {/* ── Wardrobe — derived from looks ── */}
      <Eyebrow style={{ marginBottom: 4 }}>Wardrobe — from your looks</Eyebrow>
      <Divider style={{ marginBottom: 8 }} />
      {neededPieces.length === 0 && (
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: T.faintText, padding: "20px 0 30px" }}>
          Style some looks and the wardrobe packs itself.
        </div>
      )}
      {wardrobeGrouped.map(([cat, pieces]) => (
        <div key={cat} style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, margin: "20px 0 4px" }}>
            <Serif size={20}>{cat}</Serif>
            <span style={{ fontSize: 11.5, color: T.faintText }}>
              {pieces.filter((p) => packedPieceIds.has(p.id)).length} of {pieces.length} packed
            </span>
          </div>
          {pieces.map((p, idx) => {
            const owner = travelers.find((t) => t.id === p.ownerId);
            const packed = packedPieceIds.has(p.id);
            return (
              <div key={p.id} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 2px",
                borderBottom: idx < pieces.length - 1 ? `1px solid ${T.hairline}` : "none",
                opacity: packed ? 0.55 : 1, transition: "opacity 0.3s",
              }}>
                <PieceThumb piece={p} size={48} radius={13} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: serif, fontSize: 16.5, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3 }}>
                    {[
                      scope === "all" ? owner?.name : null,
                      `${usage[p.id]} ${usage[p.id] === 1 ? "look" : "looks"}`,
                      p.color,
                    ].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <PackToggle checked={packed} onToggle={() => togglePiece(p.id)} />
              </div>
            );
          })}
        </div>
      ))}

      {/* ── Essentials — manual ── */}
      <Eyebrow style={{ margin: "36px 0 4px" }}>Essentials — added by you</Eyebrow>
      <Divider style={{ marginBottom: 8 }} />
      {essGrouped.map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, margin: "18px 0 2px" }}>
            <Serif size={20}>{cat}</Serif>
            <span style={{ fontSize: 11.5, color: T.faintText }}>
              {items.filter((i) => i.packed).length} of {items.length} packed
            </span>
          </div>
          {items.map((item, idx) => {
            const traveler = travelers.find((t) => t.id === item.travelerId);
            return (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 2px",
                borderBottom: idx < items.length - 1 ? `1px solid ${T.hairline}` : "none",
                opacity: item.packed ? 0.55 : 1, transition: "opacity 0.3s",
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: serif, fontSize: 16.5, fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3 }}>
                    {[
                      scope === "all" ? traveler?.name : null,
                      item.qty > 1 ? `Qty ${item.qty}` : null,
                      item.notes || null,
                    ].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <PackToggle checked={item.packed} onToggle={() => toggleEssential(item.id)} />
                <DropMenu items={[
                  { label: "Edit", icon: <Pencil size={14} strokeWidth={1.5} />, onClick: () => setModal({ type: "edit", item }) },
                  { label: "Remove", icon: <Trash2 size={14} strokeWidth={1.5} />, onClick: () => removeEssential(item.id), danger: true },
                ]} />
              </div>
            );
          })}
        </div>
      ))}

      {modal?.type === "add" && (
        <Modal title="Add an essential" onClose={() => setModal(null)}>
          <EssentialForm travelers={travelers} onSave={saveEssential} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal?.type === "edit" && (
        <Modal title="Edit essential" onClose={() => setModal(null)}>
          <EssentialForm item={modal.item} travelers={travelers} onSave={saveEssential} onClose={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}
