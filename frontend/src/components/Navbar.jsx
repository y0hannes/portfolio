import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-glass border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-accent font-mono text-lg">&lt;dev/&gt;</span>

        <div className="hidden md:flex gap-8 text-sm">
          <a href="#about" className="hover:text-accent">About</a>
          <a href="#projects" className="hover:text-accent">Projects</a>
          <a href="#contact" className="hover:text-accent">Contact</a>
        </div>

        <div className="flex gap-4 text-slate-400">
          <Github size={18} />
          <Linkedin size={18} />
          <Twitter size={18} />
          <Mail size={18} />
        </div>
      </div>
    </nav>
  );
}
