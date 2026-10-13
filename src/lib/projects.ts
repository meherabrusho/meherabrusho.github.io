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
  metric?: string;
  role?: string;
  domain?: string;
}

export interface Project {
  metadata: ProjectMetadata;
  content: string;
}

const PROJECT_HIGHLIGHTS: Record<string, { metric: string; role: string; domain: string }> = {
  'agentic-ai-orchestration-layer': {
    metric: '80%+ Automated Triage',
    role: 'Technical Lead · AI Systems',
    domain: 'Agentic AI & MCP Orchestration',
  },
  'iot-device-onboarding-architecture': {
    metric: '400+ Files · 0 Regressions',
    role: 'Tech Lead · Samsung SmartThings',
    domain: 'Distributed IoT & Mobile Platform',
  },
  'remote-d2d-test-framework': {
    metric: 'Hardware-Free CI Automation',
    role: 'Lead Engineer · Automation Infra',
    domain: 'Virtualization & CI Guardrails',
  },
  'ble-zigbee-connection-modules': {
    metric: '88% BLE Success Rate',
    role: 'Core Contributor · IoT Modules',
    domain: 'Hardware Protocol & Mesh Comms',
  },
  'portfolio-website': {
    metric: 'Dynamic AI Canvas & SSG',
    role: 'Full-Stack Architecture',
    domain: 'Next.js & Performance Engineering',
  },
};

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
      const defaults = PROJECT_HIGHLIGHTS[slug] || {
        metric: '',
        role: 'Engineering Lead',
        domain: 'Software Architecture',
      };
      
      return {
        slug,
        title: matterResult.data.title,
        description: matterResult.data.description,
        tags: matterResult.data.tags || [],
        repo: matterResult.data.repo || '',
        link: matterResult.data.link || '#',
        featured: matterResult.data.featured ?? false,
        order: matterResult.data.order ?? 99,
        metric: matterResult.data.metric || defaults.metric,
        role: matterResult.data.role || defaults.role,
        domain: matterResult.data.domain || defaults.domain,
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
  const defaults = PROJECT_HIGHLIGHTS[slug] || {
    metric: '',
    role: 'Engineering Lead',
    domain: 'Software Architecture',
  };
  
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
      metric: matterResult.data.metric || defaults.metric,
      role: matterResult.data.role || defaults.role,
      domain: matterResult.data.domain || defaults.domain,
    },
    content: matterResult.content,
  };
}
