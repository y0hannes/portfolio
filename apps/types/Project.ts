export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  codeLink: string;
  isFinished: boolean;
  link?: string;
  imageUrl?: string;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}
