import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function QABlock({ block, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-start gap-2 p-4 bg-slate-50 dark:bg-slate-800/50">
        <button onClick={() => setOpen(!open)} className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        <div className="flex-1">
          <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide">Q</span>
          <textarea
            value={block.question}
            onChange={(e) => onChange({ question: e.target.value })}
            placeholder="Type your question here..."
            className="w-full bg-transparent outline-none resize-none text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-600 mt-1"
            rows={1}
            onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
          />
        </div>
      </div>
      {open && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50">
          <span className="text-xs font-semibold text-green-500 uppercase tracking-wide">A</span>
          <textarea
            value={block.answer}
            onChange={(e) => onChange({ answer: e.target.value })}
            placeholder="Write the answer here..."
            className="w-full bg-transparent outline-none resize-none text-sm text-slate-700 dark:text-slate-300 placeholder-slate-300 dark:placeholder-slate-600 mt-1"
            rows={2}
            onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
          />
        </div>
      )}
    </div>
  );
}
