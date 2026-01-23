export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization, inventory management, and sales reporting tools.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Tailwind", "Recharts"],
    link: "#"
  },
  {
    id: 2,
    title: "AI Image Generator",
    description: "SaaS application that uses stable diffusion models to generate high-quality images from text descriptions, with user gallery and community features.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    tags: ["Next.js", "Python", "FastAPI", "Stripe"],
    link: "#"
  },
  {
    id: 3,
    title: "Smart Home Controller",
    description: "Mobile-first web application for managing IoT devices in a smart home ecosystem. Features voice control integration and automated routines.",
    imageUrl: "https://images.unsplash.com/photo-1558002038-109177381792?q=80&w=2670&auto=format&fit=crop",
    tags: ["Vue", "Firebase", "IoT", "PWA"],
    link: "#"
  }
];
