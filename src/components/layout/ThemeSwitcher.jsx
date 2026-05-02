import { useState, useRef, useEffect } from "react";
import { useThemeStore, THEMES } from "../../store/themeStore";
import { Palette, Check, Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, brand, setTheme, setBrand, resetBrand } = useThemeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentMeta = THEMES.find((t) => t.id === theme);
  const isDark = currentMeta?.dark ?? false;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors duration-150"
        style={{
          backgroundColor: open ? "var(--brand-bg)" : "transparent",
          border: "1px solid var(--paper-line)",
          color: open ? "var(--brand)" : "var(--ink-muted)",
        }}
        onMouseEnter={(e) => {
          if (!open) e.currentTarget.style.backgroundColor = "var(--brand-bg)";
        }}
        onMouseLeave={(e) => {
          if (!open) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {/* Live preview dot */}
        <span
          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${currentMeta?.paper} 50%, ${currentMeta?.brand} 50%)`,
            border: "1px solid var(--paper-line)",
          }}
        />
        <Palette size={13} />
      </button>

      {/* ── Popover ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Theme settings"
          className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
          style={{
            width: 220,
            backgroundColor: "var(--paper-2)",
            border: "1px solid var(--paper-line)",
            boxShadow: "0 8px 32px var(--shadow)",
            animation: "popover-in 0.15s ease-out",
          }}
        >
          {/* Section: Themes */}
          <div className="px-3 pt-3 pb-2">
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: "var(--ink-faint)" }}
            >
              Theme
            </p>

            <div className="flex flex-col gap-0.5">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                  }}
                  className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-lg text-left transition-colors duration-100"
                  style={{
                    backgroundColor:
                      theme === t.id ? "var(--brand-bg)" : "transparent",
                    color: theme === t.id ? "var(--brand)" : "var(--ink-muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (theme !== t.id)
                      e.currentTarget.style.backgroundColor =
                        "var(--paper-line)";
                  }}
                  onMouseLeave={(e) => {
                    if (theme !== t.id)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {/* Split dot */}
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${t.paper} 50%, ${t.brand} 50%)`,
                      border:
                        theme === t.id
                          ? "1.5px solid var(--brand)"
                          : "1px solid var(--paper-line)",
                    }}
                  />

                  <span className="flex-1 text-sm">{t.label}</span>

                  {/* Dark/light badge */}
                  <span
                    className="flex-shrink-0 opacity-50"
                    style={{ color: "inherit" }}
                  >
                    {t.dark ? <Moon size={11} /> : <Sun size={11} />}
                  </span>

                  {/* Active check */}
                  {theme === t.id && <Check size={12} strokeWidth={2.5} />}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: "var(--paper-line)" }} />

          {/* Section: Accent color */}
          <div className="px-3 py-2.5">
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: "var(--ink-faint)" }}
            >
              Accent
            </p>

            <div className="flex items-center gap-2">
              {/* Color swatch / picker trigger */}
              <label
                className="relative w-7 h-7 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 flex items-center justify-center"
                style={{
                  border: brand
                    ? "2px solid var(--brand)"
                    : "1.5px dashed var(--ink-faint)",
                }}
                title="Pick accent color"
              >
                <input
                  type="color"
                  value={brand ?? currentMeta?.brand ?? "#c8860a"}
                  onChange={(e) => setBrand(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                <span
                  className="w-4 h-4 rounded-md"
                  style={{ backgroundColor: brand ?? currentMeta?.brand }}
                />
              </label>

              {/* Hex display */}
              <span
                className="text-xs font-mono flex-1"
                style={{ color: "var(--ink-muted)" }}
              >
                {(brand ?? currentMeta?.brand ?? "").toUpperCase()}
              </span>

              {/* Reset */}
              {brand && (
                <button
                  onClick={resetBrand}
                  className="text-xs px-2 py-0.5 rounded-md transition-colors duration-100"
                  style={{
                    color: "var(--ink-faint)",
                    border: "1px solid var(--paper-line)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--ink-faint)")
                  }
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Keyframe for popover entrance */}
      <style>{`
        @keyframes popover-in {
          from { opacity: 0; transform: translateY(-4px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}
