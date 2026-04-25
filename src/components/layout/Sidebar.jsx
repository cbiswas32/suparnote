import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Folder, Tag, Archive, Trash2, Settings, Moon, Sun, Plus, ChevronRight, ChevronDown, X } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { useFoldersStore } from '../../store/foldersStore';
import { useNotesStore } from '../../store/notesStore';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import clsx from 'clsx';
import SUPAR_NOTE_ICON from '../../assets/suparnote.ico'

export function Sidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useThemeStore();
  const { user, signOut } = useAuthStore();
  const { folders, activeFolderId, setActiveFolder, createFolder } = useFoldersStore();
  const { fetchNotes } = useNotesStore();
  const navigate = useNavigate();
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [creating, setCreating] = useState(false);

  const handleFolderClick = (id) => {
    setActiveFolder(id);
    if (user) fetchNotes({ userId: user.id, folderId: id });
    navigate('/');
    onClose?.();
  };

  const handleAllNotes = () => {
    setActiveFolder(null);
    if (user) fetchNotes({ userId: user.id });
    navigate('/');
    onClose?.();
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim() || !user) return;
    setCreating(true);
    try {
      await createFolder({ userId: user.id, folderName: folderName.trim() });
      setFolderName('');
      setShowCreateFolder(false);
    } finally {
      setCreating(false);
    }
  };

  const navItem = (icon, label, onClick, active) => (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
        active ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={onClose} />}
      <aside className={clsx(
        'fixed md:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <img src={SUPAR_NOTE_ICON}></img>
            </div>
            <span className="font-display font-700 text-lg tracking-tight">SuparNote</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden text-slate-500">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItem(<FileText size={16} />, 'All Notes', handleAllNotes, !activeFolderId)}

          {/* Folders */}
          <div>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={() => setFoldersOpen(!foldersOpen)}
                className="flex items-center gap-2 text-xs font-600 text-slate-400 dark:text-slate-500 uppercase tracking-wider hover:text-slate-600 dark:hover:text-slate-300"
              >
                {foldersOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                Folders
              </button>
              <button onClick={() => setShowCreateFolder(true)} className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
                <Plus size={14} />
              </button>
            </div>
            {foldersOpen && (
              <div className="space-y-0.5 mt-1">
                {folders.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFolderClick(f.id)}
                    className={clsx(
                      'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-all',
                      activeFolderId === f.id ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <Folder size={14} />
                    <span className="truncate">{f.folder_name}</span>
                  </button>
                ))}
                {folders.length === 0 && <p className="px-3 py-2 text-xs text-slate-400 dark:text-slate-600">No folders yet</p>}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1">
            {navItem(<Archive size={16} />, 'Archived', () => { navigate('/archived'); onClose?.(); })}
            {navItem(<Trash2 size={16} />, 'Trash', () => { navigate('/trash'); onClose?.(); })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 border-t border-slate-100 dark:border-slate-800 pt-3">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800">
            <div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{user?.email}</p>
              <p className="text-xs text-slate-400">Logged in</p>
            </div>
            <button onClick={signOut} className="text-xs text-red-400 hover:text-red-500 transition-colors">Sign out</button>
          </div>
        </div>
      </aside>

      <Modal isOpen={showCreateFolder} onClose={() => setShowCreateFolder(false)} title="New Folder">
        <div className="space-y-4">
          <Input label="Folder name" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="e.g. Work, Personal..." onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()} autoFocus />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowCreateFolder(false)}>Cancel</Button>
            <Button onClick={handleCreateFolder} loading={creating} disabled={!folderName.trim()}>Create</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
