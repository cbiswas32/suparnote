import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Folder,
  Tag,
  Archive,
  Trash2,
  Settings,
  Plus,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { useFoldersStore } from "../../store/foldersStore";
import { useNotesStore } from "../../store/notesStore";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import clsx from "clsx";
import SUPAR_NOTE_ICON from "../../assets/suparnote.ico";

export function Sidebar({ isOpen, onClose }) {
  const { user, signOut } = useAuthStore();
  const { folders, activeFolderId, setActiveFolder, createFolder } =
    useFoldersStore();
  const { fetchNotes } = useNotesStore();
  const navigate = useNavigate();

  const [foldersOpen, setFoldersOpen] = useState(true);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creating, setCreating] = useState(false);

  const handleFolderClick = (id) => {
    setActiveFolder(id);
    if (user) fetchNotes({ userId: user.id, folderId: id });
    navigate("/");
    onClose?.();
  };

  const handleAllNotes = () => {
    setActiveFolder(null);
    if (user) fetchNotes({ userId: user.id });
    navigate("/");
    onClose?.();
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim() || !user) return;
    setCreating(true);
    try {
      await createFolder({ userId: user.id, folderName: folderName.trim() });
      setFolderName("");
      setShowCreateFolder(false);
    } finally {
      setCreating(false);
    }
  };

  // ── Nav item helper ──────────────────────────────────────
  const navItem = (icon, label, onClick, active) => (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150"
      style={{
        backgroundColor: active ? "var(--brand-bg)" : "transparent",
        color: active ? "var(--brand)" : "var(--ink-muted)",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "var(--brand-bg)";
          e.currentTarget.style.color = "var(--ink)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--ink-muted)";
        }
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed md:static inset-y-0 left-0 z-40 w-72 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        style={{
          backgroundColor: "var(--paper-2)",
          borderRight: "1px solid var(--paper-line)",
        }}
      >
        {/* ── Logo ── */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--paper-line)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "var(--brand)" }}
            >
              <img
                src={SUPAR_NOTE_ICON}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="font-sans font-semibold text-lg tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              SuparNote
            </span>
          </div>

          <div className="flex items-center gap-1">
            <ThemeSwitcher />
            <button
              onClick={onClose}
              className="p-2 rounded-lg md:hidden transition-colors duration-150"
              style={{ color: "var(--ink-faint)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--brand-bg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItem(
            <FileText size={16} />,
            "All Notes",
            handleAllNotes,
            !activeFolderId
          )}

          {/* Folders section */}
          <div>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={() => setFoldersOpen(!foldersOpen)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-150"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink-muted)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-faint)")
                }
              >
                {foldersOpen ? (
                  <ChevronDown size={12} />
                ) : (
                  <ChevronRight size={12} />
                )}
                Folders
              </button>

              <button
                onClick={() => setShowCreateFolder(true)}
                className="p-1 rounded-md transition-colors duration-150"
                style={{ color: "var(--ink-faint)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--brand-bg)";
                  e.currentTarget.style.color = "var(--brand)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--ink-faint)";
                }}
              >
                <Plus size={14} />
              </button>
            </div>

            {foldersOpen && (
              <div className="space-y-0.5 mt-1">
                {folders.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFolderClick(f.id)}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-colors duration-150"
                    style={{
                      backgroundColor:
                        activeFolderId === f.id
                          ? "var(--brand-bg)"
                          : "transparent",
                      color:
                        activeFolderId === f.id
                          ? "var(--brand)"
                          : "var(--ink-muted)",
                    }}
                    onMouseEnter={(e) => {
                      if (activeFolderId !== f.id) {
                        e.currentTarget.style.backgroundColor =
                          "var(--brand-bg)";
                        e.currentTarget.style.color = "var(--ink)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFolderId !== f.id) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--ink-muted)";
                      }
                    }}
                  >
                    <Folder size={14} />
                    <span className="truncate">{f.folder_name}</span>
                  </button>
                ))}

                {folders.length === 0 && (
                  <p
                    className="px-3 py-2 text-xs"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    No folders yet
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom nav */}
          <div
            className="pt-2 mt-2 space-y-1"
            style={{ borderTop: "1px solid var(--paper-line)" }}
          >
            {navItem(<Archive size={16} />, "Archived", () => {
              navigate("/archived");
              onClose?.();
            })}
            {navItem(<Trash2 size={16} />, "Trash", () => {
              navigate("/trash");
              onClose?.();
            })}
          </div>
        </nav>

        {/* ── Footer ── */}
        <div
          className="px-3 pb-4 pt-3"
          style={{ borderTop: "1px solid var(--paper-line)" }}
        >
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid var(--paper-line)",
            }}
          >
            <div className="min-w-0">
              <p
                className="text-xs font-medium truncate max-w-[140px]"
                style={{ color: "var(--ink)" }}
              >
                {user?.email}
              </p>
              <p className="text-xs" style={{ color: "var(--ink-faint)" }}>
                Logged in
              </p>
            </div>

            <button
              className="text-xs transition-colors duration-150 flex-shrink-0"
              onClick={signOut}
              style={{ color: "var(--accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── Create folder modal ── */}
      <Modal
        isOpen={showCreateFolder}
        onClose={() => setShowCreateFolder(false)}
        title="New Folder"
      >
        <div className="space-y-4">
          <Input
            label="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="e.g. Work, Personal..."
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setShowCreateFolder(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              loading={creating}
              disabled={!folderName.trim()}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
