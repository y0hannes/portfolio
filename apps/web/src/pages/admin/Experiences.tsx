import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { type Experience } from '../../../../types/Experience';
import { Trash2, Plus, X, Pencil, Briefcase, Calendar } from 'lucide-react';


export const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = () => {
    setIsLoading(true);
    api.getExperiences().then(setExperiences).finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: any) => {
    try {
      if (editingExperience) {
        await api.updateExperience(editingExperience._id!, data);
        addToast('Experience updated successfully!');
      } else {
        await api.addExperience(data);
        addToast('Experience created successfully!');
      }
      closeModal();
      loadExperiences();
    } catch (error) {
      addToast('Failed to save experience', 'error');
    }
  };

  const openModal = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience);
      Object.keys(experience).forEach((key) => {
        setValue(key, (experience as any)[key]);
      });
    } else {
      setEditingExperience(null);
      reset({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
    reset({});
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await api.deleteExperience(id);
        addToast('Experience deleted', 'info');
        loadExperiences();
      } catch (error) {
        addToast('Failed to delete experience', 'error');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Experiences</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton Loader
          [1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden p-6 animate-pulse">
              <div className="space-y-4">
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
          experiences.map((experience) => (
            <div key={experience._id} className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors p-6">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(experience)}
                  className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(experience._id!)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="font-bold text-lg mb-1">{experience.role}</h3>
              <div className="text-purple-400 font-medium mb-4 flex items-center gap-2 text-sm">
                <Briefcase size={14} /> {experience.company}
              </div>
              <div className="text-cyan-400 font-medium mb-4 flex items-center gap-2 text-sm">
                <Calendar size={14} /> {experience.period}
              </div>
              <p className="text-white/60 text-sm mb-4 line-clamp-3">{experience.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Experience Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-dark border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Form Side */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">
                  {editingExperience ? 'Edit Experience' : 'New Experience'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Role</label>
                  <input {...register('role', { required: true })} placeholder="e.g. Senior Frontend Developer" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Company</label>
                  <input {...register('company', { required: true })} placeholder="e.g. Tech Solutions Inc." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Period</label>
                  <input {...register('period', { required: true })} placeholder="e.g. Jan 2020 - Present" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Description</label>
                  <textarea {...register('description', { required: true })} rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyan-400 focus:outline-none resize-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-cyan-500 text-white font-bold rounded-lg hover:bg-cyan-600 transition-colors">
                  {editingExperience ? 'Update Experience' : 'Create Experience'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
