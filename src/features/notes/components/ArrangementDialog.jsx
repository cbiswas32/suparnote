import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { BLOCK_DEFINITIONS } from "../../../utils/blockTypes";

function SortableItem({ block }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const def = BLOCK_DEFINITIONS.find((d) => d.type === block.type);

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
        isDragging ? "shadow-xl opacity-80" : ""
      }`}
      style={{
        ...style,
        backgroundColor: "var(--paper-2)",
        border: "1px solid var(--paper-line)",
        boxShadow: isDragging ? "0 8px 24px var(--shadow)" : "none",
      }}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
        style={{ color: "var(--ink-faint)" }}
      >
        <GripVertical size={16} />
      </div>

      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-md"
        style={{
          backgroundColor: "var(--tag-bg)",
          border: "1px solid var(--tag-border)",
          color: "var(--brand)",
        }}
      >
        {def?.label || block.type}
      </span>

      <span
        className="text-xs truncate flex-1"
        style={{ color: "var(--ink-muted)" }}
      >
        {block.content ||
          block.question ||
          (block.items ? `${block.items.length} items` : "")}
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
        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
          Drag blocks to reorder them in your note.
        </p>

        <div className="notebook p-3 max-h-96 overflow-y-auto">
          <div className="notebook-margin" />

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localBlocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {localBlocks.map((block) => (
                  <SortableItem key={block.id} block={block} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        <div
          className="flex justify-end gap-2 pt-2"
          style={{ borderTop: "1px solid var(--paper-line)" }}
        >
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleApply}>
            Apply Order
          </Button>
        </div>
      </div>
    </Modal>
  );
}
