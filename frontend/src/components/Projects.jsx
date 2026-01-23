export default function Projects() {
  const projects = [
    {
      name: "NeuraSynth AI",
      desc: "AI-powered music generation platform using ML algorithms.",
      tech: ["React", "Python", "TensorFlow", "AWS"],
    },
    {
      name: "CryptoVault",
      desc: "Secure crypto portfolio tracker with real-time analytics.",
      tech: ["Next.js", "TypeScript", "Web3", "PostgreSQL"],
    },
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          Featured <span className="text-accent">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {projects.map((p) => (
            <div
              key={p.name}
              className="bg-card backdrop-blur-glass p-8 rounded-2xl border border-white/10 hover:border-accent/40 transition"
            >
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-3 text-slate-400">{p.desc}</p>

              <div className="mt-4 flex gap-2 flex-wrap">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs border border-accent/30 rounded-full text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
