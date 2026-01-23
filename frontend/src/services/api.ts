import { MOCK_PROJECTS } from '../data/mockData';
import type { Project } from '../data/mockData';

// Re-export Project type for use in components
export type { Project };

const getProjects = async (): Promise<Project[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PROJECTS);
    }, 800);
  });
};

const sendMessage = async (data: any): Promise<void> => {
  console.log('Message sent:', data);
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const api = {
  getProjects,
  sendMessage,
};
