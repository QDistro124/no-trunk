"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { T } from "@/lib/theme";

export default function DropMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        style={{
          background: "transparent", border: "none", color: T.faintText,
          padding: "6px 8px", borderRadius: 100, display: "flex", transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = T.panel; e.currentTarget.style.color = T.text; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.faintText; }}
      >
        <MoreHorizontal size={16} strokeWidth={1.5} />
      </button>
      {open && (
        <div className="expand-in" style={{
          position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 50,
          background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
          boxShadow: "0 16px 40px rgba(34,31,27,0.14)", overflow: "hidden", minWidth: 150,
        }}>
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setOpen(false); item.onClick(); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "12px 16px", border: "none", background: "transparent",
                fontSize: 13, color: item.danger ? T.danger : T.text,
                textAlign: "left", transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = T.panel)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {item.icon}{item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
