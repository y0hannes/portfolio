export default function Hero() {
  return (
    <section className='min-h-screen flex items-center justify-center text-center px-6'>
      <div>
        <span className='inline-block mb-6 px-4 py-1 text-sm border border-accent/30 rounded-full text-accent'>
          ✨ Available for freelance work
        </span>

        <h1 className='text-5xl md:text-7xl font-bold'>
          Hi, I'm <br />
          <span className='text-accent'>Alex Chen</span>
        </h1>

        <p className='mt-6 max-w-2xl mx-auto text-slate-400'>
          A{' '}
          <span className='text-accent font-semibold'>
            Full-Stack Developer
          </span>{' '}
          crafting digital experiences that blend creativity with cutting-edge
          technology.
        </p>

        <div className='mt-10 flex justify-center gap-6'>
          <button className='px-8 py-3 bg-accent text-black rounded-lg font-semibold shadow-glow'>
            View My Work
          </button>
          <button className='px-8 py-3 border border-white/20 rounded-lg'>
            Get In Touch
          </button>
        </div>

        <div className='mt-10 flex justify-center gap-3 flex-wrap'>
          {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((t) => (
            <span
              key={t}
              className='px-4 py-1 text-sm border border-accent/20 rounded-full text-accent'
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
