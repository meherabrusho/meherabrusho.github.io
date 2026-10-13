import { getAllProjects } from "@/lib/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of iOS, IoT, and AI engineering work by Mohtasin Meherab Sikder.",
};

export default function Projects() {
  const projects = getAllProjects();

  return (
    <div className="space-y-12">
      <div className="space-y-4 fade-in-up">
        <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
          Portfolio
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          A showcase of iOS, IoT, and AI engineering work — from device
          onboarding architectures to autonomous AI orchestration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`glass-card hover-up hover-glow flex flex-col p-6 rounded-2xl group fade-in-up fade-in-up-delay-${Math.min(index + 1, 6)}`}
          >
            {/* Top metadata strip: Key Impact Metric + Role */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              {project.metric ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  {project.metric}
                </span>
              ) : <div />}
              {project.role && (
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  {project.role}
                </span>
              )}
            </div>

            <div className="flex items-start justify-between mb-3">
              <Link href={`/projects/${project.slug}`} className="block group">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
              </Link>
              <Cpu className="w-5 h-5 text-gray-300 dark:text-gray-700 flex-shrink-0 ml-2 mt-1" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/60">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mr-auto group/link"
              >
                Read Case Study
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
              </Link>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <FaGithub className="w-4 h-4 mr-2" />
                  Code
                </a>
              )}
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm font-medium text-cyan-600 dark:text-purple-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
