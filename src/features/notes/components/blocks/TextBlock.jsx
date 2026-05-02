import React, { useRef, useLayoutEffect } from "react";
import clsx from "clsx";
import { BLOCK_TYPES } from "../../../../utils/blockTypes";

export function TextBlock({ block, onChange }) {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  };

  useLayoutEffect(() => {
    adjustHeight();
  }, [block.content]);

  const getStyle = () => {
    switch (block.type) {
      case BLOCK_TYPES.BOLD:
        return { color: "var(--ink)", fontWeight: 700 };
      case BLOCK_TYPES.ITALIC:
        return { color: "var(--ink-muted)", fontStyle: "italic" };
      case BLOCK_TYPES.QUOTE:
        return {
          color: "var(--ink-muted)",
          fontStyle: "italic",
          paddingLeft: "0.75rem",
          borderLeft: "3px solid var(--brand)",
        };
      default: // TEXT
        return { color: "var(--ink-muted)" };
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={block.content}
      onChange={(e) => onChange({ content: e.target.value })}
      placeholder={
        block.type === BLOCK_TYPES.BOLD
          ? "Bold text..."
          : block.type === BLOCK_TYPES.ITALIC
          ? "Italic text..."
          : block.type === BLOCK_TYPES.QUOTE
          ? "Quote..."
          : "Write something..."
      }
      className="w-full bg-transparent overflow-hidden outline-none resize-none box-border text-sm leading-relaxed"
      style={getStyle()}
      rows={1}
      onInput={adjustHeight}
    />
  );
}
