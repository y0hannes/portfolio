export default function About() {
  const items = [
    ["Frontend", "React, Vue, Next.js, Tailwind"],
    ["Backend", "Node.js, Python, Go, GraphQL"],
    ["Database", "PostgreSQL, MongoDB, Redis"],
    ["Cloud", "AWS, GCP, Docker, CI/CD"],
    ["Design", "Figma, UI/UX, Responsive"],
    ["Performance", "SEO, Accessibility"],
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold">
          Passionate About <span className="text-accent">Crafting Code</span>
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-slate-400">
          With 5+ years of experience building web applications, I specialize in
          creating performant, scalable, and beautifully designed digital
          experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {items.map(([title, desc]) => (
            <div
              key={title}
              className="bg-card backdrop-blur-glass p-8 rounded-2xl border border-white/10 hover:border-accent/40 transition"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
