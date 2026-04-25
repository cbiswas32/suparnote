import { create } from 'zustand';
import { notesService } from '../features/notes/services/notesService';

export const useNotesStore = create((set, get) => ({
  notes: [],
  activeNote: null,
  loading: false,
  error: null,

  fetchNotes: async ({ userId, folderId = null }) => {
    set({ loading: true, error: null });
    try {
      const notes = await notesService.getAll({ userId, folderId });
      set({ notes, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setActiveNote: (note) => set({ activeNote: note }),

  createNote: async ({ userId, title, folderId = null }) => {
    const note = await notesService.create({ userId, title, folderId });
    set((s) => ({ notes: [note, ...s.notes], activeNote: note }));
    return note;
  },

  updateNote: async (id, updates) => {
    const updated = await notesService.update(id, updates);
    set((s) => ({
      notes: s.notes.map((n) => (n.id === id ? updated : n)),
      activeNote: s.activeNote?.id === id ? updated : s.activeNote,
    }));
    return updated;
  },

  deleteNote: async (id) => {
    await notesService.delete(id);
    set((s) => ({
      notes: s.notes.filter((n) => n.id !== id),
      activeNote: s.activeNote?.id === id ? null : s.activeNote,
    }));
  },
}));
