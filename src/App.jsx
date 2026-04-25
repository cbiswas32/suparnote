import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { AppLayout } from './components/layout/AppLayout';
import { AuthPage } from './features/auth/components/AuthPage';
import { NotesList } from './features/notes/components/NotesList';

/* ---------- Protected Route ---------- */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-ink">
        <div
          className="w-8 h-8 border-4 rounded-full animate-spin"
          style={{
            borderColor: 'var(--brand)',
            borderTopColor: 'transparent',
          }}
        />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return children;
}

/* ---------- App ---------- */
export default function App() {
  const { init } = useAuthStore();
  const initTheme = useThemeStore((s) => s.initTheme);

  useEffect(() => {
    initTheme(); // apply theme first
    init();      // then auth
  }, []);

  return (
    <div className="bg-paper text-ink min-h-screen">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NotesList />} />
          <Route path="archived" element={<NotesList archived />} />
          <Route path="trash" element={<NotesList trash />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}