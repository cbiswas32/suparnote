import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { BlockRenderer } from "./blocks/BlockRenderer";
import clsx from "clsx";

export function NoteBlock({ block, onChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, data: { type: "note-block" } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group relative note-section rounded-lg transition-all",
        isDragging && "opacity-50 z-50 scale-[1.02]"
      )}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -right-6 top-1/2 -translate-y-1/2 p-1 rounded cursor-grab active:cursor-grabbing transition-colors"
        style={{ color: "var(--ink-faint)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
      >
        <GripVertical size={14} />
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(block.id)}
        className="absolute right-2 top-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        style={{ color: "var(--ink-faint)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
      >
        <Trash2 size={13} />
      </button>

      {/* Block content */}
      <div
        className="pl-5 pr-8 rounded-md transition-colors"
        style={{
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--paper-2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <BlockRenderer block={block} onChange={onChange} />
      </div>
    </div>
  );
}
