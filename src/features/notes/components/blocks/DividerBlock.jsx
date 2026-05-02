export function DividerBlock() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "var(--paper-line)" }}
      />
      <div
        className="w-1 h-1 rounded-full"
        style={{ backgroundColor: "var(--ink-faint)" }}
      />
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "var(--paper-line)" }}
      />
    </div>
  );
}
