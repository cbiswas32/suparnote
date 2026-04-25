import { BLOCK_TYPES } from '../../../../utils/blockTypes';
import { HeadingBlock } from './HeadingBlock';
import { TextBlock } from './TextBlock';
import { ImportantBlock } from './ImportantBlock';
import { CodeBlock } from './CodeBlock';
import { HighlightBlock } from './HighlightBlock';
import { QABlock } from './QABlock';
import { TableBlock } from './TableBlock';
import { ChecklistBlock } from './ChecklistBlock';
import { BulletListBlock } from './BulletListBlock';
import { DividerBlock } from './DividerBlock';

export function BlockRenderer({ block, onChange }) {
  switch (block.type) {
    case BLOCK_TYPES.HEADING1:
    case BLOCK_TYPES.HEADING2:
    case BLOCK_TYPES.HEADING3:
      return <HeadingBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.TEXT:
    case BLOCK_TYPES.BOLD:
    case BLOCK_TYPES.ITALIC:
    case BLOCK_TYPES.QUOTE:
      return <TextBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.IMPORTANT:
      return <ImportantBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.CODE:
      return <CodeBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.HIGHLIGHT:
      return <HighlightBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.QA:
      return <QABlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.TABLE:
      return <TableBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.CHECKLIST:
      return <ChecklistBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.BULLET_LIST:
      return <BulletListBlock block={block} onChange={onChange} />;
    case BLOCK_TYPES.DIVIDER:
      return <DividerBlock />;
    default:
      return <p className="text-sm text-slate-400">Unknown block type</p>;
  }
}
