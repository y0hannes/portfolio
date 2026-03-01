import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Globe, Send, ExternalLink, Brain, Database, Award } from 'lucide-react';
import * as Icons from 'lucide-react';
import { api } from '../../services/api';
import { type Project } from '../../../../types/Project';
import { type Certificate } from '../../../../types/Certificate';
import { useForm } from 'react-hook-form';
import { useToast } from '../../components/common/Toast';

interface ContactFormData {
  name: string;
  email: string;
  content: string;
}

export const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  useEffect(() => {
    Promise.all([
      api.getProjects(),
      api.getCertificates()
    ]).then(([projectsData, certsData]) => {
      setProjects(projectsData);
      setCertificates(certsData);
    }).finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.sendMessage(data);
      reset();
      addToast('Message sent successfully!');
    } catch (error) {
      addToast('Failed to send message', 'error');
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6">
        {/* Professional Clean Background */}
        <div className="absolute inset-0 bg-dark overflow-hidden pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-emerald-400 font-medium tracking-wide mb-4">FULL STACK DEVELOPER</h2>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight mb-8">
              Crafting Digital
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-lime-400 text-transparent bg-clip-text">
                Experiences
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              I build accessible, pixel-perfect, performant, and reliable tech solutions that leave a lasting impression.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#work"
                className="px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-emerald-400 transition-colors flex items-center gap-2"
              >
                View Work <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white/5 text-white font-medium rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About / Skills Section */}
      <section id="about" className="py-24 relative overflow-hidden bg-black/40">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-8 leading-tight">
                Design meets <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Engineering
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl">
                I'm a developer who cares deeply about user experience and technical excellence. My approach combines a strong foundation in <span className="text-emerald-400">Data Structures and Algorithms</span> with a passion for building <span className="text-teal-400">high-performance, scalable, and reliable</span> digital experiences.
                <br /><br />
                With my experience, I bridge the gap between complex engineering and pixel-perfect design, ensuring every application I build is not only beautiful but also robust and performant.
              </p>

              <div className="flex gap-6 items-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">3+</span>
                  <span className="text-sm text-white/40 uppercase tracking-wider">Years Exp</span>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">10+</span>
                  <span className="text-sm text-white/40 uppercase tracking-wider">Projects</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {
                [
                  {
                    icon: Code2,
                    label: 'Frontend',
                    desc: 'React, Next.js, TypeScript, Tailwind, Vite'
                  },
                  {
                    icon: Cpu,
                    label: 'Backend & APIs',
                    desc: 'Node.js, Express, Django, NestJS, REST APIs, Webhooks'
                  },
                  {
                    icon: Globe,
                    label: 'Systems & Bots',
                    desc: 'Telegram Bots, Background Jobs, Caching, PostgreSQL, SQLite'
                  },
                  {
                    icon: Brain,
                    label: 'ML & AI',
                    desc: 'RAG Systems, LLMs, Embeddings, PDF Chatbots, Vector Databases'
                  },
                  {
                    icon: Database,
                    label: 'Data Structures & Algorithms',
                    desc: 'Problem Solving, Time–Space Optimization, Competitive DSA'
                  },
                  {
                    icon: Send,
                    label: 'Design & UX',
                    desc: 'Figma, Framer, UI/UX Principles'
                  }
                ]

                  .map((skill, i) => (
                    <div
                      key={i}
                      className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-emerald-500 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                        <skill.icon className="text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{skill.label}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display mb-16 text-center"
          >
            Featured <span className="text-teal-400">Projects</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-white/5 border border-white/5 p-6 animate-pulse">
                  <div className="aspect-video bg-white/5 rounded-xl mb-6" />
                  <div className="h-4 w-1/3 bg-white/5 rounded mb-4" />
                  <div className="h-6 w-2/3 bg-white/5 rounded mb-4" />
                  <div className="h-20 w-full bg-white/5 rounded mb-6" />
                </div>
              ))
            ) : projects.length > 0 ? (
              projects.map((project, i) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500 transition-colors duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-white/70 text-base mb-6 line-clamp-6 leading-relaxed">{project.description}</p>

                    <a href={project.link} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-emerald-400 transition-colors">
                      View Project <ExternalLink size={16} />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-white/40">No projects found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certificates & Accomplishments Section */}
      <section id="certificates" className="py-24 relative overflow-hidden bg-black/20">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Certificates & <span className="text-emerald-400">Accomplishments</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              A track record of continuous learning and professional growth through industry recognized certifications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, i) => {
              const Icon = (Icons as any)[cert.icon] || Award;
              const targetUrl = cert.verificationUrl || cert.imageUrl;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 h-full"
                >
                  {/* Header: Icon and Date */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Icon className="text-emerald-400" size={24} />
                    </div>
                    <span className="text-xs font-medium text-white/30 uppercase tracking-widest mt-1">
                      {cert.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                        {cert.category}
                      </span>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-white/60 text-sm font-medium">
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Small Image Preview if available */}
                    {cert.imageUrl && (
                      <div className="mt-2 mb-6 aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 group-hover:border-emerald-500/30 transition-colors">
                        <img
                          src={cert.imageUrl}
                          alt={cert.title}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
                        />
                      </div>
                    )}

                    {/* Verification Link */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                      {targetUrl ? (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest"
                        >
                          {cert.verificationUrl ? 'Verify Credential' : 'Show Full Certificate'} <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-[10px] text-white/20 italic uppercase tracking-wider">Verified Achievement</span>
                      )}
                    </div>
                  </div>

                  {/* Decorative glow */}
                  <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/10 transition-colors pointer-events-none rounded-2xl" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold font-display mb-4">Let's Work Together</h2>
            <p className="text-white/60">Have a project in mind? Let's turn your idea into reality.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              <input
                {...register('name', { required: true })}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <textarea
                {...register('content', { required: true })}
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
