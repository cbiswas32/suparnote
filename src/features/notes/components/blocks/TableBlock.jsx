import { Plus, Trash2 } from "lucide-react";

export function TableBlock({ block, onChange }) {
  const addColumn = () => {
    const headers = [...block.headers, `Column ${block.headers.length + 1}`];
    const rows = block.rows.map((r) => [...r, ""]);
    onChange({ headers, rows });
  };

  const addRow = () => {
    const rows = [...block.rows, block.headers.map(() => "")];
    onChange({ rows });
  };

  const updateHeader = (i, val) => {
    const headers = [...block.headers];
    headers[i] = val;
    onChange({ headers });
  };

  const updateCell = (ri, ci, val) => {
    const rows = block.rows.map((r, rowIdx) =>
      rowIdx === ri ? r.map((c, colIdx) => (colIdx === ci ? val : c)) : r
    );
    onChange({ rows });
  };

  const removeRow = (ri) =>
    onChange({ rows: block.rows.filter((_, i) => i !== ri) });
  const removeCol = (ci) => {
    const headers = block.headers.filter((_, i) => i !== ci);
    const rows = block.rows.map((r) => r.filter((_, i) => i !== ci));
    onChange({ headers, rows });
  };

  const cellBorder = "1px solid var(--paper-line)";

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {block.headers.map((h, ci) => (
              <th
                key={ci}
                className="p-0 group"
                style={{
                  border: cellBorder,
                  backgroundColor: "var(--paper-2)",
                }}
              >
                <div className="flex items-center">
                  <input
                    value={h}
                    onChange={(e) => updateHeader(ci, e.target.value)}
                    className="flex-1 px-3 py-2 bg-transparent font-semibold outline-none min-w-[80px]"
                    style={{ color: "var(--ink)" }}
                  />
                  {block.headers.length > 1 && (
                    <button
                      onClick={() => removeCol(ci)}
                      className="p-1 opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: "var(--accent)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.7")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </th>
            ))}

            {/* Add column */}
            <th
              className="w-8"
              style={{ border: cellBorder, backgroundColor: "var(--paper-2)" }}
            >
              <button
                onClick={addColumn}
                className="w-full h-full flex items-center justify-center p-2 transition-colors duration-150"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--brand)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-faint)")
                }
              >
                <Plus size={14} />
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} className="group">
              {row.map((cell, ci) => (
                <td key={ci} className="p-0" style={{ border: cellBorder }}>
                  <input
                    value={cell}
                    onChange={(e) => updateCell(ri, ci, e.target.value)}
                    className="w-full px-3 py-2 bg-transparent outline-none transition-colors duration-150"
                    style={{ color: "var(--ink-muted)" }}
                    onFocus={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--brand-bg)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  />
                </td>
              ))}

              {/* Remove row */}
              <td className="w-8" style={{ border: cellBorder }}>
                <button
                  onClick={() => removeRow(ri)}
                  className="w-full h-full flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-all"
                  style={{ color: "var(--accent)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <Trash2 size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addRow}
        className="mt-2 flex items-center gap-1 text-xs transition-colors duration-150 px-1 py-1"
        style={{ color: "var(--ink-faint)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
      >
        <Plus size={12} /> Add row
      </button>
    </div>
  );
}
