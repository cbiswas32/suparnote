const COLORS = {
  yellow: {
    bg: "rgba(250, 204, 21, 0.15)",
    border: "rgba(250, 204, 21, 0.4)",
    dot: "#facc15",
    label: "Yellow",
  },
  green: {
    bg: "rgba(74, 222, 128, 0.15)",
    border: "rgba(74, 222, 128, 0.4)",
    dot: "#4ade80",
    label: "Green",
  },
  blue: {
    bg: "rgba(96, 165, 250, 0.15)",
    border: "rgba(96, 165, 250, 0.4)",
    dot: "#60a5fa",
    label: "Blue",
  },
  pink: {
    bg: "rgba(244, 114, 182, 0.15)",
    border: "rgba(244, 114, 182, 0.4)",
    dot: "#f472b6",
    label: "Pink",
  },
  purple: {
    bg: "rgba(192, 132, 252, 0.15)",
    border: "rgba(192, 132, 252, 0.4)",
    dot: "#c084fc",
    label: "Purple",
  },
};

export function HighlightBlock({ block, onChange }) {
  const c = COLORS[block.color] || COLORS.yellow;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
      }}
    >
      {/* ── Color picker row ── */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-semibold"
          style={{ color: "var(--ink-faint)" }}
        >
          Highlight:
        </span>
        <div className="flex gap-1">
          {Object.entries(COLORS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => onChange({ color: key })}
              title={val.label}
              className="w-4 h-4 rounded-full transition-all duration-150"
              style={{
                backgroundColor: val.dot,
                border:
                  block.color === key
                    ? "2px solid var(--ink)"
                    : "2px solid transparent",
                transform: block.color === key ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Highlighted text..."
        className="w-full bg-transparent outline-none resize-none text-sm"
        style={{ color: "var(--ink-muted)" }}
        rows={2}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
    </div>
  );
}
