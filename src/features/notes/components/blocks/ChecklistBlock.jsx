import { Plus, Trash2 } from 'lucide-react';

export function ChecklistBlock({ block, onChange }) {
  const toggleItem = (id) => {
    const items = block.items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    onChange({ items });
  };

  const updateItem = (id, text) => {
    const items = block.items.map((item) => item.id === id ? { ...item, text } : item);
    onChange({ items });
  };

  const addItem = () => {
    onChange({ items: [...block.items, { id: crypto.randomUUID(), text: '', checked: false }] });
  };

  const removeItem = (id) => {
    onChange({ items: block.items.filter((item) => item.id !== id) });
  };

  return (
    <div className="space-y-2">
      {block.items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 group">
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleItem(item.id)}
            className="w-4 h-4 rounded border-slate-300 text-brand-500 cursor-pointer accent-brand-500"
          />
          <input
            value={item.text}
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder="List item..."
            className={`flex-1 bg-transparent outline-none text-sm ${item.checked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'} placeholder-slate-300 dark:placeholder-slate-600`}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
          />
          <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all">
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button onClick={addItem} className="flex items-center gap-1 text-xs text-slate-400 hover:text-brand-500 transition-colors mt-1">
        <Plus size={12} /> Add item
      </button>
    </div>
  );
}
