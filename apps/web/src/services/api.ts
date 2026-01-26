import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { Project } from '../../../types/Project';
import type { Message } from '../../../types/Message';

const API_create = axios.create({
  baseURL: '/api',
});

// Add auth token to requests
API_create.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authAdmin = async (password: string): Promise<boolean> => {
  try {
    const res = await API_create.post('/login', { username: 'admin', password });
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

export const api = {
  authAdmin,
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getMessages,
  sendMessage,
  deleteMessage,
};
