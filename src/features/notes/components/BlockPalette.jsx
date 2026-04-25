import { useDraggable } from '@dnd-kit/core';
import { BLOCK_DEFINITIONS } from '../../../utils/blockTypes';
import clsx from 'clsx';

const iconMap = {
  H1: <span className="font-bold text-base">H1</span>,
  H2: <span className="font-bold text-sm">H2</span>,
  H3: <span className="font-bold text-xs">H3</span>,
  P: <span className="text-sm">¶</span>,
  B: <span className="font-bold text-sm">B</span>,
  I: <span className="italic text-sm">I</span>,
  '!': <span className="text-sm">⚠</span>,
  '"': <span className="text-sm">"</span>,
  '</>': <span className="text-xs font-mono">{`</>`}</span>,
  HL: <span className="text-xs bg-yellow-300 dark:bg-yellow-700 px-1 rounded">HL</span>,
  'Q&A': <span className="text-xs">Q&A</span>,
  '⊞': <span className="text-sm">⊞</span>,
  '✓': <span className="text-sm">✓</span>,
  '•': <span className="text-sm font-bold">•</span>,
  '—': <span className="text-sm">—</span>,
};

const categories = [
  { key: 'text', label: 'Text' },
  { key: 'callout', label: 'Callout' },
  { key: 'code', label: 'Code' },
  { key: 'interactive', label: 'Interactive' },
  { key: 'data', label: 'Data' },
  { key: 'layout', label: 'Layout' },
];

function DraggablePaletteItem({ definition, onAdd }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${definition.type}`,
    data: { type: 'palette', blockType: definition.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onAdd(definition.type)}
      className={clsx(
        'flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-grab active:cursor-grabbing select-none transition-all duration-150 group',
        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
        'hover:border-brand-400 hover:shadow-sm hover:bg-brand-50 dark:hover:bg-brand-900/20',
        isDragging && 'opacity-50 scale-95'
      )}
      title={definition.description}
    >
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 flex-shrink-0 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/40 transition-colors">
        {iconMap[definition.icon] || <span className="text-sm">{definition.icon}</span>}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{definition.label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{definition.description}</p>
      </div>
    </div>
  );
}

export function BlockPalette({ onAdd }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Blocks</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Drag or click to add</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {categories.map((cat) => {
          const defs = BLOCK_DEFINITIONS.filter((d) => d.category === cat.key);
          if (!defs.length) return null;
          return (
            <div key={cat.key}>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2 px-1">{cat.label}</p>
              <div className="space-y-1">
                {defs.map((def) => (
                  <DraggablePaletteItem key={def.type} definition={def} onAdd={onAdd} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
