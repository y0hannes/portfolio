import axios from 'axios';

const API_create = axios.create({
  baseURL: '/api',
});

// Add auth token to requests
API_create.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
  codeLink: string;
  isFinished: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
}

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

const addProject = async (project: any): Promise<void> => {
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

const sendMessage = async (data: any): Promise<void> => {
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
