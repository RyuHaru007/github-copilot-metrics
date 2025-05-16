// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Footer from './Footer';
import { useAppStore } from '@/store/appStore';
import { cn } from '@/lib/utils';

const MainLayout = () => {
  const isSidebarCollapsed = useAppStore((state) => state.isSidebarCollapsed);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar /> {/* Fixed or variable width sidebar */}
      <div // This is the main content column to the right of the sidebar
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out", // Added flex-1 here to ensure this column takes remaining width
          isSidebarCollapsed ? "sm:pl-20" : "sm:pl-64" // Adjust based on sidebar width
        )}
      >
        <TopBar /> {/* Will stretch to the width of its parent column */}
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8"> {/*
                                                              flex-1: takes available vertical space.
                                                              p-4 sm:px-6: provides padding *around* the Outlet content.
                                                              If you want Outlet content to be edge-to-edge here,
                                                              you can remove/adjust this padding.
                                                            */}
          <Outlet /> {/* Page content will be rendered here and can fill this padded area */}
        </main>
        <Footer /> {/* Will stretch to the width of its parent column */}
      </div>
    </div>
  );
};

export default MainLayout;