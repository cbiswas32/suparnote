export const BLOCK_TYPES = {
  HEADING1: 'heading1',
  HEADING2: 'heading2',
  HEADING3: 'heading3',
  TEXT: 'text',
  BOLD: 'bold',
  ITALIC: 'italic',
  IMPORTANT: 'important',
  CODE: 'code',
  HIGHLIGHT: 'highlight',
  QA: 'qa',
  TABLE: 'table',
  DIVIDER: 'divider',
  QUOTE: 'quote',
  CHECKLIST: 'checklist',
  BULLET_LIST: 'bullet_list',
};

export const BLOCK_DEFINITIONS = [
  { type: BLOCK_TYPES.HEADING1, label: 'Heading 1', icon: 'H1', description: 'Large section title', category: 'text' },
  { type: BLOCK_TYPES.HEADING2, label: 'Heading 2', icon: 'H2', description: 'Medium section title', category: 'text' },
  { type: BLOCK_TYPES.HEADING3, label: 'Heading 3', icon: 'H3', description: 'Small section title', category: 'text' },
  { type: BLOCK_TYPES.TEXT, label: 'Paragraph', icon: 'P', description: 'Normal text block', category: 'text' },
  { type: BLOCK_TYPES.BOLD, label: 'Bold Text', icon: 'B', description: 'Emphasized bold text', category: 'text' },
  { type: BLOCK_TYPES.ITALIC, label: 'Italic Text', icon: 'I', description: 'Styled italic text', category: 'text' },
  { type: BLOCK_TYPES.IMPORTANT, label: 'Important', icon: '!', description: 'Highlighted important note', category: 'callout' },
  { type: BLOCK_TYPES.QUOTE, label: 'Quote', icon: '"', description: 'Blockquote', category: 'callout' },
  { type: BLOCK_TYPES.CODE, label: 'Code Block', icon: '</>', description: 'Monospace code section', category: 'code' },
  { type: BLOCK_TYPES.HIGHLIGHT, label: 'Highlight', icon: 'HL', description: 'Color-highlighted text', category: 'text' },
  { type: BLOCK_TYPES.QA, label: 'Q & A', icon: 'Q&A', description: 'Accordion question & answer', category: 'interactive' },
  { type: BLOCK_TYPES.TABLE, label: 'Table', icon: '⊞', description: 'Simple data table', category: 'data' },
  { type: BLOCK_TYPES.CHECKLIST, label: 'Checklist', icon: '✓', description: 'Interactive checklist', category: 'interactive' },
  { type: BLOCK_TYPES.BULLET_LIST, label: 'Bullet List', icon: '•', description: 'Unordered list', category: 'text' },
  { type: BLOCK_TYPES.DIVIDER, label: 'Divider', icon: '—', description: 'Horizontal separator', category: 'layout' },
];

export const createBlock = (type) => {
  const base = { id: crypto.randomUUID(), type, sort_order: Date.now() };
  switch (type) {
    case BLOCK_TYPES.HEADING1:
    case BLOCK_TYPES.HEADING2:
    case BLOCK_TYPES.HEADING3:
    case BLOCK_TYPES.TEXT:
    case BLOCK_TYPES.BOLD:
    case BLOCK_TYPES.ITALIC:
    case BLOCK_TYPES.QUOTE:
      return { ...base, content: '' };
    case BLOCK_TYPES.IMPORTANT:
      return { ...base, content: '', variant: 'warning' };
    case BLOCK_TYPES.CODE:
      return { ...base, content: '', language: 'javascript' };
    case BLOCK_TYPES.HIGHLIGHT:
      return { ...base, content: '', color: 'yellow' };
    case BLOCK_TYPES.QA:
      return { ...base, question: '', answer: '' };
    case BLOCK_TYPES.TABLE:
      return { ...base, headers: ['Column 1', 'Column 2'], rows: [['', '']] };
    case BLOCK_TYPES.CHECKLIST:
      return { ...base, items: [{ id: crypto.randomUUID(), text: '', checked: false }] };
    case BLOCK_TYPES.BULLET_LIST:
      return { ...base, items: [{ id: crypto.randomUUID(), text: '' }] };
    case BLOCK_TYPES.DIVIDER:
      return { ...base };
    default:
      return { ...base, content: '' };
  }
};
