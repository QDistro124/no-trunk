"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Calendar, Shapes, Layers, Briefcase, Compass } from "lucide-react";
import { T } from "@/lib/theme";

const NAV = [
  { href: "/", label: "Trip", icon: House },
  { href: "/days", label: "Days", icon: Calendar },
  { href: "/closet", label: "Closet", icon: Shapes },
  { href: "/looks", label: "Looks", icon: Layers },
  { href: "/suitcase", label: "Suitcase", icon: Briefcase },
  { href: "/today", label: "Today", icon: Compass },
];

/* Floating frosted-glass bottom navigation */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)",
      width: "calc(100% - 28px)", maxWidth: 452,
      background: "rgba(251,249,246,0.78)",
      backdropFilter: "blur(24px) saturate(1.4)",
      WebkitBackdropFilter: "blur(24px) saturate(1.4)",
      border: "1px solid rgba(223,215,202,0.7)",
      borderRadius: 26, display: "flex", zIndex: 200,
      boxShadow: "0 12px 40px rgba(34,31,27,0.16)",
      padding: "6px 6px calc(6px + env(safe-area-inset-bottom))",
    }}>
      {NAV.map((n) => {
        const active = pathname === n.href;
        const Icon = n.icon;
        return (
          <Link key={n.href} href={n.href} style={{
            flex: 1, padding: "11px 2px 9px", borderRadius: 20,
            background: active ? T.ink : "transparent",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 4, textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            color: active ? "#F6F2EC" : T.faintText,
          }}>
            <Icon size={18} strokeWidth={active ? 1.7 : 1.4} />
            <span style={{ fontSize: 9, fontWeight: active ? 600 : 400, letterSpacing: "0.05em" }}>
              {n.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
