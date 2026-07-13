import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Code2, Cpu, Globe, Send, ExternalLink,
  Brain, Database, Github, Linkedin, ArrowUpRight, Briefcase, MapPin,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { api } from '../../services/api';
import { type Project } from '../../../../types/Project';
import { type Certificate } from '../../../../types/Certificate';
import { type Experience } from '../../../../types/Experience';
import { useForm } from 'react-hook-form';
import { useToast } from '../../components/common/Toast';

interface ContactFormData { name: string; email: string; content: string; }

/* tiny helpers */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

export const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  useEffect(() => {
    Promise.all([api.getProjects(), api.getCertificates(), api.getExperiences()])
      .then(([p, c, e]) => { setProjects(p); setCertificates(c); setExperiences(e); })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.sendMessage(data);
      reset();
      addToast('Message sent successfully!');
    } catch {
      addToast('Failed to send message', 'error');
    }
  };

  return (
    <div className="overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">

        {/* Background warm gradient */}
        <div className="absolute inset-0 bg-warm-gradient pointer-events-none" />

        {/* Decorative large faded monogram */}
        <div
          aria-hidden
          className="absolute right-[-4rem] top-1/2 -translate-y-1/2 font-serif font-medium text-[22rem] leading-none text-accent/[0.02] select-none pointer-events-none hidden lg:block"
        >
          YM
        </div>

        {/* Decorative corner lines */}
        <div aria-hidden className="absolute top-24 left-6 w-16 h-16 border-t border-l border-parchment/60 pointer-events-none" />
        <div aria-hidden className="absolute bottom-16 right-6 w-16 h-16 border-b border-r border-parchment/60 pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-6 h-px bg-accent/50" />
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-ink-3">
                Full Stack Developer
              </span>
              <span className="w-6 h-px bg-accent/50" />
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-[5.5rem] font-medium leading-[1.06] tracking-tight text-ink mb-3">
              Crafting Digital
            </h1>
            <h1 className="font-serif text-5xl md:text-[5.5rem] font-medium leading-[1.06] tracking-tight text-accent mb-8">
              Experiences
            </h1>

            <p className="text-base md:text-lg text-ink-3 max-w-lg mx-auto mb-12 leading-relaxed">
              I build accessible, pixel-perfect, performant, and reliable tech solutions
              that leave a lasting impression.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent text-canvas text-sm font-medium rounded-full hover:bg-accent-2 transition-colors duration-250 shadow-warm"
              >
                View Work
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ink-2 rounded-full border border-border-warm bg-surface hover:bg-surface-2 transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>

            {/* Scroll nudge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-20 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-4">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-parchment to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*Warm divider*/}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="rule-warm" />
      </div>

      {/*           ABOUT / SKILLS
      */}
      <section id="about" className="py-28 bg-canvas">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Left: text */}
            <motion.div {...fadeUp()}>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink-4 mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-accent/50 inline-block" /> About
              </p>
              <h2 className="font-serif text-4xl md:text-[2.8rem] font-medium tracking-tight text-ink leading-[1.15] mb-7">
                Design meets<br />
                <em className="not-italic text-accent">Engineering</em>
              </h2>

              <p className="text-ink-3 text-[15px] leading-[1.8] mb-5">
                I'm a developer who cares deeply about user experience and technical excellence.
                My approach blends a strong foundation in Data Structures &amp; Algorithms with
                a passion for building high-performance, scalable digital experiences.
              </p>
              <p className="text-ink-3 text-[15px] leading-[1.8] mb-12">
                I bridge the gap between complex engineering and refined design — every
                application I build is both robust and carefully considered.
              </p>

              {/* Stats */}
              <div className="flex gap-10 items-center">
                {[['3+', 'Years Exp'], ['10+', 'Projects Built']].map(([val, lbl], i) => (
                  <div key={i}>
                    <span className="font-serif text-3xl font-medium text-accent">{val}</span>
                    <p className="text-[10px] font-medium text-ink-4 uppercase tracking-[0.18em] mt-1">{lbl}</p>
                  </div>
                ))}
                <div className="w-px h-10 bg-border" />
                {/* Availability chip */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-surface-2 border border-border rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[11px] font-medium text-ink-3">Available</span>
                </div>
              </div>
            </motion.div>

            {/* Right: skill cards */}
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3">
              {[
                { icon: Code2, label: 'Frontend', desc: 'React, Next.js, TypeScript, Tailwind, Vite' },
                { icon: Cpu, label: 'Backend', desc: 'Node.js, Express, Django, NestJS, REST, Webhooks' },
                { icon: Globe, label: 'Systems', desc: 'Telegram Bots, Caching, PostgreSQL, SQLite' },
                { icon: Brain, label: 'ML & AI', desc: 'RAG, LLMs, Embeddings, PDF Chatbots, Vectors' },
                { icon: Database, label: 'DSA', desc: 'Problem Solving, Time–Space Optimization' },
                { icon: Send, label: 'Design & UX', desc: 'Figma, Framer, UI/UX Principles' },
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl bg-surface border border-border hover:border-parchment hover:shadow-card transition-all duration-200 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-3 border border-border flex items-center justify-center mb-4">
                    <skill.icon size={17} className="text-accent" />
                  </div>
                  <h3 className="text-sm font-medium text-ink mb-1">{skill.label}</h3>
                  <p className="text-[12px] text-ink-4 leading-relaxed">{skill.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/*Warm divider*/}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="rule-warm" />
      </div>

      {/* PROJECTS */}
      <section id="work" className="py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp()} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink-4 mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-accent/50" /> Selected Work
              </p>
              <h2 className="font-serif text-4xl md:text-[2.8rem] font-medium tracking-tight text-ink leading-tight">
                Featured Projects
              </h2>
            </div>
            <p className="text-sm text-ink-3 max-w-xs leading-relaxed text-left sm:text-right">
              A curated selection of projects I've built with care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-surface-2 border border-border overflow-hidden animate-pulse">
                  <div className="aspect-video bg-surface-3" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-1/3 bg-surface-3 rounded-full" />
                    <div className="h-5 w-2/3 bg-surface-3 rounded-full" />
                    <div className="h-14 bg-surface-3 rounded-lg" />
                  </div>
                </div>
              ))
            ) : projects.length > 0 ? (
              projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  {...fadeUp(i * 0.08)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl overflow-hidden bg-canvas border border-border hover:border-parchment hover:shadow-elevated transition-all duration-250"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden bg-surface-2 relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    {/* Overlay link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-accent/0 group-hover:bg-accent/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      aria-label={`Open ${project.title}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-canvas/90 flex items-center justify-center shadow-card">
                        <ArrowUpRight size={20} className="text-accent" />
                      </div>
                    </a>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-surface-2 text-ink-3 border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-lg font-medium text-ink mb-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-ink-3 mb-5 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent hover:text-accent-2 transition-colors duration-200 uppercase tracking-wider"
                    >
                      View Project <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 rounded-2xl border border-border bg-canvas">
                <p className="text-ink-4 text-sm">No projects yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*Warm divider*/}
      <div className="max-w-5xl mx-auto px-6 bg-surface">
        <hr className="rule-warm" />
      </div>

      {/* CERTIFICATES */}
      <section id="certificates" className="py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink-4 mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-accent/50" /> Recognition
            </p>
            <h2 className="font-serif text-4xl md:text-[2.8rem] font-medium tracking-tight text-ink leading-tight">
              Certificates &amp; Accomplishments
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certificates.map((cert, i) => {
              const Icon = (Icons as any)[cert.icon] || Icons.Award;
              return (
                <motion.div
                  key={cert.id || i}
                  {...fadeUp(i * 0.07)}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.22 }}
                  className="group flex flex-col bg-canvas border border-border rounded-2xl p-6 hover:border-parchment hover:shadow-card transition-all duration-200 h-full"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-11 h-11 rounded-xl bg-surface-2 border border-border flex items-center justify-center">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <span className="text-[11px] font-medium text-ink-4 uppercase tracking-widest mt-1">
                      {cert.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-accent bg-accent/8 border border-accent/15 px-2.5 py-0.5 rounded-full mb-3 inline-block w-fit">
                      {cert.category}
                    </span>
                    <h3 className="font-serif text-[17px] font-medium text-ink mb-2 leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-auto">
                      <span className="text-[11px] text-ink-4">Issued by</span>
                      <span className="text-[11px] font-medium text-ink-3">{cert.issuer}</span>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-border">
                      {cert.verificationUrl ? (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent hover:text-accent-2 transition-colors duration-200 uppercase tracking-wider"
                        >
                          Verify Credential <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-[10px] font-medium text-ink-4 uppercase tracking-wider">
                          Verified Achievement
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/*Warm divider*/}
      <div className="max-w-5xl mx-auto px-6 bg-surface">
        <hr className="rule-warm" />
      </div>

      {/* EXPERIENCE */}
      <section id="experience" className="py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink-4 mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-accent/50" /> Experience
            </p>
            <h2 className="font-serif text-4xl md:text-[2.8rem] font-medium tracking-tight text-ink leading-tight">
              Work History
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden sm:block" />

            <div className="space-y-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-6 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-surface-2 shrink-0 hidden sm:block" />
                    <div className="flex-1 bg-surface-2 rounded-2xl p-6 space-y-3">
                      <div className="h-4 bg-surface-3 rounded w-1/3" />
                      <div className="h-3 bg-surface-3 rounded w-1/4" />
                      <div className="h-12 bg-surface-3 rounded" />
                    </div>
                  </div>
                ))
              ) : experiences.length > 0 ? (
                experiences.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    {...fadeUp(i * 0.07)}
                    className="flex gap-6"
                  >
                    {/* Timeline dot */}
                    <div className="shrink-0 hidden sm:flex items-start pt-5">
                      <div className="w-10 h-10 rounded-full bg-canvas border-2 border-border flex items-center justify-center z-10">
                        <Briefcase size={15} className="text-accent" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-canvas border border-border rounded-2xl p-6 hover:border-parchment hover:shadow-card transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-serif text-lg font-medium text-ink leading-snug">
                            {exp.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-accent">{exp.company}</span>
                            {exp.location && (
                              <>
                                <span className="text-border-warm">·</span>
                                <span className="flex items-center gap-1 text-xs text-ink-4">
                                  <MapPin size={11} />
                                  {exp.location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-ink-4 uppercase tracking-wider whitespace-nowrap shrink-0 mt-0.5">
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>

                      <p className="text-[14px] text-ink-3 leading-[1.8] mb-4">
                        {exp.description}
                      </p>

                      {exp.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-surface-2 text-ink-3 border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-24 rounded-2xl border border-border bg-canvas">
                  <p className="text-ink-4 text-sm">No experience entries yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/*Full-width accent banner*/}
      {/* <div className="bg-accent-gradient py-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sand text-sm font-medium mb-1 tracking-wide">Open to opportunities</p>
            <h3 className="font-serif text-2xl md:text-3xl font-medium text-canvas">
              Have a project in mind?
            </h3>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-canvas text-accent text-sm font-medium rounded-full hover:bg-surface transition-colors duration-200 shadow-warm"
          >
            Let's Talk <ArrowRight size={15} />
          </a>
        </div>
      </div> */}

      {/*           CONTACT
      */}
      <section id="contact" className="py-28 bg-canvas">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* Left */}
            <motion.div {...fadeUp()}>
              <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink-4 mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-accent/50" /> Contact
              </p>
              <h2 className="font-serif text-4xl md:text-[2.8rem] font-medium tracking-tight text-ink leading-[1.15] mb-7">
                Let's Work<br />
                <em className="not-italic text-accent">Together</em>
              </h2>
              <p className="text-[15px] text-ink-3 leading-[1.8] mb-10">
                Have a project in mind, want to collaborate, or just want to say hello?
                I'd love to hear from you.
              </p>

              {/* Social links */}
              <div className="space-y-3">
                <a
                  href="https://github.com/y0hannes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center group-hover:bg-surface-3 group-hover:border-parchment transition-colors duration-200">
                    <Github size={18} className="text-ink-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink group-hover:text-ink-2 transition-colors">GitHub</p>
                    <p className="text-xs text-ink-4">y0hannes</p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-ink-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href="https://linkedin.com/in/yohannes-muluken/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center group-hover:bg-surface-3 group-hover:border-parchment transition-colors duration-200">
                    <Linkedin size={18} className="text-ink-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink group-hover:text-ink-2 transition-colors">LinkedIn</p>
                    <p className="text-xs text-ink-4">yohannes-muluken</p>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-ink-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div {...fadeUp(0.1)}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-widest text-ink-4">Name</label>
                    <input
                      {...register('name', { required: true })}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-ink text-sm placeholder:text-ink-4 focus:outline-none focus:border-parchment focus:ring-1 focus:ring-accent/15 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-widest text-ink-4">Email</label>
                    <input
                      {...register('email', { required: true })}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-ink text-sm placeholder:text-ink-4 focus:outline-none focus:border-parchment focus:ring-1 focus:ring-accent/15 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-widest text-ink-4">Message</label>
                  <textarea
                    {...register('content', { required: true })}
                    rows={7}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-ink text-sm placeholder:text-ink-4 focus:outline-none focus:border-parchment focus:ring-1 focus:ring-accent/15 transition-all duration-200 resize-y"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full py-3.5 bg-accent text-canvas text-sm font-medium rounded-xl hover:bg-accent-2 transition-colors duration-200 shadow-warm flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};
