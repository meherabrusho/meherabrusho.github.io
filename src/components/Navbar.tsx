import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Brain } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-80 transition-opacity">
              Portfolio
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/projects" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors">Projects</Link>
              <Link href="/blog" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-500 transition-colors">Blog</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/meherabrusho" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <FaLinkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors">
              <FaTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter / X</span>
            </a>
            <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors" title="HuggingFace">
              <Brain className="w-5 h-5" />
              <span className="sr-only">HuggingFace</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
