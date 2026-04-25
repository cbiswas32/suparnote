import { useState } from 'react';
import { Search, Plus, SlidersHorizontal } from 'lucide-react';
import { useNotesStore } from '../../../store/notesStore';
import { useAuthStore } from '../../../store/authStore';
import { useFoldersStore } from '../../../store/foldersStore';
import { NoteCard } from './NoteCard';
import { NoteEditor } from './NoteEditor';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';

export function NotesList() {
  const { user } = useAuthStore();
  const { notes, loading, activeNote, setActiveNote, createNote, updateNote, deleteNote } = useNotesStore();
  const { activeFolderId, folders } = useFoldersStore();
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);

  const activeFolder = folders.find((f) => f.id === activeFolderId);

  const filtered = notes.filter((n) => {
    if (search) return n.title.toLowerCase().includes(search.toLowerCase());
    return true;
  });

  const pinned = filtered.filter((n) => n.is_pinned);
  const unpinned = filtered.filter((n) => !n.is_pinned);

  const handleCreate = async () => {
    if (!newTitle.trim() || !user) return;
    setCreating(true);
    try {
      const note = await createNote({ userId: user.id, title: newTitle.trim(), folderId: activeFolderId });
      setNewTitle('');
      setShowCreate(false);
      setActiveNote(note);
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id, updates) => {
    await updateNote(id, updates);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
  };

  if (activeNote) {
    return <NoteEditor note={activeNote} onBack={() => setActiveNote(null)} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="font-bold text-lg text-slate-900 dark:text-slate-100">
            {activeFolder ? activeFolder.folder_name : 'All Notes'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setShowCreate(true)} size="sm">
          <Plus size={15} /> New Note
        </Button>
      </div>

      {/* Search */}
      <div className="px-5 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/30 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <SlidersHorizontal size={24} className="text-slate-300 dark:text-slate-600" />
            </div>
            <p className="font-medium text-slate-500 dark:text-slate-400">
              {search ? 'No notes match your search' : 'No notes yet'}
            </p>
            {!search && (
              <Button onClick={() => setShowCreate(true)} size="sm" className="mt-4">
                <Plus size={14} /> Create your first note
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {pinned.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3 px-0.5">Pinned</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {pinned.map((note) => (
                    <NoteCard key={note.id} note={note} onSelect={setActiveNote} onUpdate={handleUpdate} onDelete={handleDelete} />
                  ))}
                </div>
              </div>
            )}
            {unpinned.length > 0 && (
              <div>
                {pinned.length > 0 && <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3 px-0.5">Notes</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {unpinned.map((note) => (
                    <NoteCard key={note.id} note={note} onSelect={setActiveNote} onUpdate={handleUpdate} onDelete={handleDelete} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="New Note">
        <div className="space-y-4">
          <Input
            label="Note title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="My awesome note..."
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          {activeFolderId && (
            <p className="text-xs text-slate-500">Will be added to: <span className="font-medium text-slate-700 dark:text-slate-300">{activeFolder?.folder_name}</span></p>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} loading={creating} disabled={!newTitle.trim()}>Create & Edit</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
