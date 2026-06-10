"use client";

import { useState } from "react";
import { Sun, Moon, MapPin } from "lucide-react";
import { T, serif } from "@/lib/theme";
import { fmtDateLong, tripDates } from "@/lib/helpers";
import { useTrip } from "@/lib/trip-context";
import { Surface, Capsule, Eyebrow, Serif, Divider } from "@/components/ui/primitives";
import OutfitCard from "@/components/OutfitCard";

export default function TodayPage() {
  const { trip, itinerary, closet, packedPieceIds, travelers } = useTrip();
  const dates = tripDates(trip);
  const [activeDate, setActiveDate] = useState(dates[0]);

  const dayItems = itinerary.filter((i) => i.date === activeDate);
  const city = trip.cities.find((c) => activeDate >= c.startDate && activeDate <= c.endDate);
  const daytime = dayItems.filter((i) => i.timeOfDay === "Daytime" || i.timeOfDay === "Full Day");
  const nighttime = dayItems.filter((i) => i.timeOfDay === "Nighttime");

  return (
    <div className="page-enter">
      <div style={{ margin: "34px 0 20px" }}>
        <Eyebrow style={{ marginBottom: 8 }}>While you&apos;re away</Eyebrow>
        <Serif size={32}>Today</Serif>
      </div>

      {/* Date strip */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "2px 2px 16px" }}>
        {dates.map((date) => {
          const active = activeDate === date;
          const d = new Date(date + "T12:00:00");
          return (
            <button key={date} onClick={() => setActiveDate(date)} style={{
              flexShrink: 0, padding: "13px 18px", borderRadius: 18,
              background: active ? T.ink : T.card,
              color: active ? "#F6F2EC" : T.text,
              border: `1px solid ${active ? T.ink : T.border}`,
              transition: "all 0.3s ease", textAlign: "center", minWidth: 62,
            }}>
              <div style={{ fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", opacity: active ? 0.65 : 0.5, fontWeight: 500 }}>
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 500, marginTop: 2 }}>{d.getDate()}</div>
            </button>
          );
        })}
      </div>

      {/* Day header */}
      <div style={{ margin: "10px 0 26px" }}>
        <Serif size={23}>{fmtDateLong(activeDate)}</Serif>
        {city && (
          <div style={{ fontSize: 13, color: T.muted, marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={12} strokeWidth={1.5} /> {city.name}
          </div>
        )}
      </div>

      {dayItems.length === 0 && (
        <div style={{ border: `1.5px dashed ${T.border}`, borderRadius: 20, padding: "48px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 17, color: T.muted }}>A day to wander</div>
          <div style={{ fontSize: 12.5, color: T.faintText, marginTop: 6 }}>
            Nothing scheduled — wear whatever feels right
          </div>
        </div>
      )}

      {[["Daytime", Sun, daytime], ["Evening", Moon, nighttime]].map(([label, Icon, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={label} style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Icon size={13} strokeWidth={1.5} color={T.accent} />
              <Eyebrow>{label}</Eyebrow>
              <Divider style={{ flex: 1 }} />
            </div>
            {items.map((item) => {
              const traveler = travelers.find((t) => t.id === item.travelerId);
              const cityFor = trip.cities.find((c) => c.id === item.cityId);
              return item.outfit ? (
                <OutfitCard
                  key={item.id}
                  item={item}
                  city={cityFor}
                  traveler={traveler}
                  closet={closet}
                  packedPieces={packedPieceIds}
                  showPackState
                  tall
                />
              ) : (
                <Surface key={item.id} style={{ marginBottom: 16, padding: "22px 24px" }}>
                  <Serif size={18}>{item.activity}</Serif>
                  <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: T.faintText, marginTop: 8 }}>
                    No look planned — style it in Looks
                  </div>
                  {traveler && <div style={{ marginTop: 14 }}><Capsule>{traveler.name}</Capsule></div>}
                </Surface>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
