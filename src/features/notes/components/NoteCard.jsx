import { Archive, Pin, Trash2, Edit3, Clock } from "lucide-react";
import { notesService } from "../services/notesService";
import clsx from "clsx";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPreview(noteJson) {
  const blocks = notesService.parseBlocks(noteJson);
  for (const block of blocks) {
    if (block.content && block.content.trim())
      return block.content.trim().slice(0, 120);
    if (block.question && block.question.trim())
      return block.question.trim().slice(0, 120);
    if (block.items?.length)
      return block.items
        .map((i) => i.text)
        .filter(Boolean)
        .join(", ")
        .slice(0, 120);
  }
  return "No content yet...";
}

export function NoteCard({ note, onSelect, onUpdate, onDelete }) {
  const preview = getPreview(note.note);
  const blockCount = notesService.parseBlocks(note.note).length;

  return (
    <div
      onClick={() => onSelect(note)}
      className={clsx(
        "group relative p-4 rounded-2xl border cursor-pointer transition-all duration-150"
      )}
      style={{
        backgroundColor: "var(--paper-2)",
        border: note.is_pinned
          ? "1px solid var(--brand)"
          : "1px solid var(--paper-line)",
        boxShadow: note.is_pinned ? "0 4px 16px var(--shadow)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!note.is_pinned) {
          e.currentTarget.style.borderColor = "var(--brand)";
          e.currentTarget.style.backgroundColor = "var(--paper)";
        }
      }}
      onMouseLeave={(e) => {
        if (!note.is_pinned) {
          e.currentTarget.style.borderColor = "var(--paper-line)";
          e.currentTarget.style.backgroundColor = "var(--paper-2)";
        }
      }}
    >
      {note.is_pinned && (
        <div className="absolute top-2.5 right-2.5">
          <Pin
            size={12}
            style={{ color: "var(--brand)", fill: "var(--brand)" }}
          />
        </div>
      )}

      <h3
        className="font-semibold text-sm truncate pr-6"
        style={{ color: "var(--ink)" }}
      >
        {note.title}
      </h3>

      <p
        className="text-xs mt-1 line-clamp-2 leading-relaxed"
        style={{ color: "var(--ink-muted)" }}
      >
        {preview}
      </p>

      <div className="flex items-center justify-between mt-3">
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: "var(--ink-faint)" }}
        >
          <Clock size={10} />
          <span>{formatDate(note.updated_at || note.created_at)}</span>

          {blockCount > 0 && (
            <span
              className="ml-1.5 px-1.5 py-0.5 rounded-md"
              style={{
                backgroundColor: "var(--tag-bg)",
                border: "1px solid var(--tag-border)",
                color: "var(--brand)",
              }}
            >
              {blockCount} blocks
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div
        className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1 rounded-lg p-0.5 transition-all"
        style={{
          backgroundColor: "var(--paper)",
          border: "1px solid var(--paper-line)",
          boxShadow: "0 2px 8px var(--shadow)",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(note.id, { isPinned: !note.is_pinned });
          }}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: "var(--ink-faint)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--ink-faint)")
          }
          title={note.is_pinned ? "Unpin" : "Pin"}
        >
          <Pin size={12} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate(note.id, { isArchived: !note.is_archived });
          }}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: "var(--ink-faint)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--brand-soft)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--ink-faint)")
          }
          title="Archive"
        >
          <Archive size={12} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="p-1.5 rounded-md transition-colors"
          style={{ color: "var(--ink-faint)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--ink-faint)")
          }
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
