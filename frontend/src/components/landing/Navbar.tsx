import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return !document.documentElement.classList.contains('light');
    }
    return true;
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">Return Intelligence</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('solution')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Solution
          </button>
          <button onClick={() => scrollToSection('case-studies')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Case Studies
          </button>
          <button onClick={() => scrollToSection('enterprise')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Enterprise
          </button>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative w-9 h-9"
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
                  <Moon className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4 h-4 text-warning" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          <Button variant="default" size="sm" onClick={() => navigate('/dashboard')}>
            Go to Platform
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border px-6 py-4 space-y-4"
        >
          <button onClick={() => scrollToSection('solution')} className="block text-sm text-muted-foreground hover:text-foreground w-full text-left">
            Solution
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="block text-sm text-muted-foreground hover:text-foreground w-full text-left">
            How It Works
          </button>
          <button onClick={() => scrollToSection('platform')} className="block text-sm text-muted-foreground hover:text-foreground w-full text-left">
            Platform
          </button>
          <button onClick={() => scrollToSection('enterprise')} className="block text-sm text-muted-foreground hover:text-foreground w-full text-left">
            Enterprise
          </button>
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="justify-start gap-2"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>Sign In</Button>
            <Button variant="default" size="sm" onClick={() => navigate('/upload')}>Request Demo</Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
