# N&O Trunk

Natalia & Orang's closet & packing planner.
Built with Next.js (App Router), React, and lucide-react.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — starts with an empty trip for Natalia and Orang.
Add cities in Settings to begin planning.

## How it works

The product model is **closet-driven**:

1. **Closet** (`/closet`) — photograph each wardrobe piece once
   (dresses, tops, bottoms, shoes, bags, swimwear, jewelry, outerwear, accessories).
2. **Days** (`/days`) — plan the itinerary: date, city, time of day, activity, traveler.
3. **Looks** (`/looks`) — style each activity by *selecting pieces from the closet*,
   not by typing. Looks reference closet items by id.
4. **Suitcase** (`/suitcase`) — generated automatically from the looks.
   A piece worn in 6 looks appears once. Manual "Essentials"
   (toiletries, documents, electronics…) sit alongside the generated wardrobe.
   A "Missing from suitcase" panel surfaces packing gaps.
5. **Today** (`/today`) — the during-trip wardrobe guide: pick a day, see each look
   with its pieces and a per-piece packed checkmark.
6. **Trip** (`/`) — editorial dashboard: cover photo, styling coverage
   (activities / styled / missing), suitcase progress with gaps,
   and "hardest working pieces" to encourage re-wearing and avoid overpacking.

## Project structure

```
app/                  Routes (App Router, all client components)
  layout.jsx          Fonts (next/font), TripProvider, TopBar, BottomNav
  page.jsx            Trip dashboard
  days/  closet/  looks/  suitcase/  today/  settings/
components/
  OutfitCard.jsx      The hero editorial look card
  ui/                 Primitives: Surface, Btn, Capsule, Modal, DropMenu,
                      PieceThumb, PhotoInput, ProgressLine, PackToggle, …
  forms/              ClosetItemForm, OutfitForm (closet picker),
                      ItineraryForm, EssentialForm
  nav/                TopBar, BottomNav (frosted floating pill)
lib/
  theme.js            Design tokens (warm ivory / stone editorial palette)
  constants.js        Categories and enums
  helpers.js          Dates, ids, piece-usage derivations
  sample-data.js      Demo trip
  trip-context.jsx    Global state + localStorage persistence
```

## State & persistence

All state lives in `TripProvider` (React context) and is persisted to
`localStorage` under the key `no-trunk-v1`, so the trip survives refreshes.
Photos are stored as base64 data URLs; heavy photo use can exceed the
~5 MB localStorage quota (writes then fail silently and the app keeps
working in memory). When expanding, swap the persistence layer in
`lib/trip-context.jsx` for IndexedDB or a real backend — the rest of the
app only talks to the context API.

## Extending

- New piece categories → `lib/constants.js`
- New tabs → add a route in `app/` and an entry in `components/nav/BottomNav.jsx`
- Server persistence → replace the two `useEffect`s in `lib/trip-context.jsx`
