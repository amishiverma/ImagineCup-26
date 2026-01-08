import { Brain } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">ReturnIQ</span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('solution')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Solution
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('platform')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Platform
            </button>
            <button onClick={() => scrollToSection('enterprise')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Enterprise
            </button>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 ReturnIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
