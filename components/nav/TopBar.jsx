"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";
import { APP_WORDMARK } from "@/lib/brand";
import { T, serif } from "@/lib/theme";

/* Frosted wordmark bar — on the dashboard ("/") the hero cover takes over,
   so we render only a floating settings button there. */
export default function TopBar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <Link href="/settings" style={{
        position: "absolute", top: 18, left: 18, zIndex: 110,
        background: "rgba(251,249,246,0.85)", backdropFilter: "blur(10px)",
        borderRadius: 100, padding: "8px 10px", display: "flex", color: T.text,
      }}>
        <Settings size={14} strokeWidth={1.5} />
      </Link>
    );
  }

  return (
    <header style={{
      background: "rgba(243,239,233,0.8)",
      backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      borderBottom: `1px solid ${T.hairline}`, padding: "15px 22px",
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <Link href="/" style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, letterSpacing: "0.04em", color: T.text, textDecoration: "none" }}>
        {APP_WORDMARK}
      </Link>
      <Link href="/settings" style={{
        color: pathname === "/settings" ? T.text : T.faintText,
        display: "flex", padding: 4,
      }}>
        <Settings size={16} strokeWidth={1.5} />
      </Link>
    </header>
  );
}
