import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Software Engineer & AI Enthusiast. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/meherabrusho" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
              <span className="sr-only">HuggingFace</span>
              <Brain className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
