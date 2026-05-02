import { Copy, Check } from "lucide-react";
import { useState } from "react";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "css",
  "html",
  "sql",
  "bash",
  "json",
  "markdown",
  "go",
  "rust",
  "php",
];

export function CodeBlock({ block, onChange }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--paper-line)" }}
    >
      {/* ── Toolbar ── */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          backgroundColor: "var(--paper-2)",
          borderBottom: "1px solid var(--paper-line)",
        }}
      >
        <select
          value={block.language || "javascript"}
          onChange={(e) => onChange({ language: e.target.value })}
          className="text-xs font-mono bg-transparent border-none outline-none cursor-pointer"
          style={{ color: "var(--ink-muted)" }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs transition-colors duration-150"
          style={{ color: copied ? "var(--brand)" : "var(--ink-faint)" }}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.color = "var(--ink-muted)";
          }}
          onMouseLeave={(e) => {
            if (!copied) e.currentTarget.style.color = "var(--ink-faint)";
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* ── Editor ── */}
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="// Write your code here..."
        className="w-full p-4 font-mono text-sm outline-none resize-none leading-relaxed"
        style={{
          backgroundColor: "var(--paper)",
          color: "var(--ink-muted)",
          minHeight: "80px",
        }}
        rows={4}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        spellCheck={false}
      />
    </div>
  );
}
