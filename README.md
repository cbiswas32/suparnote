# SuparNote 📝

A feature-rich, block-based note-taking app built with **Vite + React + Tailwind CSS + Supabase**.

## 🚀 Getting Started

### 1. Setup Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema (see below) in your Supabase SQL editor
3. Copy your project URL and anon key

### 2. Configure Environment


### 3. Install & Run

```bash
npm install
npm run dev
```

## 📁 Project Structure

```
src/
├── features/               # Feature-based modules
│   ├── notes/
│   │   ├── components/    # NotesList, NoteEditor, NoteCard, blocks/
│   │   ├── hooks/         # Custom hooks
│   │   └── services/      # notesService.js (Supabase calls)
│   ├── folders/
│   │   └── services/      # foldersService.js
│   ├── tags/
│   │   └── services/      # tagsService.js
│   └── auth/
│       ├── components/    # AuthPage
│       └── services/      # authService.js
├── components/
│   ├── ui/                # Button, Input, Modal
│   └── layout/            # AppLayout, Sidebar
├── store/                 # Zustand stores
│   ├── authStore.js
│   ├── notesStore.js
│   ├── foldersStore.js
│   └── themeStore.js
├── lib/
│   └── supabase.js        # Supabase client
└── utils/
    └── blockTypes.js      # Block definitions & factory
```

## 🧩 Block Types

| Block | Description |
|-------|-------------|
| Heading 1/2/3 | Section titles |
| Paragraph | Normal text |
| Bold / Italic | Styled text |
| Important | Warning/Info/Success/Tip callouts |
| Quote | Blockquote |
| Code Block | Syntax-highlighted code with language selector |
| Highlight | Color-highlighted text (5 colors) |
| Q & A | Accordion question & answer |
| Table | Dynamic rows/columns table |
| Checklist | Interactive todo list |
| Bullet List | Unordered list |
| Divider | Visual separator |

## ✨ Features

- **Drag & drop** blocks within the editor
- **Arrangement dialog** for quick reordering
- **Dark / Light theme** with persistence
- **Auto-save** with debounce
- **Folder organization**
- **Pin, archive, delete** notes
- **Mobile responsive** layout
- **JSON storage** of blocks in Supabase

## 🗄️ Supabase Schema

Tables required: `notes`, `folders`, `tags`, `tag_note_map`

Note content is stored as a JSON array in `notes.note` column with block objects ordered by `sort_order`.
