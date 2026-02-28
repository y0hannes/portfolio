export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  codeLink: string;
  isFinished: boolean;
  link?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
