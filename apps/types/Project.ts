export interface Project {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  codeLink: string;
  isFinished: boolean;
  link?: string;
  imageUrl?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
