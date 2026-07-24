import Link from 'next/link';
import { ArrowRight, Code, BrainCircuit, Terminal } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col space-y-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 flex flex-col items-center text-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-screen" />
          <div className="w-[400px] h-[400px] bg-cyan-500/20 dark:bg-cyan-500/20 rounded-full blur-[100px] absolute top-1/3 left-1/3 opacity-50 mix-blend-screen" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block text-gray-900 dark:text-white">Software Engineer</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 pb-2">
            & AI Enthusiast
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          Building elegant, high-performance software systems and exploring the frontiers of artificial intelligence. I write code, train models, and ship products.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="/projects" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95">
            View Projects
          </Link>
          <Link href="/blog" className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            Read the Blog <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
          <Code className="w-10 h-10 text-cyan-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Software Development</h3>
          <p className="text-gray-600 dark:text-gray-400">Architecting robust, scalable web applications and backend systems using modern tech stacks.</p>
        </div>
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <BrainCircuit className="w-10 h-10 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Artificial Intelligence</h3>
          <p className="text-gray-600 dark:text-gray-400">Exploring machine learning models, LLMs, and integrating AI capabilities into practical applications.</p>
        </div>
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
          <Terminal className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">DevOps & Tooling</h3>
          <p className="text-gray-600 dark:text-gray-400">Setting up CI/CD pipelines, containerization, and writing scripts to automate workflows efficiently.</p>
        </div>
      </section>
    </div>
  );
}
