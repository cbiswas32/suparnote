import { useState, useMemo } from "react";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { useNotesStore } from "../../../store/notesStore";
import { useAuthStore } from "../../../store/authStore";
import { useFoldersStore } from "../../../store/foldersStore";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";

export function NotesList() {
  const { user } = useAuthStore();
  const {
    notes,
    loading,
    activeNote,
    setActiveNote,
    createNote,
    updateNote,
    deleteNote,
  } = useNotesStore();
  const { activeFolderId, folders } = useFoldersStore();

  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const activeFolder = folders.find((f) => f.id === activeFolderId);

  const filtered = useMemo(() => {
    if (!search) return notes;
    return notes.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  const pinned = filtered.filter((n) => n.is_pinned);
  const unpinned = filtered.filter((n) => !n.is_pinned);

  const handleCreate = async () => {
    if (!newTitle.trim() || !user) return;
    setCreating(true);
    try {
      const note = await createNote({
        userId: user.id,
        title: newTitle.trim(),
        folderId: activeFolderId,
      });
      setNewTitle("");
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
    <div className="flex flex-col h-full min-h-0">
      <div
        className="sticky top-0 z-10 backdrop-blur border-b"
        style={{
          backgroundColor: "var(--paper)",
          borderColor: "var(--paper-line)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h1
              className="font-semibold text-lg"
              style={{ color: "var(--ink)" }}
            >
              {activeFolder ? activeFolder.folder_name : "All Notes"}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--ink-faint)" }}>
              {notes.length} note{notes.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowCreate(true)}
            size="sm"
          >
            <Plus size={15} /> New
          </Button>
        </div>

        <div className="px-5 pb-4">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--ink-faint)" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--paper-2)",
                borderColor: "var(--paper-line)",
                color: "var(--ink)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 min-h-0">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl animate-pulse"
                style={{ backgroundColor: "var(--paper-2)" }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: "var(--paper-2)" }}
            >
              <SlidersHorizontal
                size={22}
                style={{ color: "var(--ink-faint)" }}
              />
            </div>

            <p style={{ color: "var(--ink-muted)" }}>
              {search ? "No notes found" : "No notes yet"}
            </p>

            {!search && (
              <Button
                onClick={() => setShowCreate(true)}
                size="sm"
                className="mt-4"
              >
                <Plus size={14} /> Create your first note
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {pinned.length > 0 && (
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-3"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Pinned
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {pinned.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onSelect={setActiveNote}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}

            {unpinned.length > 0 && (
              <div>
                {pinned.length > 0 && (
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-3"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    Notes
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {unpinned.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onSelect={setActiveNote}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="New Note"
      >
        <div className="space-y-4">
          <Input
            label="Note title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="My awesome note..."
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />

          {activeFolderId && (
            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
              Will be added to{" "}
              <span style={{ color: "var(--ink)" }}>
                {activeFolder?.folder_name}
              </span>
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button
              className="
              px-4 py-2 rounded-md
              border
              transition-all duration-150
              bg-[var(--paper-2)]
              text-[var(--ink)]
              border-[var(--paper-line)]
              hover:bg-[var(--brand-bg)]
              hover:text-[var(--brand)]
              active:scale-[0.98]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
              onClick={handleCreate}
              loading={creating}
              disabled={!newTitle.trim()}
            >
              Create & Edit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
