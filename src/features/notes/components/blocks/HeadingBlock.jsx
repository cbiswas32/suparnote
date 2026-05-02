import { BLOCK_TYPES } from "../../../../utils/blockTypes";

export function HeadingBlock({ block, onChange }) {
  const styles = {
    [BLOCK_TYPES.HEADING1]: "text-3xl font-extrabold leading-tight",
    [BLOCK_TYPES.HEADING2]: "text-xl font-bold",
    [BLOCK_TYPES.HEADING3]: "text-base font-semibold",
  };

  return (
    <textarea
      value={block.content}
      onChange={(e) => onChange({ content: e.target.value })}
      placeholder={
        block.type === BLOCK_TYPES.HEADING1
          ? "Heading 1"
          : block.type === BLOCK_TYPES.HEADING2
          ? "Heading 2"
          : "Heading 3"
      }
      className={`w-full bg-transparent outline-none resize-none font-sans ${
        styles[block.type]
      }`}
      style={{ color: "var(--ink)" }}
      rows={1}
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
    />
  );
}
