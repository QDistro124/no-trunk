"use client";

import { useState } from "react";
import { Sun, Moon, SunMoon } from "lucide-react";
import { T, serif } from "@/lib/theme";

/* Layered card / panel surface */
export function Surface({ children, style = {}, onClick, hover = false, tone = "card" }) {
  const [h, setH] = useState(false);
  const bg = tone === "panel" ? T.panel : tone === "deep" ? T.panelDeep : T.card;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: bg, borderRadius: 20,
        border: `1px solid ${tone === "card" ? T.border : "transparent"}`,
        boxShadow: h ? "0 16px 40px rgba(34,31,27,0.10)" : "0 2px 8px rgba(34,31,27,0.04)",
        transform: h ? "translateY(-3px)" : "none",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Btn({ children, onClick, variant = "primary", style = {}, small = false }) {
  const [h, setH] = useState(false);
  const base = {
    border: "1px solid transparent", borderRadius: 100, fontWeight: 500,
    padding: small ? "8px 18px" : "13px 26px",
    fontSize: small ? 12.5 : 13.5, letterSpacing: "0.02em",
    transition: "all 0.25s ease", display: "inline-flex",
    alignItems: "center", justifyContent: "center", gap: 7, ...style,
  };
  const variants = {
    primary: { background: h ? "#3A352E" : T.ink, color: "#F6F2EC" },
    secondary: { background: h ? T.panelDeep : T.panel, color: T.text },
    ghost: { background: h ? T.panel : "transparent", color: T.muted, padding: small ? "7px 12px" : "10px 16px" },
  };
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...variants[variant] }}>
      {children}
    </button>
  );
}

export function Capsule({ children, dark = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: dark ? "rgba(251,249,246,0.92)" : T.panel,
      color: dark ? T.text : T.muted,
      borderRadius: 100, padding: "4px 12px", fontSize: 10.5, fontWeight: 500,
      letterSpacing: "0.05em", whiteSpace: "nowrap", textTransform: "uppercase",
      backdropFilter: dark ? "blur(10px)" : "none",
    }}>{children}</span>
  );
}

export function Eyebrow({ children, style = {} }) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 600, letterSpacing: "0.18em",
      textTransform: "uppercase", color: T.accent, ...style,
    }}>{children}</div>
  );
}

export function Serif({ children, size = 26, italic = false, style = {} }) {
  return (
    <div style={{
      fontFamily: serif, fontSize: size, fontWeight: 500,
      fontStyle: italic ? "italic" : "normal",
      letterSpacing: "-0.01em", lineHeight: 1.12, color: T.text, ...style,
    }}>{children}</div>
  );
}

export function Divider({ style = {} }) {
  return <div style={{ height: 1, background: T.border, ...style }} />;
}

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontSize: 10, fontWeight: 600, color: T.muted,
        marginBottom: 7, letterSpacing: "0.14em", textTransform: "uppercase",
      }}>{label}</label>
      {children}
    </div>
  );
}

export function TimeIcon({ time, size = 12 }) {
  if (time === "Daytime") return <Sun size={size} strokeWidth={1.5} />;
  if (time === "Nighttime") return <Moon size={size} strokeWidth={1.5} />;
  return <SunMoon size={size} strokeWidth={1.5} />;
}
