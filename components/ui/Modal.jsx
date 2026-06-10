"use client";

import { X } from "lucide-react";
import { T } from "@/lib/theme";
import { Serif } from "./primitives";

/* Bottom-sheet modal with grab handle */
export default function Modal({ title, onClose, children }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, background: "rgba(34,31,27,0.45)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000,
      }}
    >
      <div className="modal-panel" style={{
        background: T.bg, borderRadius: "24px 24px 0 0", padding: "28px 26px 36px",
        width: "100%", maxWidth: 480, maxHeight: "92vh", overflowY: "auto",
        boxShadow: "0 -20px 80px rgba(34,31,27,0.3)",
      }}>
        <div style={{ width: 36, height: 4, background: T.border, borderRadius: 2, margin: "0 auto 22px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <Serif size={24}>{title}</Serif>
          <button onClick={onClose} style={{
            background: T.panel, border: "none", color: T.muted,
            padding: 8, borderRadius: 100, display: "flex",
          }}>
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
