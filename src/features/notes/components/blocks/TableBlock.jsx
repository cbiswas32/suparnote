import { Plus, Trash2 } from 'lucide-react';

export function TableBlock({ block, onChange }) {
  const addColumn = () => {
    const headers = [...block.headers, `Column ${block.headers.length + 1}`];
    const rows = block.rows.map((r) => [...r, '']);
    onChange({ headers, rows });
  };

  const addRow = () => {
    const rows = [...block.rows, block.headers.map(() => '')];
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

  const removeRow = (ri) => onChange({ rows: block.rows.filter((_, i) => i !== ri) });
  const removeCol = (ci) => {
    const headers = block.headers.filter((_, i) => i !== ci);
    const rows = block.rows.map((r) => r.filter((_, i) => i !== ci));
    onChange({ headers, rows });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {block.headers.map((h, ci) => (
              <th key={ci} className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-0 group">
                <div className="flex items-center">
                  <input
                    value={h}
                    onChange={(e) => updateHeader(ci, e.target.value)}
                    className="flex-1 px-3 py-2 bg-transparent font-semibold text-slate-700 dark:text-slate-300 outline-none min-w-[80px]"
                  />
                  {block.headers.length > 1 && (
                    <button onClick={() => removeCol(ci)} className="p-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </th>
            ))}
            <th className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-8">
              <button onClick={addColumn} className="w-full h-full flex items-center justify-center p-2 text-slate-400 hover:text-brand-500 transition-colors">
                <Plus size={14} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} className="group">
              {row.map((cell, ci) => (
                <td key={ci} className="border border-slate-200 dark:border-slate-700 p-0">
                  <input
                    value={cell}
                    onChange={(e) => updateCell(ri, ci, e.target.value)}
                    className="w-full px-3 py-2 bg-transparent text-slate-700 dark:text-slate-300 outline-none focus:bg-brand-50 dark:focus:bg-brand-900/20 transition-colors"
                  />
                </td>
              ))}
              <td className="border border-slate-200 dark:border-slate-700 w-8">
                <button onClick={() => removeRow(ri)} className="w-full h-full flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all">
                  <Trash2 size={12} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-2 flex items-center gap-1 text-xs text-slate-400 hover:text-brand-500 transition-colors px-1 py-1">
        <Plus size={12} /> Add row
      </button>
    </div>
  );
}
