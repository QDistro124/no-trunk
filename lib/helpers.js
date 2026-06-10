export const uid = () => Math.random().toString(36).slice(2, 9);

export const fmtDate = (d) =>
  d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

export const fmtDateLong = (d) =>
  d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";

export const getDatesInRange = (start, end) => {
  const dates = [];
  for (let d = new Date(start + "T12:00:00"); d <= new Date(end + "T12:00:00"); d.setDate(d.getDate() + 1))
    dates.push(d.toISOString().split("T")[0]);
  return dates;
};

/* All unique dates of the trip, sorted */
export const tripDates = (trip) =>
  [...new Set(trip.cities.flatMap((c) => getDatesInRange(c.startDate, c.endDate)))].sort();

/* How many looks each closet piece appears in: { pieceId: count } */
export const pieceUsage = (itinerary) => {
  const usage = {};
  itinerary.forEach((i) => {
    if (i.outfit) (i.outfit.itemIds || []).forEach((id) => { usage[id] = (usage[id] || 0) + 1; });
  });
  return usage;
};
