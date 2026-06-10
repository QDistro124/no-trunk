/* Design tokens — editorial luxury system */
export const T = {
  bg: "#F3EFE9",          // warm ivory base
  panel: "#EBE5DC",       // stone panel
  panelDeep: "#E2DACE",   // deeper beige layer
  card: "#FBF9F6",        // warm off-white card
  border: "#DFD7CA",
  hairline: "#EAE4D9",
  text: "#221F1B",
  muted: "#7A736A",
  faintText: "#A39B8F",
  accent: "#8A7D6B",
  ink: "#2B2722",         // deep warm ink for dark surfaces
  danger: "#96604F",
};

export const serif = "var(--font-serif), Georgia, serif";
export const sans = "var(--font-sans), -apple-system, sans-serif";

export const DEFAULT_COVER =
  "linear-gradient(168deg, #C9B8A3 0%, #B5A18C 32%, #8E8275 60%, #5C564E 100%)";

/* Warm swatch placeholders for closet pieces without photos */
const SWATCHES = ["#D9CDBA", "#C9BBA6", "#BFB3A3", "#D4C3B0", "#CCC2B4", "#B8AC9C", "#E0D5C4", "#C4B6A1"];
export const swatchFor = (id) =>
  SWATCHES[[...id].reduce((s, c) => s + c.charCodeAt(0), 0) % SWATCHES.length];
