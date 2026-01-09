import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-mesh">
      <AppSidebar />
      <div className="pl-64">
        <AppHeader />
        <main className="p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <footer className="border-t border-border mt-6 py-3 px-6">
          <p className="text-xs text-muted-foreground text-center">
            Powered by Azure OpenAI & Azure AI Language Services
          </p>
        </footer>

      </div>
    </div>
  );
}
