import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useToast } from '../../components/common/Toast';
import { type Certificate } from '../../../../types/Certificate';
import { Trash2, Plus, X, Pencil, Award } from 'lucide-react';


export const Certificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = () => {
    setIsLoading(true);
    api.getCertificates().then(setCertificates).finally(() => setIsLoading(false));
  };

  const onSubmit = async (data: any) => {
    // Force lowercase for icon or use default if empty
    data.icon = data.icon ? data.icon : 'Award';
    try {
      if (editingCertificate) {
        await api.updateCertificate(editingCertificate._id!, data);
        addToast('Certificate updated successfully!');
      } else {
        await api.addCertificate(data);
        addToast('Certificate created successfully!');
      }
      closeModal();
      loadCertificates();
    } catch (error) {
      addToast('Failed to save certificate', 'error');
    }
  };

  const openModal = (certificate?: Certificate) => {
    if (certificate) {
      setEditingCertificate(certificate);
      Object.keys(certificate).forEach((key) => {
        setValue(key, (certificate as any)[key]);
      });
    } else {
      setEditingCertificate(null);
      reset({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCertificate(null);
    reset({});
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await api.deleteCertificate(id);
        addToast('Certificate deleted', 'info');
        loadCertificates();
      } catch (error) {
        addToast('Failed to delete certificate', 'error');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold">Certificates & Accomplishments</h1>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Certificate</span>
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
              </div>
            </div>
          ))
        ) : (
          certificates.map((certificate) => (
            <div key={certificate._id} className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors p-6">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(certificate)}
                  className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(certificate._id!)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-6">
                <Award className="text-teal-400" size={24} />
              </div>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-white/5 text-white/60">
                  {certificate.category}
                </span>
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-white/5 text-white/60">
                  {certificate.date}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1">{certificate.title}</h3>
              <p className="text-white/40 text-sm">{certificate.issuer}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-dark border border-white/10 rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Form Side */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">
                  {editingCertificate ? 'Edit Certificate' : 'New Certificate'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Title</label>
                  <input {...register('title', { required: true })} placeholder="e.g. AWS Certified Developer" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Issuer</label>
                  <input {...register('issuer', { required: true })} placeholder="e.g. Amazon Web Services" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Date</label>
                  <input {...register('date', { required: true })} placeholder="e.g. 2023 or Jan 2023" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Category</label>
                  <input {...register('category', { required: true })} placeholder="e.g. Certification, Course, Top 10%, Award" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Icon (Lucide React Component Name - optional)</label>
                  <input {...register('icon')} placeholder="e.g. Award, Star, Certificate" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors">
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
