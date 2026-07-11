import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { type Project } from '../../../../types/Project';
import { Trash2, Plus, X, Pencil, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';

const inputCls = 'w-full px-4 py-2.5 bg-dark-4 border border-white/10 rounded-lg focus:border-accent/50 focus:outline-none text-sand text-sm placeholder:text-sand/20 transition-colors duration-200';
const labelCls = 'text-[10px] font-medium text-sand/40 uppercase tracking-widest';

export const Projects = () => {
  const [projects,      setProjects]      = useState<Project[]>([]);
  const [isModalOpen,   setIsModalOpen]   = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imagePreview,  setImagePreview]  = useState<string | null>(null);
  const [isLoading,     setIsLoading]     = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const watchValues = watch();

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = () => {
    setIsLoading(true);
    api.getProjects().then(setProjects).finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: any) => {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('description', data.description);
    fd.append('codeLink', data.codeLink);
    fd.append('link', data.link || '');
    fd.append('isFinished', String(data.isFinished));
    const tags = typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags;
    fd.append('tags', tags.join(','));
    if (data.image?.[0])           fd.append('image', data.image[0]);
    else if (editingProject?.imageUrl) fd.append('imageUrl', editingProject.imageUrl);

    try {
      if (editingProject) { await api.updateProject(editingProject.id!, fd); addToast('Project updated!'); }
      else                { await api.addProject(fd);                        addToast('Project created!'); }
      closeModal(); loadProjects();
    } catch { addToast('Failed to save project', 'error'); }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setImagePreview(project.imageUrl || null);
      Object.keys(project).forEach(k => {
        if (k === 'tags') setValue('tags', project.tags.join(', '));
        else if (k !== 'imageUrl') setValue(k, (project as any)[k]);
      });
    } else { setEditingProject(null); setImagePreview(null); reset({}); }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingProject(null); setImagePreview(null); reset({}); };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      try { await api.deleteProject(id); addToast('Project deleted', 'info'); loadProjects(); }
      catch { addToast('Failed to delete project', 'error'); }
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const ni = direction === 'up' ? index - 1 : index + 1;
    if (ni < 0 || ni >= projects.length) return;
    const arr = [...projects];
    [arr[index], arr[ni]] = [arr[ni], arr[index]];
    setProjects(arr);
    try { await api.updateProjectsOrder(arr.map((p, i) => ({ id: p.id!, sort_order: i }))); addToast('Order updated'); }
    catch { addToast('Failed to update order', 'error'); loadProjects(); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-sand">Projects</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-accent text-canvas text-sm font-medium rounded-lg hover:bg-accent-2 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          [1,2,3].map(i => (
            <div key={i} className="bg-dark-3 border border-white/[0.06] rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-dark-4" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-dark-4 rounded w-3/4" />
                <div className="h-3 bg-dark-4 rounded" />
                <div className="h-3 bg-dark-4 rounded w-5/6" />
              </div>
            </div>
          ))
        ) : (
          projects.map((project, index) => (
            <div key={project.id} className="group relative bg-dark-3 border border-white/[0.06] rounded-xl overflow-hidden hover:border-accent/30 transition-colors duration-200">
              <div className="aspect-video bg-black/30 relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => handleMove(index, 'up')} disabled={index === 0}
                      className="p-1.5 bg-white/15 text-sand rounded-md hover:bg-white/25 transition-colors disabled:opacity-20">
                      <ChevronUp size={15} />
                    </button>
                    <button onClick={() => handleMove(index, 'down')} disabled={index === projects.length - 1}
                      className="p-1.5 bg-white/15 text-sand rounded-md hover:bg-white/25 transition-colors disabled:opacity-20">
                      <ChevronDown size={15} />
                    </button>
                  </div>
                  <button onClick={() => openModal(project)}
                    className="p-2.5 bg-white/15 text-sand rounded-full hover:bg-white/25 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => handleDelete(project.id!)}
                    className="p-2.5 bg-red-500/15 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-medium text-sand text-sm mb-1.5">{project.title}</h3>
                <p className="text-sand/40 text-xs mb-3 line-clamp-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] bg-accent/10 border border-accent/15 rounded text-sand/50">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-dark-2 border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            {/* Form */}
            <div className="flex-1 p-7 overflow-y-auto admin-scroll">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-lg font-medium text-sand">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h2>
                <button onClick={closeModal} className="p-1.5 hover:bg-white/8 rounded-lg text-sand/40 hover:text-sand transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <label className={labelCls}>Title</label>
                  <input {...register('title', { required: true })} className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Description</label>
                  <textarea {...register('description', { required: true })} rows={3} className={`${inputCls} resize-none`} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Image</label>
                  <input type="file" accept="image/*"
                    {...register('image', {
                      required: !editingProject,
                      onChange: e => {
                        const file = e.target.files[0];
                        if (file) { const r = new FileReader(); r.onloadend = () => setImagePreview(r.result as string); r.readAsDataURL(file); }
                      },
                    })}
                    className="w-full text-xs text-sand/40 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-accent/15 file:text-sand/60 hover:file:bg-accent/25 cursor-pointer"
                  />
                  {editingProject && !imagePreview && (
                    <p className="text-[11px] text-sand/25 italic">Current: {editingProject.imageUrl}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Code Link</label>
                  <input {...register('codeLink', { required: true })} placeholder="https://github.com/..." className={inputCls} />
                </div>
                <div className="flex items-center gap-2.5">
                  <input type="checkbox" {...register('isFinished')} id="isFinished" className="w-3.5 h-3.5 rounded accent-accent" />
                  <label htmlFor="isFinished" className="text-xs text-sand/40 cursor-pointer">Project is Finished</label>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Tags (comma separated)</label>
                  <input {...register('tags')} placeholder="React, Node, Design" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Project Link</label>
                  <input {...register('link')} placeholder="https://..." className={inputCls} />
                </div>
                <button type="submit" className="w-full py-3 bg-accent text-canvas text-sm font-medium rounded-lg hover:bg-accent-2 transition-colors duration-200">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </div>
            {/* Preview */}
            <div className="flex-1 bg-dark-4/40 p-7 border-l border-white/[0.06] hidden md:block">
              <p className="text-[10px] font-medium uppercase tracking-widest text-sand/25 mb-5">Preview</p>
              <div className="bg-dark-3 border border-white/[0.06] rounded-xl overflow-hidden pointer-events-none">
                <div className="aspect-video bg-black/30 overflow-hidden">
                  {imagePreview
                    ? <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                    : <div className="w-full h-full flex items-center justify-center text-sand/15"><ImageIcon size={36} /></div>
                  }
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-sand text-sm mb-1.5">{watchValues.title || 'Project Title'}</h3>
                  <p className="text-sand/40 text-xs mb-3 line-clamp-2">{watchValues.description || 'Description...'}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(watchValues.tags || '').split(',').map((t: string, i: number) =>
                      t.trim() && <span key={i} className="px-2 py-0.5 text-[10px] bg-accent/10 rounded text-sand/50">{t.trim()}</span>
                    )}
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
