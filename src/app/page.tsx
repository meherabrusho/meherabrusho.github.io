import Link from 'next/link';
import {
  ArrowRight,
  Code,
  BrainCircuit,
  Terminal,
  Mail,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Database,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { getAllPosts } from '@/lib/blog';

const techStack = [
  { name: 'TypeScript', icon: Code, color: 'text-blue-500' },
  { name: 'React / Next.js', icon: Layers, color: 'text-cyan-500' },
  { name: 'Python', icon: Terminal, color: 'text-yellow-500' },
  { name: 'Machine Learning', icon: BrainCircuit, color: 'text-purple-500' },
  { name: 'Cloud / DevOps', icon: Globe, color: 'text-emerald-500' },
  { name: 'Databases', icon: Database, color: 'text-orange-500' },
];

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col space-y-28">
      {/* ═══════════ Hero Section ═══════════ */}
      <section className="relative pt-16 sm:pt-24 pb-10 flex flex-col items-center text-center">
        {/* Background glow blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="w-[500px] h-[500px] bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-[120px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }} />
          <div className="w-[350px] h-[350px] bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-[100px] absolute top-1/4 left-1/4" style={{ animation: 'pulse-glow 6s ease-in-out infinite 2s' }} />
          <div className="w-[250px] h-[250px] bg-pink-500/10 dark:bg-pink-500/15 rounded-full blur-[80px] absolute bottom-1/4 right-1/4" style={{ animation: 'pulse-glow 6s ease-in-out infinite 4s' }} />
        </div>

        {/* Greeting badge */}
        <div className="fade-in-up inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40 mb-8">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Welcome to my corner of the internet
          </span>
        </div>

        <h1 className="fade-in-up fade-in-up-delay-1 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block text-gray-900 dark:text-white">Software Engineer</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 pb-2 animate-gradient-shift">
            &amp; AI Enthusiast
          </span>
        </h1>

        <p className="fade-in-up fade-in-up-delay-2 max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          Building elegant, high-performance software systems and exploring the frontiers of artificial intelligence. I write code, train models, and ship products.
        </p>

        <div className="fade-in-up fade-in-up-delay-3 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20 dark:shadow-white/10"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white font-semibold hover:border-purple-400 dark:hover:border-cyan-600 hover:bg-purple-50 dark:hover:bg-cyan-950/20 transition-all"
          >
            Read the Blog <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════ About Section ═══════════ */}
      <section className="fade-in-up">
        <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="relative">
            <h2 className="text-sm font-semibold text-purple-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I&apos;m Meherab 👋
            </h3>
            <div className="max-w-3xl space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                I&apos;m a software engineer passionate about building products that sit at the intersection of great design and cutting-edge technology. My work spans full-stack web development, AI/ML systems, and developer tooling.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring the latest in large language models, contributing to open-source projects, or writing about the things I learn along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Expertise Section ═══════════ */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-purple-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
            What I Do
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Areas of Expertise
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Code,
              color: 'text-cyan-500',
              title: 'Software Development',
              description: 'Architecting robust, scalable web applications and backend systems using modern tech stacks.',
            },
            {
              icon: BrainCircuit,
              color: 'text-purple-500',
              title: 'Artificial Intelligence',
              description: 'Exploring machine learning models, LLMs, and integrating AI capabilities into practical applications.',
            },
            {
              icon: Terminal,
              color: 'text-blue-500',
              title: 'DevOps & Tooling',
              description: 'Setting up CI/CD pipelines, containerization, and writing scripts to automate workflows efficiently.',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`glass-card hover-up hover-glow p-8 rounded-2xl fade-in-up fade-in-up-delay-${index + 1}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                item.color === 'text-cyan-500' ? 'bg-cyan-50 dark:bg-cyan-950/40' :
                item.color === 'text-purple-500' ? 'bg-purple-50 dark:bg-purple-950/40' :
                'bg-blue-50 dark:bg-blue-950/40'
              }`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ Tech Stack ═══════════ */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-purple-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
            Technologies
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Tech Stack
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="glass-card hover-up flex flex-col items-center justify-center p-5 rounded-xl text-center group"
            >
              <tech.icon className={`w-7 h-7 ${tech.color} mb-3 group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ Featured Projects ═══════════ */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-sm font-semibold text-purple-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
              Portfolio
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Projects
            </h3>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors"
          >
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="glass-card hover-up hover-glow flex flex-col p-6 rounded-2xl group"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h4>
                <Cpu className="w-5 h-5 text-gray-300 dark:text-gray-700 flex-shrink-0 ml-2" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 flex-grow leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/projects"
          className="sm:hidden mt-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors"
        >
          View all projects <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </section>

      {/* ═══════════ Latest Blog Posts ═══════════ */}
      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-sm font-semibold text-purple-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
                Blog
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Latest Posts
              </h3>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors"
            >
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card hover-up block p-6 rounded-2xl group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h4>
                  <time className="text-sm text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════ Contact CTA ═══════════ */}
      <section className="relative">
        <div className="glass-card rounded-2xl p-8 md:p-14 text-center relative overflow-hidden">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Let&apos;s Build Something Together
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Have an interesting project or idea? I&apos;m always open to discussing new opportunities, collaborations, or just a friendly chat about tech.
            </p>
            <a
              href="mailto:meherab@example.com"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
