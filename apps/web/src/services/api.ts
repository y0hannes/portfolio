import axios from 'axios';

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

import type { Project, Message } from '@shared';
import type { InternalAxiosRequestConfig } from 'axios';
export type { Project, Message };

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

const addProject = async (project: Omit<Project, '_id'>): Promise<void> => {
  await API_create.post('/projects', project);
};

const deleteProject = async (id: string): Promise<void> => {
  await API_create.delete(`/projects/${id}`);
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

export const api = {
  authAdmin,
  getProjects,
  addProject,
  deleteProject,
  getMessages,
  sendMessage,
};
