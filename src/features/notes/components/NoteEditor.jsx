import { useState, useCallback, useEffect, useRef } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Save, Layers, Plus, ChevronLeft, PanelLeftOpen } from 'lucide-react';
import { useNotesStore } from '../../../store/notesStore';
import { notesService } from '../services/notesService';
import { createBlock, BLOCK_DEFINITIONS } from '../../../utils/blockTypes';
import { BlockPalette } from './BlockPalette';
import { NoteBlock } from './NoteBlock';
import { ArrangementDialog } from './ArrangementDialog';
import { Button } from '../../../components/ui/Button';
import clsx from 'clsx';

export function NoteEditor({ note, onBack }) {
  const { updateNote } = useNotesStore();
  const [title, setTitle] = useState(note.title);
  const [blocks, setBlocks] = useState(() => notesService.parseBlocks(note.note));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(true);
  const [showArrange, setShowArrange] = useState(false);
  const [showPalette, setShowPalette] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const saveTimeout = useRef(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Auto-save debounce
  useEffect(() => {
    if (saved) return;
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => handleSave(true), 2000);
    return () => clearTimeout(saveTimeout.current);
  }, [blocks, title, saved]);

  const markDirty = () => setSaved(false);

  const handleSave = useCallback(async (silent = false) => {
    if (!silent) setSaving(true);
    try {
      const sorted = [...blocks].sort((a, b) => a.sort_order - b.sort_order);
      await updateNote(note.id, { title, noteBlocks: sorted });
      setSaved(true);
    } finally {
      if (!silent) setSaving(false);
    }
  }, [blocks, title, note.id, updateNote]);

  const addBlock = (type) => {
    const block = createBlock(type);
    setBlocks((prev) => [...prev, { ...block, sort_order: prev.length }]);
    markDirty();
  };

  const updateBlock = (id, updates) => {
    setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, ...updates } : b));
    markDirty();
  };

  const deleteBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    markDirty();
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    // Drag from palette
    if (active.data.current?.type === 'palette') {
      addBlock(active.data.current.blockType);
      return;
    }

    // Reorder blocks
    if (active.data.current?.type === 'note-block') {
      setBlocks((prev) => {
        const oldIdx = prev.findIndex((b) => b.id === active.id);
        const newIdx = prev.findIndex((b) => b.id === over.id);
        return arrayMove(prev, oldIdx, newIdx).map((b, i) => ({ ...b, sort_order: i }));
      });
      markDirty();
    }
  };

  const sortedBlocks = [...blocks].sort((a, b) => a.sort_order - b.sort_order);
  const activeBlock = activeId ? blocks.find((b) => b.id === activeId) : null;

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors flex-shrink-0">
            <ChevronLeft size={16} />
          </button>
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); markDirty(); }}
            className="font-semibold text-base bg-transparent outline-none text-slate-900 dark:text-slate-100 truncate min-w-0 flex-1"
            placeholder="Untitled Note"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {!saved && <span className="text-xs text-slate-400">Unsaved</span>}
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors md:hidden"
            title="Toggle palette"
          >
            <PanelLeftOpen size={16} />
          </button>
          <Button size="sm" variant="outline" onClick={() => setShowArrange(true)}>
            <Layers size={14} />
            <span className="hidden sm:inline">Arrange</span>
          </Button>
          <Button size="sm" onClick={() => handleSave()} loading={saving}>
            <Save size={14} />
            <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
          </Button>
        </div>
      </div>

      {/* Editor body */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          {/* Block palette - left panel */}
          <div className={clsx(
            'flex-shrink-0 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300',
            showPalette ? 'w-64' : 'w-0',
            'fixed md:static inset-y-0 left-0 z-20 md:z-auto',
            showPalette ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          )}>
            {showPalette && (
              <BlockPalette onAdd={addBlock} />
            )}
          </div>

          {/* Mobile overlay for palette */}
          {showPalette && (
            <div className="fixed inset-0 bg-black/30 z-10 md:hidden" onClick={() => setShowPalette(false)} />
          )}

          {/* Note canvas */}
          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              {sortedBlocks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Plus size={24} className="text-slate-400" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Your note is empty</p>
                  <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Click a block from the left panel or drag it here</p>
                </div>
              )}

              <SortableContext items={sortedBlocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {sortedBlocks.map((block) => (
                    <NoteBlock
                      key={block.id}
                      block={block}
                      onChange={(updates) => updateBlock(block.id, updates)}
                      onDelete={deleteBlock}
                    />
                  ))}
                </div>
              </SortableContext>

              {sortedBlocks.length > 0 && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => addBlock('text')}
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-500 transition-colors py-2 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 hover:border-brand-400 w-full justify-center"
                  >
                    <Plus size={14} /> Add text block
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeBlock && (
            <div className="note-section opacity-90 shadow-2xl rotate-1 max-w-sm">
              <div className="text-xs font-semibold text-brand-500">{BLOCK_DEFINITIONS.find((d) => d.type === activeBlock.type)?.label}</div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <ArrangementDialog
        isOpen={showArrange}
        onClose={() => setShowArrange(false)}
        blocks={sortedBlocks}
        onApply={(reordered) => { setBlocks(reordered); markDirty(); }}
      />
    </div>
  );
}
