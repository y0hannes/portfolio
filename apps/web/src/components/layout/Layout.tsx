import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return true; // dark by default
  });
  const location = useLocation();

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'About',        href: '#about' },
    { name: 'Work',         href: '#work' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact',      href: '#contact' },
  ];

  const ThemeToggle = ({ size = 15 }: { size?: number }) => (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
      className="p-1.5 rounded-full text-ink-3 hover:text-ink hover:bg-surface-2 transition-all duration-150"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.18 }}
          className="block"
        >
          {isDark ? <Sun size={size} /> : <Moon size={size} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">

      {/* Floating centered taskbar */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">

        {/* Desktop pill */}
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`
            pointer-events-auto hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full
            border transition-all duration-300
            ${scrolled
              ? 'bg-canvas/90 backdrop-blur-xl border-border shadow-elevated'
              : 'bg-canvas/70 backdrop-blur-md border-border/60 shadow-soft'
            }
          `}
        >
          {/* Logo mark */}
          <a href="/" className="flex items-center gap-2 pl-1.5 pr-3 mr-1 border-r border-border group">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-warm">
              <span className="text-[7px] font-bold text-canvas tracking-tight leading-none">YM</span>
            </div>
          </a>

          {/* Nav links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-[13px] text-ink-3 hover:text-ink rounded-full hover:bg-surface-2 transition-all duration-150 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}

          {/* Divider + theme toggle */}
          <span className="w-px h-4 bg-border mx-1" />
          <ThemeToggle />
        </motion.nav>

        {/* Mobile pill — logo + hamburger */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`
            pointer-events-auto flex md:hidden items-center gap-2 px-3 py-2 rounded-full
            border transition-all duration-300
            ${scrolled
              ? 'bg-canvas/90 backdrop-blur-xl border-border shadow-elevated'
              : 'bg-canvas/70 backdrop-blur-md border-border/60 shadow-soft'
            }
          `}
        >
          <a href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-warm">
              <span className="text-[7px] font-bold text-canvas tracking-tight leading-none">YM</span>
            </div>
            <span className="text-sm font-medium text-ink">YM</span>
          </a>
          <ThemeToggle size={15} />
          <button
            className="p-1 text-ink-3 hover:text-ink transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-canvas pt-24 px-8 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-0 pt-8 border-t border-border">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl font-medium text-ink-3 hover:text-ink-2 transition-colors duration-200 py-4 border-b border-border/60 last:border-0"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pb-14">
              <p className="text-[10px] text-ink-4 uppercase tracking-[0.2em] mb-5">Connect</p>
              <div className="flex gap-4">
                <a href="https://github.com/y0hannes" className="p-2.5 bg-surface-2 text-ink-3 hover:text-ink-2 rounded-lg transition-colors duration-200">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com/in/yohannes-muluken" className="p-2.5 bg-surface-2 text-ink-3 hover:text-ink-2 rounded-lg transition-colors duration-200">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:contact@example.com" className="p-2.5 bg-surface-2 text-ink-3 hover:text-ink-2 rounded-lg transition-colors duration-200">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border pt-14 pb-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Top row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-[9px] font-bold text-canvas">YM</span>
                </div>
                <span className="font-serif text-xl text-ink">Yohannes Muluken</span>
              </div>
              <p className="text-sm text-ink-3 leading-relaxed">
                Full-stack developer crafting digital experiences with precision and care.
              </p>
            </div>

            {/* Nav */}
            <div className="flex gap-12">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-4 mb-4">Navigate</p>
                <div className="flex flex-col gap-2.5">
                  {navLinks.map((l) => (
                    <a key={l.name} href={l.href} className="text-sm text-ink-3 hover:text-ink-2 transition-colors duration-200">
                      {l.name}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-4 mb-4">Connect</p>
                <div className="flex flex-col gap-2.5">
                  <a href="https://github.com/y0hannes" className="text-sm text-ink-3 hover:text-ink-2 transition-colors duration-200 flex items-center gap-2">
                    <Github size={14} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/yohannes-muluken" className="text-sm text-ink-3 hover:text-ink-2 transition-colors duration-200 flex items-center gap-2">
                    <Linkedin size={14} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom rule */}
          <hr className="rule-warm mb-6" />
          <p className="text-xs text-ink-4 text-center tracking-wide">
            © {new Date().getFullYear()} Yohannes Muluken. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
