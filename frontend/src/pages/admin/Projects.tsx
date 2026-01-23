import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api, type Project } from '../../services/api';
import { Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';


export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  
  // Watch for live preview
  const watchValues = watch();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    api.getProjects().then(setProjects);
  };

  const onSubmit = async (data: any) => {
    // split tags by comma
    const formattedData = {
      ...data,
      tags: data.tags.split(',').map((t: string) => t.trim())
    };
    await api.addProject(formattedData);
    reset();
    setIsModalOpen(false);
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await api.deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Portfolio Projects</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
            <div className="aspect-video bg-black/50 relative">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-3 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{project.title}</h3>
              <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-white/5 rounded-md text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-dark border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Form Side */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">New Project</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Project Title</label>
                  <input {...register('title', { required: true })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Description</label>
                  <textarea {...register('description', { required: true })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Image URL</label>
                  <input {...register('imageUrl', { required: true })} placeholder="https://..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Tags (comma separated)</label>
                  <input {...register('tags')} placeholder="React, Node, Design" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Project Link</label>
                  <input {...register('link')} placeholder="https://..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors">
                  Create Project
                </button>
              </form>
            </div>

            {/* Preview Side */}
            <div className="flex-1 bg-white/5 p-8 border-l border-white/10 hidden md:block">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">Live Preview</h3>
              <div className="bg-dark border border-white/10 rounded-2xl overflow-hidden pointer-events-none">
                <div className="aspect-video bg-black/50 overflow-hidden">
                  {watchValues.imageUrl ? (
                    <img src={watchValues.imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{watchValues.title || 'Project Title'}</h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {watchValues.description || 'Project description will appear here...'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(watchValues.tags || '').split(',').map((tag: string, i: number) => (
                      tag.trim() && (
                        <span key={i} className="px-2 py-1 text-xs bg-white/5 rounded-md text-white/60">
                          {tag.trim()}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
