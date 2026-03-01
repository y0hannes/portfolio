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
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((project: any) => ({
      ...project,
      codeLink: project.code_link,
      imageUrl: project.image_url,
      isFinished: project.is_finished,
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

  const projectData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    tags: (formData.get('tags') as string).split(',').map((tag) => tag.trim()),
    code_link: formData.get('codeLink') as string,
    link: formData.get('link') as string,
    is_finished: formData.get('isFinished') === 'true',
    image_url: imageUrl,
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
      imageUrl: cert.image_url,
    }));
  } catch (error) {
    console.error('Failed to fetch certificates', error);
    return [];
  }
};

const addCertificate = async (data: Omit<Certificate, 'id'>): Promise<void> => {
  const { error } = await supabase.from('certificates').insert([data]);
  if (error) throw error;
};

const updateCertificate = async (
  id: string,
  formData: FormData,
): Promise<void> => {
  const { error } = await supabase
    .from('certificates')
    .update(data)
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
  getMessages,
  sendMessage,
  deleteMessage,
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
};
