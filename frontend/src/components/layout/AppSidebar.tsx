import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Upload, 
  Search, 
  MessageSquare, 
  Leaf, 
  Settings,
  ChevronRight,
  Brain,
  Sparkles,
  Shield,
  User,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

const roleConfig: Record<UserRole, { label: string; icon: typeof User; color: string; bg: string }> = {
  viewer: { label: 'Viewer', icon: Eye, color: 'text-muted-foreground', bg: 'bg-muted-foreground/10' },
  manager: { label: 'Manager', icon: User, color: 'text-accent', bg: 'bg-accent/10' },
  admin: { label: 'Admin', icon: Shield, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
};

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Data Ingestion', icon: Upload },
  { path: '/explorer', label: 'Root Cause Explorer', icon: Search },
  { path: '/chat', label: 'AI Copilot', icon: MessageSquare },
  { path: '/sustainability', label: 'Sustainability', icon: Leaf },
];

export function AppSidebar() {
  const location = useLocation();
  const { isDataLoaded, role } = useApp();

  const RoleIcon = roleConfig[role].icon;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-40">
      {/* Logo - links back to landing page */}
      <Link to="/" className="h-16 flex items-center gap-3 px-6 border-b border-sidebar-border hover:bg-sidebar-accent/30 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center">
          <Brain className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <span className="font-semibold text-sidebar-foreground">Return</span>
          <span className="text-gradient-accent font-bold"> Intelligence</span>
        </div>
      </Link>

      {/* AI Status */}
      <div className="px-4 py-4">
        <div className="glass-card rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <Sparkles className="w-4 h-4 text-accent" />
              <div className="absolute inset-0 animate-pulse-glow rounded-full" />
            </div>
            <span className="text-xs font-medium text-accent">AI Engine Active</span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            {isDataLoaded ? 'Analyzing 3,561 returns' : 'Awaiting data upload'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-2">
        <div className="text-xs font-medium text-muted-foreground px-3 mb-2">
          NAVIGATION
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-primary" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border space-y-3">
        {/* Role indicator */}
        <div className={cn("flex items-center gap-2 px-3 py-2 rounded-lg", roleConfig[role].bg)}>
          <RoleIcon className={cn("w-4 h-4", roleConfig[role].color)} />
          <div className="flex-1">
            <div className={cn("text-xs font-medium", roleConfig[role].color)}>
              {roleConfig[role].label}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {role === 'viewer' ? 'View only' : role === 'manager' ? 'Can apply fixes' : 'Full access'}
            </div>
          </div>
        </div>
        
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
