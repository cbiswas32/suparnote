import clsx from 'clsx';
import { BLOCK_TYPES } from '../../../../utils/blockTypes';

export function TextBlock({ block, onChange }) {
  const styles = {
    [BLOCK_TYPES.TEXT]: 'text-sm leading-relaxed text-slate-700 dark:text-slate-300',
    [BLOCK_TYPES.BOLD]: 'text-sm font-bold text-slate-900 dark:text-slate-100',
    [BLOCK_TYPES.ITALIC]: 'text-sm italic text-slate-700 dark:text-slate-300',
    [BLOCK_TYPES.QUOTE]: 'text-sm italic text-slate-600 dark:text-slate-400 pl-3 border-l-3 border-brand-400',
  };

  return (
    <textarea
      value={block.content}
      onChange={(e) => onChange({ content: e.target.value })}
      placeholder={block.type === BLOCK_TYPES.BOLD ? 'Bold text...' : block.type === BLOCK_TYPES.ITALIC ? 'Italic text...' : block.type === BLOCK_TYPES.QUOTE ? 'Quote...' : 'Write something...'}
      className={clsx('w-full bg-transparent outline-none resize-none placeholder-slate-300 dark:placeholder-slate-600', styles[block.type])}
      rows={2}
      onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
    />
  );
}
