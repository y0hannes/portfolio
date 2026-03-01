import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';


export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#work' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-emerald-500/30">
      {/* Navbar */}
      {/* Navbar - Centered Floating Taskbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl md:w-auto">
        <div className="flex items-center justify-between md:justify-start bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-2 px-4 md:px-2 shadow-2xl">
          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-2 px-2 group">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
              <span className="text-[10px] font-black text-emerald-400 tracking-tighter">YM</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-white/90 group-hover:text-emerald-400 transition-colors">Portfolio</span>
          </a>

          <div className="h-4 w-px bg-white/10 mx-2 hidden md:block" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-3xl pt-32 px-10 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-5xl font-display font-bold text-white/20 hover:text-emerald-400 transition-colors flex items-baseline gap-4"
                >
                  <span className="text-xl font-mono text-emerald-500/40">0{i + 1}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pb-12">
              <p className="text-white/20 text-sm uppercase tracking-widest mb-6">Let's connect</p>
              <div className="flex gap-6">
                <a href="https://github.com/y0hannes" className="text-white/40 hover:text-emerald-400 transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/yohannes-muluken" className="text-white/40 hover:text-emerald-400 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:contact@example.com" className="text-white/40 hover:text-emerald-400 transition-colors">
                  <Mail size={24} />
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
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <span className="text-[8px] font-black text-emerald-400">YM</span>
              </div>
              <p className="text-white/20 text-xs uppercase tracking-widest font-medium">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/y0hannes" className="p-2 text-white/20 hover:text-emerald-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/yohannes-muluken" className="p-2 text-white/20 hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
