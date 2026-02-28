import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { Project } from '../../../types/Project';
import type { Message } from '../../../types/Message';
import type { Certificate } from '../../../types/Certificate';

const API_create = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000, // 30 seconds to allow for server wake-up
});

// Retry logic for 503/504 or network errors during wake-up
API_create.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    if (!config || !config.retry) return Promise.reject(error);

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(error);
    }

    config.retryCount += 1;
    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, config.retryDelay || 2000);
    });

    await backoff;
    return API_create(config);
  },
);

// Add auth token to requests
API_create.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Default retry configuration for GET requests
  if (config.method?.toLowerCase() === 'get') {
    (config as any).retry = 3;
    (config as any).retryDelay = 3000;
  }

  return config;
});

const authAdmin = async (password: string): Promise<boolean> => {
  try {
    const res = await API_create.post('/login', {
      username: 'admin',
      password,
    });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login failed', error);
    return false;
  }
};

const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await API_create.get('/projects');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch projects', error);
    return [];
  }
};

const addProject = async (formData: FormData): Promise<void> => {
  await API_create.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteProject = async (id: string): Promise<void> => {
  await API_create.delete(`/projects/${id}`);
};

const updateProject = async (id: string, formData: FormData): Promise<void> => {
  await API_create.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const getMessages = async (): Promise<Message[]> => {
  try {
    const res = await API_create.get('/messages');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch messages', error);
    return [];
  }
};

const sendMessage = async (data: Omit<Message, '_id'>): Promise<void> => {
  await API_create.post('/messages', data);
};

const deleteMessage = async (id: string): Promise<void> => {
  await API_create.delete(`/messages/${id}`);
};

const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const res = await API_create.get('/certificates');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch certificates', error);
    return [];
  }
};

const addCertificate = async (
  data: Omit<Certificate, '_id'>,
): Promise<void> => {
  await API_create.post('/certificates', data);
};

const updateCertificate = async (
  id: string,
  data: Partial<Certificate>,
): Promise<void> => {
  await API_create.put(`/certificates/${id}`, data);
};

const deleteCertificate = async (id: string): Promise<void> => {
  await API_create.delete(`/certificates/${id}`);
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
