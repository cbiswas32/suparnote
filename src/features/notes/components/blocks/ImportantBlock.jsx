import { AlertTriangle, Info, CheckCircle, Zap } from 'lucide-react';

const variants = {
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-400', text: 'text-amber-700 dark:text-amber-300', label: 'Warning' },
  info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-400', text: 'text-blue-700 dark:text-blue-300', label: 'Info' },
  success: { icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-400', text: 'text-green-700 dark:text-green-300', label: 'Success' },
  tip: { icon: Zap, bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-400', text: 'text-purple-700 dark:text-purple-300', label: 'Tip' },
};

export function ImportantBlock({ block, onChange }) {
  const v = variants[block.variant] || variants.warning;
  const Icon = v.icon;

  return (
    <div className={`rounded-xl border-l-4 ${v.border} ${v.bg} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={v.text} />
        <select
          value={block.variant || 'warning'}
          onChange={(e) => onChange({ variant: e.target.value })}
          className={`text-xs font-semibold bg-transparent border-none outline-none cursor-pointer ${v.text}`}
        >
          {Object.entries(variants).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Write your important note here..."
        className={`w-full bg-transparent outline-none resize-none text-sm ${v.text} placeholder-current/40`}
        rows={2}
        onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
      />
    </div>
  );
}
