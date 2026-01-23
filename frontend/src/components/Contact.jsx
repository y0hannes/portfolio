export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-card backdrop-blur-glass p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-semibold">Get In Touch</h3>
          <p className="mt-4 text-slate-400">alex@example.com</p>
          <p className="mt-2 text-slate-400">San Francisco, CA</p>
        </div>

        <form className="bg-card backdrop-blur-glass p-8 rounded-2xl border border-white/10 space-y-4">
          <input className="w-full p-3 rounded bg-black/40" placeholder="Name" />
          <input className="w-full p-3 rounded bg-black/40" placeholder="Email" />
          <textarea
            rows="4"
            className="w-full p-3 rounded bg-black/40"
            placeholder="Tell me about your project..."
          />
          <button className="w-full py-3 bg-accent text-black rounded-lg font-semibold">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}
