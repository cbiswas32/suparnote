import { Plus, Trash2 } from "lucide-react";

export function BulletListBlock({ block, onChange }) {
  const updateItem = (id, text) => {
    onChange({
      items: block.items.map((item) =>
        item.id === id ? { ...item, text } : item
      ),
    });
  };
  const addItem = () => {
    onChange({
      items: [...block.items, { id: crypto.randomUUID(), text: "" }],
    });
  };
  const removeItem = (id) => {
    onChange({ items: block.items.filter((item) => item.id !== id) });
  };

  return (
    <div className="space-y-1.5">
      {block.items.map((item) => (
        <div key={item.id} className="flex items-center gap-2 group">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5"
            style={{ backgroundColor: "var(--brand)" }}
          />
          <input
            value={item.text}
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder="List item..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--ink-muted)" }}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <button
            onClick={() => removeItem(item.id)}
            className="opacity-0 group-hover:opacity-100 transition-all"
            style={{ color: "var(--accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex items-center gap-1 text-xs transition-colors mt-1"
        style={{ color: "var(--ink-faint)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
      >
        <Plus size={12} /> Add item
      </button>
    </div>
  );
}
