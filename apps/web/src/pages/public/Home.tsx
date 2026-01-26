import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Globe, Send, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { type Project } from '../../../../types/Project';
import { useForm } from 'react-hook-form';
import { useToast } from '../../components/common/Toast';

interface ContactFormData {
  name: string;
  email: string;
  content: string;
}

export const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { addToast } = useToast();
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  useEffect(() => {
    api.getProjects().then(setProjects);
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
        {/* Animated Background */}
        <div className="absolute inset-0 bg-dark overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyan-400 font-medium tracking-wide mb-4">FULL STACK DEVELOPER</h2>
            <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight mb-8">
              Crafting Digital
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Experiences
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              I build accessible, pixel-perfect, performant, and over-the-top stylish web applications that leave a lasting impression.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#work"
                className="px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-cyan-400 transition-colors flex items-center gap-2"
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
      <section id="about" className="py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold font-display mb-8">
                Design meets <br />
                <span className="text-cyan-400">Engineering</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                I'm a developer who cares deeply about user experience. I don't just write code; I create seamless, interactive journeys. With a background in design and a passion for modern tech, I bridge the gap between aesthetics and functionality.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code2, label: 'Frontend', desc: 'React, Vue, Tailwind' },
                  { icon: Cpu, label: 'Backend', desc: 'Node, Python, SQL' },
                  { icon: Globe, label: 'Web3', desc: 'Solidity, Ethers.js' },
                  { icon: Send, label: 'Design', desc: 'Figma, Spline, ThreeJS' },
                ].map((skill, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors">
                    <skill.icon className="text-cyan-400 mb-4" size={24} />
                    <h3 className="font-bold mb-1">{skill.label}</h3>
                    <p className="text-sm text-white/40">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative"
            >
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-white/10 relative p-8">
                  {/* Decorative Elements replacing the Image */}
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" />
                   </div>
                   <div className="relative z-10 h-full flex flex-col justify-between">
                     <div className="text-6xl font-display font-bold text-white/10">01</div>
                     <div className="text-right">
                       <div className="text-4xl font-bold text-white mb-2">5+ Years</div>
                       <div className="text-white/40">of Experience</div>
                     </div>
                   </div>
                </div>
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
            Featured <span className="text-purple-400">Projects</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/5 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-6 line-clamp-2">{project.description}</p>
                  
                  <a href={project.link} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-cyan-400 transition-colors">
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none" />
        
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="space-y-2">
              <textarea
                {...register('content', { required: true })}
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
