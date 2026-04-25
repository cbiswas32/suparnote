import { Archive, Pin, Trash2, Edit3, Clock } from 'lucide-react';
import { notesService } from '../services/notesService';
import clsx from 'clsx';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getPreview(noteJson) {
  const blocks = notesService.parseBlocks(noteJson);
  for (const block of blocks) {
    if (block.content && block.content.trim()) return block.content.trim().slice(0, 120);
    if (block.question && block.question.trim()) return block.question.trim().slice(0, 120);
    if (block.items?.length) return block.items.map((i) => i.text).filter(Boolean).join(', ').slice(0, 120);
  }
  return 'No content yet...';
}

export function NoteCard({ note, onSelect, onUpdate, onDelete }) {
  const preview = getPreview(note.note);
  const blockCount = notesService.parseBlocks(note.note).length;

  return (
    <div
      onClick={() => onSelect(note)}
      className={clsx(
        'group relative p-4 rounded-2xl border cursor-pointer transition-all duration-150 bg-white dark:bg-slate-800/60',
        note.is_pinned
          ? 'border-brand-300 dark:border-brand-700 shadow-sm shadow-brand-100 dark:shadow-brand-900/20'
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm'
      )}
    >
      {note.is_pinned && (
        <div className="absolute top-2.5 right-2.5">
          <Pin size={12} className="text-brand-500 fill-brand-500" />
        </div>
      )}

      <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate pr-6">{note.title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{preview}</p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock size={10} />
          <span>{formatDate(note.updated_at || note.created_at)}</span>
          {blockCount > 0 && <span className="ml-1.5 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">{blockCount} blocks</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 p-0.5">
        <button
          onClick={(e) => { e.stopPropagation(); onUpdate(note.id, { isPinned: !note.is_pinned }); }}
          className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-brand-500 transition-colors"
          title={note.is_pinned ? 'Unpin' : 'Pin'}
        >
          <Pin size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onUpdate(note.id, { isArchived: !note.is_archived }); }}
          className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-amber-500 transition-colors"
          title="Archive"
        >
          <Archive size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
          className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors"
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
