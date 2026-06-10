"use client";

import { Check } from "lucide-react";
import { T, serif } from "@/lib/theme";

export function ProgressLine({ value, total, showLabel = true }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      {showLabel && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: T.muted }}>{value} of {total} packed</span>
          <span style={{ fontFamily: serif, fontSize: 26, fontWeight: 500 }}>
            {pct}<span style={{ fontSize: 16, color: T.muted }}>%</span>
          </span>
        </div>
      )}
      <div style={{ background: T.panelDeep, borderRadius: 2, height: 3, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, background: T.ink, height: "100%",
          transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
    </div>
  );
}

export function PackToggle({ checked, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      border: `1px solid ${checked ? T.ink : T.border}`,
      background: checked ? T.ink : "transparent",
      color: checked ? "#F6F2EC" : T.faintText,
      borderRadius: 100, padding: "5px 13px", fontSize: 10.5, fontWeight: 500,
      letterSpacing: "0.06em", textTransform: "uppercase",
      display: "inline-flex", alignItems: "center", gap: 5,
      transition: "all 0.25s ease", flexShrink: 0,
    }}>
      {checked && <Check size={11} strokeWidth={2.5} />}
      {checked ? "Packed" : "Pack"}
    </button>
  );
}

export function SegmentControl({ options, value, onChange }) {
  return (
    <div style={{ display: "inline-flex", background: T.panel, borderRadius: 100, padding: 4, gap: 2, flexWrap: "wrap" }}>
      {options.map((o) => (
        <button key={o.id} onClick={() => onChange(o.id)} style={{
          padding: "8px 18px", borderRadius: 100, fontSize: 12.5, fontWeight: 500,
          border: "none", transition: "all 0.3s ease",
          background: value === o.id ? T.card : "transparent",
          color: value === o.id ? T.text : T.muted,
          boxShadow: value === o.id ? "0 2px 8px rgba(34,31,27,0.08)" : "none",
        }}>{o.name}</button>
      ))}
    </div>
  );
}
