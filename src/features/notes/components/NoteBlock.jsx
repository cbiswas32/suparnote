import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { BlockRenderer } from './blocks/BlockRenderer';
import clsx from 'clsx';

export function NoteBlock({ block, onChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, data: { type: 'note-block' } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'group relative note-section',
        isDragging && 'opacity-50 z-50 shadow-2xl scale-[1.02]'
      )}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 section-drag-handle text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 rounded cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={14} />
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(block.id)}
        className="absolute right-2 top-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-all"
      >
        <Trash2 size={13} />
      </button>

      {/* Block content */}
      <div className="pl-5 pr-8">
        <BlockRenderer block={block} onChange={onChange} />
      </div>
    </div>
  );
}
