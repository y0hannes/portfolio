export interface Experience {
  id?: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;       // use "Present" for current roles
  description: string;
  tags: string[];
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}
