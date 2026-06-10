"use client";

import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { T } from "@/lib/theme";
import { Btn } from "./primitives";

/* Reusable image upload with local preview (base64).
   variant="drop" renders a large dashed drop area; "button" a compact button. */
export default function PhotoInput({ value, onChange, label = "Add photo", variant = "drop" }) {
  const fileRef = useRef();

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input type="file" accept="image/*" ref={fileRef} style={{ display: "none" }} onChange={handlePhoto} />
      {value ? (
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
          <img src={value} alt="" style={{ width: "100%", display: "block", maxHeight: 260, objectFit: "cover" }} />
          <button onClick={() => onChange(null)} style={{
            position: "absolute", top: 12, right: 12, background: "rgba(34,31,27,0.55)",
            backdropFilter: "blur(10px)", color: "#FFF", border: "none", borderRadius: 100,
            padding: "7px 14px", fontSize: 12, display: "flex", alignItems: "center", gap: 5,
          }}><X size={12} /> Remove</button>
        </div>
      ) : variant === "drop" ? (
        <div onClick={() => fileRef.current.click()} style={{
          border: `1.5px dashed ${T.border}`, borderRadius: 16, padding: "32px 20px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          cursor: "pointer", background: T.card,
        }}>
          <Camera size={22} strokeWidth={1.2} color={T.accent} />
          <span style={{ fontSize: 13, color: T.muted }}>{label}</span>
        </div>
      ) : (
        <Btn variant="secondary" small onClick={() => fileRef.current.click()}>
          <Camera size={14} strokeWidth={1.5} /> {label}
        </Btn>
      )}
    </>
  );
}
