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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('issuer', data.issuer);
    formData.append('date', data.date);
    formData.append('category', data.category);
    formData.append('icon', data.icon || 'Award');
    formData.append('verificationUrl', data.verificationUrl || '');

    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    } else if (editingCertificate?.imageUrl) {
      formData.append('imageUrl', editingCertificate.imageUrl);
    }

    try {
      if (editingCertificate) {
        await api.updateCertificate(editingCertificate._id!, formData);
        addToast('Certificate updated successfully!');
      } else {
        await api.addCertificate(formData);
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
      setImagePreview(certificate.imageUrl || null);
      Object.keys(certificate).forEach((key) => {
        if (key !== 'imageUrl') {
          setValue(key, (certificate as any)[key]);
        }
      });
    } else {
      setEditingCertificate(null);
      setImagePreview(null);
      reset({});
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCertificate(null);
    setImagePreview(null);
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
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-video bg-white/5" />
              <div className="p-6 space-y-4">
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
            <div key={certificate._id} className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
              <div className="aspect-video bg-black/50 relative">
                {certificate.imageUrl ? (
                  <img src={certificate.imageUrl} alt={certificate.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <Award size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    onClick={() => openModal(certificate)}
                    className="p-3 bg-white/20 text-white rounded-full hover:bg-white/40 transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(certificate._id!)}
                    className="p-3 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-bold rounded-full bg-white/5 text-white/60">
                    {certificate.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-bold rounded-full bg-white/5 text-white/60">
                    {certificate.date}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{certificate.title}</h3>
                <p className="text-white/40 text-sm">{certificate.issuer}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-dark border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">

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
                  <label className="text-sm font-medium text-white/60">Certificate Image</label>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      {...register('image', {
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
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Date</label>
                    <input {...register('date', { required: true })} placeholder="e.g. 2023" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">Category</label>
                    <input {...register('category', { required: true })} placeholder="e.g. Certification" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Verification Link (Optional)</label>
                  <input {...register('verificationUrl')} placeholder="https://..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Icon Name (optional)</label>
                  <input {...register('icon')} placeholder="Award" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-emerald-400 focus:outline-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition-colors">
                  {editingCertificate ? 'Update Certificate' : 'Create Certificate'}
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
                      <Award size={48} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 text-xs bg-white/5 rounded-md text-white/60">Category</span>
                    <span className="px-2 py-1 text-xs bg-white/5 rounded-md text-white/60">Date</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Certificate Title</h3>
                  <p className="text-white/40 text-sm">Issuer Name</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
