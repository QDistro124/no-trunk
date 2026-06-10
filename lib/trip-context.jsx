"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  EMPTY_TRIP, EMPTY_CLOSET, EMPTY_ITINERARY,
  EMPTY_ESSENTIALS, EMPTY_PACKED,
} from "./sample-data";

const TripContext = createContext(null);
const STORAGE_KEY = "no-trunk-v1";
const LEGACY_STORAGE_KEYS = ["natalia-orang-closet-v1", "voyage-state-v1"];

export function TripProvider({ children }) {
  const [trip, setTrip] = useState(EMPTY_TRIP);
  const [itinerary, setItinerary] = useState(EMPTY_ITINERARY);
  const [closet, setCloset] = useState(EMPTY_CLOSET);
  const [essentials, setEssentials] = useState(EMPTY_ESSENTIALS);
  const [packedPieceIds, setPackedPieceIds] = useState(new Set(EMPTY_PACKED));
  const [hydrated, setHydrated] = useState(false);

  /* Load persisted state after mount (avoids SSR/client mismatch) */
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY) ||
        LEGACY_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.trip) setTrip(s.trip);
        if (s.itinerary) setItinerary(s.itinerary);
        if (s.closet) setCloset(s.closet);
        if (s.essentials) setEssentials(s.essentials);
        if (s.packedPieceIds) setPackedPieceIds(new Set(s.packedPieceIds));
      }
    } catch {
      /* corrupted state — fall back to empty trip */
    }
    setHydrated(true);
  }, []);

  /* Persist on change. Large photo uploads can exceed the localStorage
     quota — swap this for IndexedDB or a real backend when expanding. */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        trip, itinerary, closet, essentials,
        packedPieceIds: [...packedPieceIds],
      }));
    } catch {
      /* quota exceeded — keep working in memory */
    }
  }, [trip, itinerary, closet, essentials, packedPieceIds, hydrated]);

  const togglePiece = (id) =>
    setPackedPieceIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const resetTrip = () => {
    setTrip(EMPTY_TRIP);
    setItinerary(EMPTY_ITINERARY);
    setCloset(EMPTY_CLOSET);
    setEssentials(EMPTY_ESSENTIALS);
    setPackedPieceIds(new Set(EMPTY_PACKED));
    try {
      localStorage.removeItem(STORAGE_KEY);
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch {
      /* ignore */
    }
  };

  const value = {
    trip, setTrip,
    itinerary, setItinerary,
    closet, setCloset,
    essentials, setEssentials,
    packedPieceIds, setPackedPieceIds, togglePiece,
    resetTrip,
    travelers: trip.travelers,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
};
