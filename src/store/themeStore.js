import { create } from "zustand";

const STORAGE_KEY = "suparnote-theme";
const isBrowser = typeof window !== "undefined";

// Exact values extracted from your CSS
export const THEMES = [
  {
    id: "vintage",
    label: "Vintage",
    paper: "#f2e8d5", // warm parchment
    brand: "#c8860a", // amber gold
    dark: false,
  },
  {
    id: "ink-night",
    label: "Ink Night",
    paper: "#161210", // deep brown-black
    brand: "#c8860a",
    dark: true,
  },
  {
    id: "slate",
    label: "Slate",
    paper: "#f6f8fa",
    brand: "#3b6fd4", // cool blue
    dark: false,
  },
  {
    id: "forest",
    label: "Forest",
    paper: "#f0f4ed",
    brand: "#3a8c3a", // organic green
    dark: false,
  },
  {
    id: "noir",
    label: "Noir",
    paper: "#0d0d0f", // near-black
    brand: "#7878f0", // purple
    dark: true,
  },
];

const isValidHex = (c) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c);

const getInitialState = () => {
  const raw = isBrowser ? localStorage.getItem(STORAGE_KEY) : null;
  const saved = raw ? JSON.parse(raw) : {};

  // Default: vintage in light, ink-night in dark
  const prefersDark =
    isBrowser && window.matchMedia("(prefers-color-scheme: dark)").matches;

  return {
    theme: saved.theme || (prefersDark ? "ink-night" : "vintage"),
    brand: saved.brand || null, // null = use theme's default brand
  };
};

const applyThemeToDOM = ({ theme, brand }) => {
  if (!isBrowser) return;
  const root = document.documentElement;

  // Remove all theme-* classes
  [...root.classList]
    .filter((c) => c.startsWith("theme-"))
    .forEach((c) => root.classList.remove(c));

  const meta = THEMES.find((t) => t.id === theme);

  // .dark drives your CSS dark variables (ink-night block)
  // theme-* drives the named palette blocks
  root.classList.toggle("dark", meta?.dark ?? false);
  root.classList.add(`theme-${theme}`);

  // Override brand only if user has picked a custom color
  if (brand && isValidHex(brand)) {
    root.style.setProperty("--brand", brand);
  } else {
    root.style.removeProperty("--brand"); // fall back to CSS theme value
  }
};

const persist = (state) => {
  if (isBrowser) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const useThemeStore = create((set, get) => ({
  ...getInitialState(),

  initTheme: () => {
    applyThemeToDOM(get());

    // Follow OS preference only when user hasn't manually chosen a theme
    if (isBrowser) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (!saved) {
            get().setTheme(e.matches ? "ink-night" : "vintage");
          }
        });
    }
  },

  setTheme: (theme) => {
    set(() => {
      // Reset custom brand when switching themes
      const next = { ...get(), theme, brand: null };
      persist(next);
      applyThemeToDOM(next);
      return { theme, brand: null };
    });
  },

  setBrand: (brand) => {
    if (!isValidHex(brand)) return;
    set(() => {
      const next = { ...get(), brand };
      persist(next);
      applyThemeToDOM(next);
      return { brand };
    });
  },

  resetBrand: () => {
    set(() => {
      const next = { ...get(), brand: null };
      persist(next);
      applyThemeToDOM(next);
      return { brand: null };
    });
  },
}));
