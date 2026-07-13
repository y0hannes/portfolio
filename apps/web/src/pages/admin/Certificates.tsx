import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { type Certificate } from '../../../../types/Certificate';
import { Trash2, Plus, X, Pencil, Award } from 'lucide-react';

const inputCls = 'w-full px-4 py-2.5 bg-white/[0.06] border border-white/15 rounded-lg focus:border-accent/60 focus:outline-none text-white text-sm placeholder:text-white/30 transition-colors duration-200';
const labelCls = 'text-[10px] font-semibold text-white/50 uppercase tracking-widest';

export const Certificates = () => {
  const [certificates,       setCertificates]       = useState<Certificate[]>([]);
  const [isModalOpen,        setIsModalOpen]        = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isLoading,          setIsLoading]          = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => { loadCertificates(); }, []);

  const loadCertificates = () => {
    setIsLoading(true);
    api.getCertificates().then(setCertificates).finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: any) => {
    data.icon = data.icon || 'Award';
    try {
      if (editingCertificate) { await api.updateCertificate(editingCertificate.id!, data); addToast('Certificate updated!'); }
      else                    { await api.addCertificate(data);                            addToast('Certificate created!'); }
      closeModal(); loadCertificates();
    } catch { addToast('Failed to save certificate', 'error'); }
  };

  const openModal = (cert?: Certificate) => {
    if (cert) {
      setEditingCertificate(cert);
      Object.keys(cert).forEach(k => setValue(k, (cert as any)[k]));
    } else { setEditingCertificate(null); reset({}); }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingCertificate(null); reset({}); };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this certificate?')) {
      try { await api.deleteCertificate(id); addToast('Certificate deleted', 'info'); loadCertificates(); }
      catch { addToast('Failed to delete', 'error'); }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Certificates</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-2 transition-colors duration-200 flex items-center gap-2"
        >
          <Plus size={16} /> Add Certificate
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="bg-dark-3 border border-white/[0.08] rounded-xl animate-pulse p-5">
              <div className="w-9 h-9 bg-dark-4 rounded-lg mb-5" />
              <div className="space-y-3">
                <div className="h-3 bg-dark-4 rounded w-3/4" />
                <div className="h-4 bg-dark-4 rounded" />
                <div className="h-3 bg-dark-4 rounded w-5/6" />
              </div>
            </div>
          ))
        ) : (
          certificates.map(cert => (
            <div key={cert.id} className="group relative bg-dark-3 border border-white/[0.08] rounded-xl p-5 hover:border-accent/35 transition-colors duration-200">
              <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={() => openModal(cert)}
                  className="p-1.5 bg-white/10 text-white/60 rounded-md hover:bg-white/20 hover:text-white transition-colors">
                  <Pencil size={13} />
                </button>
                <button onClick={() => handleDelete(cert.id!)}
                  className="p-1.5 bg-red-500/15 text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/25 flex items-center justify-center mb-5">
                <Award size={16} className="text-white/70" />
              </div>

              <div className="space-y-2">
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-accent/15 text-white/70">{cert.category}</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-white/8 text-white/50">{cert.date}</span>
                </div>
                <h3 className="font-semibold text-white text-sm leading-snug">{cert.title}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Issuer:</span>
                  <p className="text-white/65 text-xs font-medium">{cert.issuer}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-dark-2 border border-white/15 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-7 overflow-y-auto admin-scroll">
              <div className="flex items-center justify-between mb-7">
                <h2 className="text-lg font-semibold text-white">
                  {editingCertificate ? 'Edit Certificate' : 'New Certificate'}
                </h2>
                <button onClick={closeModal} className="p-1.5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <label className={labelCls}>Title</label>
                  <input {...register('title', { required: true })} placeholder="e.g. AWS Certified Developer" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Issuer</label>
                  <input {...register('issuer', { required: true })} placeholder="e.g. Amazon Web Services" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelCls}>Date</label>
                    <input {...register('date', { required: true })} placeholder="e.g. 2023" className={inputCls} />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCls}>Category</label>
                    <input {...register('category', { required: true })} placeholder="e.g. Certification" className={inputCls} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Verification Link (optional)</label>
                  <input {...register('verificationUrl')} placeholder="https://..." className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCls}>Icon (Lucide — optional)</label>
                  <input {...register('icon')} placeholder="Award" className={inputCls} />
                </div>
                <button type="submit" className="w-full py-3 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-2 transition-colors duration-200">
                  {editingCertificate ? 'Update Certificate' : 'Create Certificate'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
