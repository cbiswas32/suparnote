import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useAuthStore } from "../../store/authStore";
import { useFoldersStore } from "../../store/foldersStore";
import { useNotesStore } from "../../store/notesStore";

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
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header
          className="md:hidden flex items-center gap-3 px-4 py-3 border-b"
          style={{
            backgroundColor: "var(--paper-2)",
            borderColor: "var(--paper-line)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg transition-colors duration-150"
            style={{ color: "var(--ink-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--brand-bg)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Menu size={18} />
          </button>

          <span
            className="font-sans font-semibold text-base"
            style={{ color: "var(--ink)" }}
          >
            SuparNote
          </span>
        </header>

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
