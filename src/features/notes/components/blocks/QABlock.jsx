import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export function QABlock({ block, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--paper-line)" }}
    >
      {/* ── Question row ── */}
      <div
        className="flex items-start gap-2 p-4"
        style={{ backgroundColor: "var(--paper-2)" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="mt-0.5 flex-shrink-0 transition-colors duration-150"
          style={{ color: "var(--ink-faint)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--ink-muted)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--ink-faint)")
          }
        >
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex-1">
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--brand)" }}
          >
            Q
          </span>
          <textarea
            value={block.question}
            onChange={(e) => onChange({ question: e.target.value })}
            placeholder="Type your question here..."
            className="w-full bg-transparent outline-none resize-none text-sm font-medium mt-1"
            style={{ color: "var(--ink)" }}
            rows={1}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      </div>

      {/* ── Answer row ── */}
      {open && (
        <div
          className="p-4"
          style={{
            borderTop: "1px solid var(--paper-line)",
            backgroundColor: "var(--paper)",
          }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--brand-soft)" }}
          >
            A
          </span>
          <textarea
            value={block.answer}
            onChange={(e) => onChange({ answer: e.target.value })}
            placeholder="Write the answer here..."
            className="w-full bg-transparent outline-none resize-none text-sm mt-1"
            style={{ color: "var(--ink-muted)" }}
            rows={2}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
        </div>
      )}
    </div>
  );
}
