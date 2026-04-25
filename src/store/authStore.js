import { create } from 'zustand';
import { authService } from '../features/auth/services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  init: async () => {
    const session = await authService.getSession();
    set({ session, user: session?.user ?? null, loading: false });
    authService.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },

  signIn: async (email, password) => {
    const data = await authService.signIn({ email, password });
    set({ session: data.session, user: data.user });
    return data;
  },

  signUp: async (email, password) => {
    return authService.signUp({ email, password });
  },

  signOut: async () => {
    await authService.signOut();
    set({ session: null, user: null });
  },
}));
