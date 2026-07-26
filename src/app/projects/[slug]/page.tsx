import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ArrowLeft as ArrowLeftIcon, Cpu } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.metadata.title,
    description: project.metadata.description,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8 fade-in-up">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors group"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </Link>

      <header className="space-y-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div className="flex items-center space-x-3 text-purple-600 dark:text-purple-400">
          <Cpu className="w-6 h-6" />
          <span className="text-sm font-semibold uppercase tracking-wider">Project Case Study</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {project.metadata.title}
        </h1>
        
        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
          {project.metadata.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 pt-4 border-t border-gray-100 dark:border-gray-800/50">
          {project.metadata.repo && (
            <a
              href={project.metadata.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              <FaGithub className="w-4 h-4 mr-2" />
              GitHub Repository
            </a>
          )}
          {project.metadata.link !== "#" && (
            <a
              href={project.metadata.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors text-sm"
            >
              <FaExternalLinkAlt className="w-4 h-4 mr-2" />
              Live Demo
            </a>
          )}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-200/50 dark:prose-pre:border-gray-800/50">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>

      {/* Navigation footer */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors group"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all projects
        </Link>
      </div>
    </article>
  );
}
