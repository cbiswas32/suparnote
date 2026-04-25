const colors = {
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', border: 'border-yellow-300', label: 'Yellow' },
  green: { bg: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-300', label: 'Green' },
  blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-300', label: 'Blue' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900/30', border: 'border-pink-300', label: 'Pink' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-300', label: 'Purple' },
};

export function HighlightBlock({ block, onChange }) {
  const c = colors[block.color] || colors.yellow;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Highlight:</span>
        <div className="flex gap-1">
          {Object.entries(colors).map(([key]) => (
            <button
              key={key}
              onClick={() => onChange({ color: key })}
              className={`w-4 h-4 rounded-full bg-${key}-400 border-2 ${block.color === key ? 'border-slate-600 dark:border-slate-300' : 'border-transparent'} transition-all`}
              style={{ backgroundColor: { yellow: '#facc15', green: '#4ade80', blue: '#60a5fa', pink: '#f472b6', purple: '#c084fc' }[key] }}
            />
          ))}
        </div>
      </div>
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Highlighted text..."
        className="w-full bg-transparent outline-none resize-none text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400"
        rows={2}
        onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
      />
    </div>
  );
}
