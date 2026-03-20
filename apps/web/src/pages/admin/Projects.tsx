import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { type Project } from '../../../../types/Project';
import { Trash2, Plus, X, Pencil, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';


export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  // Watch for live preview
  const watchValues = watch();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setIsLoading(true);
    api.getProjects().then(setProjects).finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Add text fields
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('codeLink', data.codeLink);
    formData.append('link', data.link || '');
    formData.append('isFinished', String(data.isFinished));

    // Handle tags
    const tagsArray = typeof data.tags === 'string'
      ? data.tags.split(',').map((t: string) => t.trim())
      : data.tags;
    formData.append('tags', tagsArray.join(','));

    // Handle image file
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    } else if (editingProject?.imageUrl) {
      formData.append('imageUrl', editingProject.imageUrl);
    }

    try {
      if (editingProject) {
        await api.updateProject(editingProject.id!, formData);
        addToast('Project updated successfully!');
      } else {
        await api.addProject(formData);
        addToast('Project created successfully!');
      }
      closeModal();
      loadProjects();
    } catch (error) {
      addToast('Failed to save project', 'error');
    }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setImagePreview(project.imageUrl || null);
      // Set form values
      Object.keys(project).forEach((key) => {
        if (key === 'tags') {
          setValue('tags', project.tags.join(', '));
        } else if (key !== 'imageUrl') {
          setValue(key, (project as any)[key]);
        }
      });
    } else {
      setEditingProject(null);
      setImagePreview(null);
      reset({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setImagePreview(null);
    reset({});
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        addToast('Project deleted', 'info');
        loadProjects();
      } catch (error) {
        addToast('Failed to delete project', 'error');
      }
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[newIndex];
    newProjects[newIndex] = temp;

    // Update sort_order for all affected projects
    const updates = newProjects.map((p, i) => ({
      id: p.id!,
      sort_order: i
    }));

    setProjects(newProjects);

    try {
      await api.updateProjectsOrder(updates);
      addToast('Order updated');
    } catch (error) {
      addToast('Failed to update order', 'error');
      loadProjects(); // Revert on failure
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Portfolio Projects</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton Loader
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-white/5" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-white/5 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/5 rounded" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 bg-white/5 rounded w-16" />
                  <div className="h-6 bg-white/5 rounded w-16" />
                </div>
              </div>
            </div>
          ))
        ) : (
          projects.map((project, index) => (
            <div key={project.id} className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
              <div className="aspect-video bg-black/50 relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-2 bg-white/20 text-white rounded-full hover:bg-white/40 transition-colors disabled:opacity-30"
                    >
                      <ChevronUp size={20} />
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === projects.length - 1}
                      className="p-2 bg-white/20 text-white rounded-full hover:bg-white/40 transition-colors disabled:opacity-30"
                    >
                      <ChevronDown size={20} />
                    </button>
                  </div>
                  <button
                    onClick={() => openModal(project)}
                    className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!)}
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
                  {project.tags && Array.isArray(project.tags) && project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs bg-white/5 rounded-md text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-dark border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">

            {/* Form Side */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">
                  {editingProject ? 'Edit Project' : 'New Project'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Project Title</label>
                  <input {...register('title', { required: true })} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Description</label>
                  <textarea {...register('description', { required: true })} rows={3} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Project Image</label>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      {...register('image', {
                        required: !editingProject,
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }
                      })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    {editingProject && !imagePreview && (
                      <p className="text-xs text-white/40 italic">Current image URL: {editingProject.imageUrl}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Code Link</label>
                  <input {...register('codeLink', { required: true })} placeholder="https://github.com/..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" {...register('isFinished')} id="isFinished" className="w-4 h-4 rounded border-white/10 bg-white/5 focus:ring-emerald-400 focus:ring-offset-0" />
                  <label htmlFor="isFinished" className="text-sm font-medium text-white/60">Project is Finished</label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Tags (comma separated)</label>
                  <input {...register('tags')} placeholder="React, Node, Design" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Project Link</label>
                  <input {...register('link')} placeholder="https://..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </form>
            </div>

            {/* Preview Side */}
            <div className="flex-1 bg-white/5 p-8 border-l border-white/10 hidden md:block">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-6">Live Preview</h3>
              <div className="bg-dark border border-white/10 rounded-2xl overflow-hidden pointer-events-none">
                <div className="aspect-video bg-black/50 overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" />
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
