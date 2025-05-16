// src/components/layout/TopBar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner"; // For notifications
import logo from 'public/logo.svg';
const TopBar = () => {
  const { username, logout } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-5 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Logo on the top left (can be hidden on small screens or if sidebar has it) */}
      {/* This logo is redundant if the sidebar shows it when expanded, but shown for completeness as requested */}
      <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
         <img src={logo} alt="Logo" className="h-8 w-8" />
         {/* <span className="text-lg hidden md:block">Copilot Metrics</span> */}
      </Link>

      <div className="flex items-center gap-4">
        {/* Search, Notifications, etc. can go here */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${username || 'admin'}`} alt={username || 'Admin'} />
                <AvatarFallback>{username ? username.substring(0, 2).toUpperCase() : 'AD'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account ({username})</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.info("Change Password clicked (not implemented).")}>
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;