import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  User, 
  Shield, 
  Eye,
  Moon,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

const roleConfig: Record<UserRole, { label: string; icon: typeof User; color: string }> = {
  viewer: { label: 'Viewer', icon: Eye, color: 'text-muted-foreground' },
  manager: { label: 'Manager', icon: User, color: 'text-accent' },
  admin: { label: 'Admin', icon: Shield, color: 'text-accent-purple' },
};

export function AppHeader() {
  const { role, setRole } = useApp();
  const [isDark, setIsDark] = useState(true);
  const [notifications] = useState(3);

  const CurrentRoleIcon = roleConfig[role].icon;

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    const Icon = roleConfig[newRole].icon;
    toast.success(
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${roleConfig[newRole].color}`} />
        <span>Switched to <strong>{roleConfig[newRole].label}</strong> role</span>
      </div>,
      {
        description: newRole === 'viewer' ? 'View-only access enabled' : newRole === 'manager' ? 'Can apply recommendations' : 'Full administrative access',
      }
    );
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search root causes, SKUs, insights..."
            className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-warning" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {notifications}
            </span>
          )}
        </Button>

        {/* Role switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 min-w-[140px] justify-between">
              <div className="flex items-center gap-2">
                <CurrentRoleIcon className={`w-4 h-4 ${roleConfig[role].color}`} />
                <span>{roleConfig[role].label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              Switch Role (Demo)
            </div>
            <DropdownMenuSeparator />
            {(Object.keys(roleConfig) as UserRole[]).map((r) => {
              const Icon = roleConfig[r].icon;
              return (
                <DropdownMenuItem
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={role === r ? 'bg-accent/10' : ''}
                >
                  <Icon className={`w-4 h-4 mr-2 ${roleConfig[r].color}`} />
                  {roleConfig[r].label}
                  {role === r && (
                    <span className="ml-auto text-xs text-accent">Active</span>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
