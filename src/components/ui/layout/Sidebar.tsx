// src/components/layout/Sidebar.tsx
import {
    ChevronLeft, ChevronRight, LayoutDashboard, Building, LanguagesIcon, Code, MessageSquare,
    Users, FileJson, Settings // Added Settings for potential future use
  } from 'lucide-react';
  import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
  import { useAppStore } from '@/store/appStore';
  import { Button } from '@/components/ui/button';
  import { cn } from '@/lib/utils';
  import logo from 'public/logo.svg';
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/organization', label: 'Organization', icon: Building },
    { href: '/languages', label: 'Languages', icon: LanguagesIcon },
    { href: '/editors', label: 'Editors', icon: Code },
    { href: '/copilot-chat', label: 'Copilot Chat', icon: MessageSquare },
    { href: '/seat-analysis', label: 'Seat Analysis', icon: Users },
    { href: '/api-response', label: 'API Response', icon: FileJson },
  ];
  
  const Sidebar = () => {
    const { isSidebarCollapsed, toggleSidebar } = useAppStore();
    const location = useLocation();
  
    return (
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isSidebarCollapsed && (
            <RouterNavLink to="/dashboard" className="flex items-center gap-2 font-semibold">
              {/* Replace with your actual logo component or SVG */}
              <img src={logo}alt="Logo" className="h-8 w-8" />
              <span className="text-lg">Copilot Metrics</span>
            </RouterNavLink>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn(isSidebarCollapsed && "mx-auto")}>
            {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => (
            <RouterNavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                  isActive && "bg-primary text-primary-foreground hover:text-primary-foreground",
                  isSidebarCollapsed && "justify-center"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {!isSidebarCollapsed && <span>{item.label}</span>}
              {isSidebarCollapsed && (
                  <span className="sr-only">{item.label}</span>
              )}
            </RouterNavLink>
          ))}
        </nav>
        {/* Optional: Add settings or other items at the bottom */}
        {!isSidebarCollapsed && (
          <div className="mt-auto border-t p-4">
            {/* <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button> */}
          </div>
        )}
      </aside>
    );
  };
  
  export default Sidebar;