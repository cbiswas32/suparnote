import { useDraggable } from "@dnd-kit/core";
import { BLOCK_DEFINITIONS } from "../../../utils/blockTypes";
import clsx from "clsx";

const iconMap = {
  H1: <span className="font-bold text-base">H1</span>,
  H2: <span className="font-bold text-sm">H2</span>,
  H3: <span className="font-bold text-xs">H3</span>,
  P: <span className="text-sm">¶</span>,
  B: <span className="font-bold text-sm">B</span>,
  I: <span className="italic text-sm">I</span>,
  "!": <span className="text-sm">⚠</span>,
  '"': <span className="text-sm">"</span>,
  "</>": <span className="text-xs font-mono">{`</>`}</span>,
  HL: (
    <span
      className="text-xs px-1 rounded"
      style={{ backgroundColor: "var(--brand-bg)", color: "var(--brand)" }}
    >
      HL
    </span>
  ),
  "Q&A": <span className="text-xs">Q&A</span>,
  "⊞": <span className="text-sm">⊞</span>,
  "✓": <span className="text-sm">✓</span>,
  "•": <span className="text-sm font-bold">•</span>,
  "—": <span className="text-sm">—</span>,
};

const categories = [
  { key: "text", label: "Text" },
  { key: "callout", label: "Callout" },
  { key: "code", label: "Code" },
  { key: "interactive", label: "Interactive" },
  { key: "data", label: "Data" },
  { key: "layout", label: "Layout" },
];

function DraggablePaletteItem({ definition, onAdd }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${definition.type}`,
    data: { type: "palette", blockType: definition.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onAdd(definition.type)}
      className={clsx(
        "flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-grab active:cursor-grabbing select-none transition-all duration-150 group",
        isDragging && "opacity-50 scale-95"
      )}
      style={{
        backgroundColor: "var(--paper-2)",
        border: "1px solid var(--paper-line)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--brand-bg)";
        e.currentTarget.style.borderColor = "var(--brand)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--paper-2)";
        e.currentTarget.style.borderColor = "var(--paper-line)";
      }}
      title={definition.description}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
        style={{
          backgroundColor: "var(--tag-bg)",
          color: "var(--ink-muted)",
        }}
      >
        {iconMap[definition.icon] || (
          <span className="text-sm">{definition.icon}</span>
        )}
      </div>

      <div className="min-w-0">
        <p
          className="text-xs font-semibold transition-colors"
          style={{ color: "var(--ink)" }}
        >
          {definition.label}
        </p>
        <p className="text-xs truncate" style={{ color: "var(--ink-faint)" }}>
          {definition.description}
        </p>
      </div>
    </div>
  );
}

export function BlockPalette({ onAdd }) {
  return (
    <div className="flex flex-col h-full sidebar-panel">
      <div
        className="px-4 py-3"
        style={{ borderBottom: "1px solid var(--paper-line)" }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--ink-muted)" }}
        >
          Blocks
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--ink-faint)" }}>
          Drag or click to add
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {categories.map((cat) => {
          const defs = BLOCK_DEFINITIONS.filter((d) => d.category === cat.key);
          if (!defs.length) return null;

          return (
            <div key={cat.key}>
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2 px-1"
                style={{ color: "var(--ink-faint)" }}
              >
                {cat.label}
              </p>

              <div className="space-y-1">
                {defs.map((def) => (
                  <DraggablePaletteItem
                    key={def.type}
                    definition={def}
                    onAdd={onAdd}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
