import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'css', 'html', 'sql', 'bash', 'json', 'markdown', 'go', 'rust', 'php'];

export function CodeBlock({ block, onChange }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(block.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800">
        <select
          value={block.language || 'javascript'}
          onChange={(e) => onChange({ language: e.target.value })}
          className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-transparent border-none outline-none cursor-pointer"
        >
          {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
        </select>
        <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="// Write your code here..."
        className="w-full bg-[#1e2030] text-green-400 p-4 font-mono text-sm outline-none resize-none leading-relaxed"
        rows={4}
        onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
        spellCheck={false}
      />
    </div>
  );
}
