/* Sample data so the app is alive on first run */

export const SAMPLE_TRIP = {
  id: "trip-1",
  name: "Mediterranean Summer",
  coverPhoto: null,
  cities: [
    { id: "c1", name: "Rome", startDate: "2026-07-10", endDate: "2026-07-13" },
    { id: "c2", name: "Positano", startDate: "2026-07-13", endDate: "2026-07-16" },
    { id: "c3", name: "Capri", startDate: "2026-07-16", endDate: "2026-07-18" },
  ],
  travelers: [
    { id: "t1", name: "Natalia" },
    { id: "t2", name: "Orang" },
  ],
};

export const SAMPLE_CLOSET = [
  { id: "w1", ownerId: "t1", category: "Dresses", name: "White linen midi dress", color: "Ivory", notes: "", photo: null },
  { id: "w2", ownerId: "t1", category: "Dresses", name: "Silk slip dress", color: "Blush", notes: "Dry clean only", photo: null },
  { id: "w3", ownerId: "t1", category: "Swimwear", name: "Printed bikini", color: "Yellow", notes: "", photo: null },
  { id: "w4", ownerId: "t1", category: "Tops", name: "Linen cover-up", color: "Cream", notes: "", photo: null },
  { id: "w5", ownerId: "t1", category: "Shoes", name: "Tan leather sandals", color: "Tan", notes: "", photo: null },
  { id: "w6", ownerId: "t1", category: "Shoes", name: "Block heel mules", color: "Nude", notes: "", photo: null },
  { id: "w7", ownerId: "t1", category: "Bags", name: "Woven raffia tote", color: "Natural", notes: "", photo: null },
  { id: "w8", ownerId: "t1", category: "Bags", name: "Leather clutch", color: "Black", notes: "", photo: null },
  { id: "w9", ownerId: "t1", category: "Bags", name: "Straw beach bag", color: "Natural", notes: "", photo: null },
  { id: "w10", ownerId: "t1", category: "Jewelry", name: "Gold hoop earrings", color: "Gold", notes: "", photo: null },
  { id: "w11", ownerId: "t1", category: "Jewelry", name: "Pearl earrings", color: "Pearl", notes: "", photo: null },
  { id: "w12", ownerId: "t1", category: "Jewelry", name: "Layered necklaces", color: "Gold", notes: "", photo: null },
  { id: "w13", ownerId: "t2", category: "Bottoms", name: "Navy linen shorts", color: "Navy", notes: "", photo: null },
  { id: "w14", ownerId: "t2", category: "Tops", name: "White polo", color: "White", notes: "", photo: null },
  { id: "w15", ownerId: "t2", category: "Shoes", name: "Boat shoes", color: "Brown", notes: "", photo: null },
  { id: "w16", ownerId: "t2", category: "Bags", name: "Canvas backpack", color: "Khaki", notes: "", photo: null },
  { id: "w17", ownerId: "t2", category: "Accessories", name: "Field watch", color: "Steel", notes: "", photo: null },
];

export const SAMPLE_ITINERARY = [
  {
    id: "i1", date: "2026-07-10", cityId: "c1", timeOfDay: "Daytime",
    activity: "Colosseum & Roman Forum", type: "Sightseeing",
    notes: "Book skip-the-line tickets", travelerId: "t1",
    outfit: { name: "Roman Holiday", itemIds: ["w1", "w5", "w7", "w10", "w12"], notes: "Bring a scarf for church entry", photo: null },
  },
  {
    id: "i2", date: "2026-07-10", cityId: "c1", timeOfDay: "Nighttime",
    activity: "Dinner at Osteria dell'Enoteca", type: "Dinner",
    notes: "Reservation at 20:00", travelerId: "t1",
    outfit: { name: "Candlelit Dinner", itemIds: ["w2", "w6", "w8", "w11"], notes: "", photo: null },
  },
  {
    id: "i3", date: "2026-07-13", cityId: "c2", timeOfDay: "Full Day",
    activity: "Positano Beach & Town", type: "Beach",
    notes: "Spiaggia Grande in the morning, town stroll after lunch", travelerId: "t1",
    outfit: { name: "Amalfi Coast Day", itemIds: ["w3", "w4", "w5", "w9", "w10"], notes: "Pack sunscreen in the bag", photo: null },
  },
  {
    id: "i4", date: "2026-07-14", cityId: "c2", timeOfDay: "Nighttime",
    activity: "Sunset dinner at Le Sirenuse", type: "Formal",
    notes: "", travelerId: "t1", outfit: null,
  },
  {
    id: "i5", date: "2026-07-16", cityId: "c3", timeOfDay: "Daytime",
    activity: "Blue Grotto & Boat Tour", type: "Travel",
    notes: "Depart from Marina Grande", travelerId: "t2",
    outfit: { name: "Capri Boat Day", itemIds: ["w13", "w14", "w15", "w16", "w17"], notes: "Wear sunscreen, bring a hat", photo: null },
  },
  {
    id: "i6", date: "2026-07-17", cityId: "c3", timeOfDay: "Daytime",
    activity: "Lunch at La Fontelina", type: "Casual",
    notes: "", travelerId: "t1",
    outfit: { name: "Beach Club Lunch", itemIds: ["w1", "w5", "w9", "w10"], notes: "", photo: null },
  },
];

export const SAMPLE_ESSENTIALS = [
  { id: "e1", travelerId: "t1", category: "Toiletries", name: "SPF 50 sunscreen", qty: 2, packed: true, notes: "" },
  { id: "e2", travelerId: "t1", category: "Toiletries", name: "After-sun lotion", qty: 1, packed: false, notes: "" },
  { id: "e3", travelerId: "t1", category: "Makeup", name: "Tinted moisturizer", qty: 1, packed: false, notes: "" },
  { id: "e4", travelerId: "t1", category: "Electronics", name: "Travel adapter", qty: 1, packed: true, notes: "EU plug" },
  { id: "e5", travelerId: "t1", category: "Travel Documents", name: "Passport", qty: 1, packed: true, notes: "" },
  { id: "e6", travelerId: "t2", category: "Travel Documents", name: "Passport", qty: 1, packed: true, notes: "" },
];

export const INITIAL_PACKED = ["w1", "w5", "w10", "w13", "w15"];
