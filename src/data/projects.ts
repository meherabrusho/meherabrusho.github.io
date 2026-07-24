export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
}

export const projects: Project[] = [
  {
    title: "AI Image Generator",
    description: "A stable diffusion based web app for generating images from text prompts, deployed on AWS.",
    tags: ["React", "Python", "FastAPI", "AWS"],
    link: "#",
    repo: "https://github.com/meherabrusho",
  },
  {
    title: "Portfolio Website",
    description: "This very website! Built with Next.js, Tailwind CSS, and optimized for GitHub Pages.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "#",
    repo: "https://github.com/meherabrusho/meherabrusho.github.io",
  },
  {
    title: "LLM Chat Assistant",
    description: "A customized chatbot interface utilizing open-source LLMs running locally with llama.cpp.",
    tags: ["Vue.js", "C++", "Docker"],
    link: "#",
    repo: "https://github.com/meherabrusho",
  }
];
