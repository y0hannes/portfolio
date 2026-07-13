import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { type Experience } from '../../../../types/Experience';
import { Trash2, Plus, X, Pencil, ChevronUp, ChevronDown, Briefcase } from 'lucide-react';

const inputCls =
  'w-full px-4 py-2.5 bg-dark-4 border border-white/10 rounded-lg focus:border-accent/50 focus:outline-none text-sand text-sm placeholder:text-sand/20 transition-colors duration-200';
const labelCls = 'text-[10px] font-medium text-sand/40 uppercase tracking-widest';

export const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => { load(); }, []);

  const load = () => {
    setIsLoading(true);
    api.getExperiences().then(setExperiences).finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      tags: typeof data.tags === 'string'
        ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : data.tags ?? [],
    };
    try {
      if (editing) {
        await api.updateExperience(editing.id!, payload);
        addToast('Experience updated!');
      } else {
        await api.addExperience(payload);
        addToast('Experience created!');
      }
      closeModal();
      load();
    } catch {
      addToast('Failed to save experience', 'error');
    }
  };

  const openModal = (exp?: Experience) => {
    if (exp) {
      setEditing(exp);
      Object.entries(exp).forEach(([k, v]) => {
        if (k === 'tags') setValue('tags', (v as string[]).join(', '));
        else setValue(k, v);
      });
    } else {
      setEditing(null);
      reset({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    reset({});
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await api.deleteExperience(id);
      addToast('Experience deleted', 'info');
      load();
    } catch {
      addToast('Failed to delete', 'error');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const ni = direction === 'up' ? index - 1 : index + 1;
    if (ni < 0 || ni >= experiences.length) return;
    const arr = [...experiences];
    [arr[index], arr[ni]] = [arr[ni], arr[index]];
    setExperiences(arr);
    try {
      await api.updateExperiencesOrder(arr.map((e, i) => ({ id: e.id!, sort_order: i })));
      addToast('Order updated');
    } catch {
      addToast('Failed to update order', 'error');
      load();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium text-sand">Experience</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-accent text-canvas text-sm font-medium rounded-lg hover:bg-accent-2 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-dark-3 border border-white/[0.06] rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-dark-4 rounded w-1/3 mb-3" />
              <div className="h-3 bg-dark-4 rounded w-1/4 mb-4" />
              <div className="h-3 bg-dark-4 rounded w-full" />
            </div>
          ))
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-white/[0.06] bg-dark-3">
            <Briefcase size={28} className="text-sand/20 mx-auto mb-3" />
            <p className="text-sand/30 text-sm">No experiences yet.</p>
          </div>
        ) : (
          experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="group flex items-start gap-4 bg-dark-3 border border-white/[0.06] rounded-xl p-5 hover:border-accent/30 transition-colors duration-200"
            >
              {/* Reorder */}
              <div className="flex flex-col gap-1 pt-0.5 shrink-0">
                <button
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1 bg-white/8 text-sand/40 rounded hover:bg-white/15 hover:text-sand transition-colors disabled:opacity-20"
                >
                  <ChevronUp size={13} />
                </button>
                <button
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === experiences.length - 1}
                  className="p-1 bg-white/8 text-sand/40 rounded hover:bg-white/15 hover:text-sand transition-colors disabled:opacity-20"
                >
                  <ChevronDown size={13} />
                </button>
              </div>

              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase size={16} className="text-sand/50" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-medium text-sand text-sm">{exp.role}</h3>
                  <span className="text-sand/25">·</span>
                  <span className="text-sand/50 text-xs">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span className="text-sand/25">·</span>
                      <span className="text-sand/35 text-xs">{exp.location}</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-sand/35 mb-2 uppercase tracking-wider">
                  {exp.startDate} — {exp.endDate}
                </p>
                <p className="text-sand/40 text-xs leading-relaxed line-clamp-2">{exp.description}</p>
                {exp.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] bg-accent/10 border border-accent/15 rounded text-sand/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                <button
                  onClick={() => openModal(exp)}
                  className="p-1.5 bg-white/8 text-sand/50 rounded-md hover:bg-white/15 hover:text-sand transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id!)}
                  className="p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-dark-2 border border-white/10 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-7 overflow-y-auto admin-scroll">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-lg font-medium text-sand">
                  {editing ? 'Edit Experience' : 'New Experience'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-1.5 hover:bg-white/8 rounded-lg text-sand/40 hover:text-sand transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <label className={labelCls}>Role / Title</label>
                  <input
                    {...register('role', { required: true })}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={inputCls}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelCls}>Company</label>
                    <input
                      {...register('company', { required: true })}
                      placeholder="e.g. Acme Inc."
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Location</label>
                    <input
                      {...register('location')}
                      placeholder="e.g. Remote"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelCls}>Start Date</label>
                    <input
                      {...register('startDate', { required: true })}
                      placeholder="e.g. Jan 2022"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>End Date</label>
                    <input
                      {...register('endDate', { required: true })}
                      placeholder="e.g. Present"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelCls}>Description</label>
                  <textarea
                    {...register('description', { required: true })}
                    rows={4}
                    placeholder="What did you do / achieve in this role?"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelCls}>Tags (comma separated)</label>
                  <input
                    {...register('tags')}
                    placeholder="React, TypeScript, Node.js"
                    className={inputCls}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-canvas text-sm font-medium rounded-lg hover:bg-accent-2 transition-colors duration-200"
                >
                  {editing ? 'Update Experience' : 'Create Experience'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
