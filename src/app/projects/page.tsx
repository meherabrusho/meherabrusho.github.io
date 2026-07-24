import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Projects</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A showcase of my open-source work, personal experiments, and AI side projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 backdrop-blur-sm group hover:border-purple-500/50 transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex space-x-4 mt-auto">
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <FaGithub className="w-4 h-4 mr-2" />
                  Code
                </a>
              )}
              {project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
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
