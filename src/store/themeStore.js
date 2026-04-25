import { create } from 'zustand';

const STORAGE_KEY = 'suparnote-theme';

/* ---------- Helpers ---------- */

const getInitialState = () => {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  return {
    mode:
      saved.mode ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),

    theme: saved.theme || 'classic',
    brand: saved.brand || '#eab308',
  };
};

const applyThemeToDOM = ({ mode, theme, brand }) => {
  const root = document.documentElement;

  // dark mode
  root.classList.toggle('dark', mode === 'dark');

  // remove old theme classes
  root.classList.forEach((cls) => {
    if (cls.startsWith('theme-')) root.classList.remove(cls);
  });

  // apply new theme
  root.classList.add(`theme-${theme}`);

  // apply brand color
  root.style.setProperty('--brand', brand);
};

/* ---------- Store ---------- */

export const useThemeStore = create((set, get) => ({
  ...getInitialState(),

  /* INIT */
  initTheme: () => {
    const state = get();
    applyThemeToDOM(state);
  },

  /* TOGGLE DARK/LIGHT */
  toggleMode: () => {
    set((state) => {
      const nextMode = state.mode === 'dark' ? 'light' : 'dark';

      const updated = { ...state, mode: nextMode };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      applyThemeToDOM(updated);

      return { mode: nextMode };
    });
  },

  /* CHANGE THEME (classic / sepia / etc) */
  setTheme: (theme) => {
    set((state) => {
      const updated = { ...state, theme };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      applyThemeToDOM(updated);

      return { theme };
    });
  },

  /* CHANGE BRAND COLOR */
  setBrand: (color) => {
    set((state) => {
      const updated = { ...state, brand: color };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      applyThemeToDOM(updated);

      return { brand: color };
    });
  },
}));