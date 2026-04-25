import { create } from 'zustand';
import { foldersService } from '../features/folders/services/foldersService';

export const useFoldersStore = create((set) => ({
  folders: [],
  activeFolderId: null,
  loading: false,

  fetchFolders: async (userId) => {
    set({ loading: true });
    try {
      const folders = await foldersService.getAll(userId);
      set({ folders, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },

  setActiveFolder: (id) => set({ activeFolderId: id }),

  createFolder: async ({ userId, folderName, folderDesc }) => {
    const folder = await foldersService.create({ userId, folderName, folderDesc });
    set((s) => ({ folders: [...s.folders, folder] }));
    return folder;
  },

  deleteFolder: async (id) => {
    await foldersService.delete(id);
    set((s) => ({ folders: s.folders.filter((f) => f.id !== id) }));
  },
}));
