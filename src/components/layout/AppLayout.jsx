import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/authStore';
import { useFoldersStore } from '../../store/foldersStore';
import { useNotesStore } from '../../store/notesStore';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const { fetchFolders } = useFoldersStore();
  const { fetchNotes } = useNotesStore();

  useEffect(() => {
    if (user) {
      fetchFolders(user.id);
      fetchNotes({ userId: user.id });
    }
  }, [user]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0f1117]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <Menu size={18} />
          </button>
          <span className="font-display font-700 text-base">SuparNote</span>
        </header>
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
