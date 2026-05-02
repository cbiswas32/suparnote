import { AlertTriangle, Info, CheckCircle, Zap } from "lucide-react";

const VARIANTS = {
  warning: {
    icon: AlertTriangle,
    bg: "rgba(251, 191, 36,  0.12)",
    border: "#f59e0b",
    color: "#d97706",
    label: "Warning",
  },
  info: {
    icon: Info,
    bg: "rgba(96,  165, 250, 0.12)",
    border: "#3b82f6",
    color: "#2563eb",
    label: "Info",
  },
  success: {
    icon: CheckCircle,
    bg: "rgba(74,  222, 128, 0.12)",
    border: "#22c55e",
    color: "#16a34a",
    label: "Success",
  },
  tip: {
    icon: Zap,
    bg: "rgba(192, 132, 252, 0.12)",
    border: "#a855f7",
    color: "#9333ea",
    label: "Tip",
  },
};

export function ImportantBlock({ block, onChange }) {
  const v = VARIANTS[block.variant] || VARIANTS.warning;
  const Icon = v.icon;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: v.bg,
        borderLeft: `4px solid ${v.border}`,
      }}
    >
      {/* ── Header row ── */}
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} style={{ color: v.color, flexShrink: 0 }} />
        <select
          value={block.variant || "warning"}
          onChange={(e) => onChange({ variant: e.target.value })}
          className="text-xs font-semibold bg-transparent border-none outline-none cursor-pointer"
          style={{ color: v.color }}
        >
          {Object.entries(VARIANTS).map(([key, val]) => (
            <option key={key} value={key}>
              {val.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Content ── */}
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Write your important note here..."
        className="w-full bg-transparent outline-none resize-none text-sm"
        style={{ color: v.color, opacity: 1 }}
        rows={2}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
    </div>
  );
}
