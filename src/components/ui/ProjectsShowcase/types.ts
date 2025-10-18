// components/ProjectsShowcase/types.ts

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  color: string;
  link: string;
  stats: Record<string, string>;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}