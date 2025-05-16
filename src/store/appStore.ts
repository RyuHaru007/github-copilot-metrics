// src/store/appStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

interface SidebarState {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (isCollapsed: boolean) => void;
}

interface AppState extends AuthState, SidebarState {}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Auth State
      isLoggedIn: false,
      username: null,
      login: (username) => set({ isLoggedIn: true, username }),
      logout: () => set({ isLoggedIn: false, username: null }),

      // Sidebar State
      isSidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setSidebarCollapsed: (isCollapsed) => set({ isSidebarCollapsed: isCollapsed }),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, username: state.username, isSidebarCollapsed: state.isSidebarCollapsed }), // Persist only these parts
    }
  )
);