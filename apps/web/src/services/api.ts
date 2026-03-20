import { supabase } from '../lib/supabase';
import type { Project } from '../../../types/Project';
import type { Message } from '../../../types/Message';
import type { Certificate } from '../../../types/Certificate';

/**
 * Utility to upload images to Supabase Storage
 */
const uploadImage = async (
  file: File,
  bucket: string = 'portfolio-assets',
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    return null;
  }
};

const authAdmin = async (password: string): Promise<boolean> => {
  try {
    // Assuming admin email is configured in Supabase Auth
    // The user will need to create this user in their Supabase project
    const { data, error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com',
      password,
    });

    if (error) throw error;
    return !!data.user;
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};

const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return (data || []).map((project: any) => ({
      ...project,
      codeLink: project.code_link,
      imageUrl: project.image_url,
      isFinished: project.is_finished,
      sortOrder: project.sort_order,
    }));
  } catch (error) {
    console.error('Failed to fetch projects', error);
    return [];
  }
};

const addProject = async (formData: FormData): Promise<void> => {
  const file = formData.get('image') as File;
  let imageUrl = formData.get('imageUrl') as string;

  if (file && file.size > 0) {
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  // Get current max sort_order
  const { data: maxOrderData } = await supabase
    .from('projects')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextOrder = maxOrderData && maxOrderData.length > 0
    ? (maxOrderData[0].sort_order || 0) + 1
    : 0;

  const projectData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    tags: (formData.get('tags') as string).split(',').map((tag) => tag.trim()),
    code_link: formData.get('codeLink') as string,
    link: formData.get('link') as string,
    is_finished: formData.get('isFinished') === 'true',
    image_url: imageUrl,
    sort_order: nextOrder,
  };

  const { error } = await supabase.from('projects').insert([projectData]);
  if (error) throw error;
};

const updateProject = async (id: string, formData: FormData): Promise<void> => {
  const file = formData.get('image') as File;
  let imageUrl = formData.get('imageUrl') as string;

  if (file && file.size > 0) {
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }

  const projectData: any = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    code_link: formData.get('codeLink') as string,
    link: formData.get('link') as string,
    is_finished: formData.get('isFinished') === 'true',
    image_url: imageUrl,
  };

  const tags = formData.get('tags') as string;
  if (tags) {
    projectData.tags = tags.split(',').map((tag) => tag.trim());
  }

  const { error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id);

  if (error) throw error;
};

const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
};

const updateProjectsOrder = async (projects: { id: string, sort_order: number }[]): Promise<void> => {
  const promises = projects.map(p =>
    supabase.from('projects').update({ sort_order: p.sort_order }).eq('id', p.id)
  );
  const results = await Promise.all(promises);
  const errors = results.filter(r => r.error).map(r => r.error);
  if (errors.length > 0) throw errors[0];
};

const getMessages = async (): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch messages', error);
    return [];
  }
};

const sendMessage = async (messageData: Omit<Message, 'id'>): Promise<void> => {
  const { error } = await supabase.from('messages').insert([messageData]);
  if (error) throw error;
};

const deleteMessage = async (id: string): Promise<void> => {
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw error;
};

const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map((cert: any) => ({
      ...cert,
      verificationUrl: cert.verification_url,
    }));
  } catch (error) {
    console.error('Failed to fetch certificates', error);
    return [];
  }
};

const addCertificate = async (data: Omit<Certificate, 'id'>): Promise<void> => {
  const certData = {
    title: data.title,
    issuer: data.issuer,
    date: data.date,
    category: data.category,
    icon: data.icon || 'Award',
    verification_url: data.verificationUrl,
  };

  const { error } = await supabase.from('certificates').insert([certData]);
  if (error) throw error;
};

const updateCertificate = async (
  id: string,
  data: Partial<Certificate>,
): Promise<void> => {
  const certData: any = { ...data };

  if (data.verificationUrl !== undefined) {
    certData.verification_url = data.verificationUrl;
    delete certData.verificationUrl;
  }

  const { error } = await supabase
    .from('certificates')
    .update(certData)
    .eq('id', id);
  if (error) throw error;
};

const deleteCertificate = async (id: string): Promise<void> => {
  const { error } = await supabase.from('certificates').delete().eq('id', id);
  if (error) throw error;
};

export const api = {
  authAdmin,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  updateProjectsOrder,
  getMessages,
  sendMessage,
  deleteMessage,
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
};
