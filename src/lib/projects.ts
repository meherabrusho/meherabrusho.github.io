import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/projects');

export interface ProjectMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  link: string;
  featured?: boolean;
  order?: number;
}

export interface Project {
  metadata: ProjectMetadata;
  content: string;
}

export function getAllProjects(): ProjectMetadata[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(contentDirectory);
  const allProjectsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      
      return {
        slug,
        title: matterResult.data.title,
        description: matterResult.data.description,
        tags: matterResult.data.tags || [],
        repo: matterResult.data.repo || '',
        link: matterResult.data.link || '#',
        featured: matterResult.data.featured ?? false,
        order: matterResult.data.order ?? 99,
      };
    });
    
  return allProjectsData.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  return {
    metadata: {
      slug,
      title: matterResult.data.title,
      description: matterResult.data.description,
      tags: matterResult.data.tags || [],
      repo: matterResult.data.repo || '',
      link: matterResult.data.link || '#',
      featured: matterResult.data.featured ?? false,
      order: matterResult.data.order ?? 99,
    },
    content: matterResult.content,
  };
}
