import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { BLOCK_DEFINITIONS } from '../../../utils/blockTypes';

function SortableItem({ block }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const def = BLOCK_DEFINITIONS.find((d) => d.type === block.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${isDragging ? 'shadow-xl opacity-80' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-600">
        <GripVertical size={16} />
      </div>
      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
        {def?.label || block.type}
      </span>
      <span className="text-xs text-slate-400 truncate flex-1">
        {block.content || block.question || (block.items ? `${block.items.length} items` : '')}
      </span>
    </div>
  );
}

export function ArrangementDialog({ isOpen, onClose, blocks, onApply }) {
  const [localBlocks, setLocalBlocks] = useState(blocks);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = localBlocks.findIndex((b) => b.id === active.id);
    const newIdx = localBlocks.findIndex((b) => b.id === over.id);
    setLocalBlocks(arrayMove(localBlocks, oldIdx, newIdx));
  };

  const handleApply = () => {
    const reordered = localBlocks.map((b, i) => ({ ...b, sort_order: i }));
    onApply(reordered);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Arrange Blocks" size="md">
      <div className="space-y-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">Drag blocks to reorder them in your note.</p>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={localBlocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {localBlocks.map((block) => (
                <SortableItem key={block.id} block={block} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleApply}>Apply Order</Button>
        </div>
      </div>
    </Modal>
  );
}
