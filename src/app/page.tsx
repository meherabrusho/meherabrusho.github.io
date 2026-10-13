import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  Smartphone,
  BrainCircuit,
  GraduationCap,
  Cpu,
} from 'lucide-react';
import { getAllProjects } from '@/lib/projects';
import { skills } from '@/data/skills';
import { achievements } from '@/data/achievements';
import { education } from '@/data/achievements';
import { getAllPosts } from '@/lib/blog';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter(p => p.featured).length > 0
    ? allProjects.filter(p => p.featured).slice(0, 3)
    : allProjects.slice(0, 3);

  return (
    <div className="flex flex-col space-y-16 md:space-y-20">
      {/* ═══════════ Hero Section ═══════════ */}
      <section id="hero" className="relative pt-6 sm:pt-10 pb-4 flex flex-col items-center text-center">
        {/* Subtle background glow — toned down for premium feel */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="w-[600px] h-[600px] bg-purple-500/8 dark:bg-purple-600/12 rounded-full blur-[140px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: 'pulse-glow 8s ease-in-out infinite' }}
          />
          <div
            className="w-[300px] h-[300px] bg-blue-500/6 dark:bg-blue-500/10 rounded-full blur-[100px] absolute top-1/4 left-1/4"
            style={{ animation: 'pulse-glow 8s ease-in-out infinite 3s' }}
          />
        </div>

        {/* Initials avatar / monogram badge */}
        <div className="fade-in-up mb-4 sm:mb-5">
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-xl shadow-purple-500/20 dark:shadow-purple-500/30">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-gray-950 flex items-center justify-center border border-purple-100 dark:border-purple-900/50">
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 dark:from-white dark:to-purple-200 bg-clip-text text-transparent tracking-tight">
                MS
              </span>
            </div>
          </div>
        </div>

        {/* Role badge */}
        <div className="fade-in-up fade-in-up-delay-1 inline-flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 mb-5 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            AI Engineer & Technical Lead
          </span>
        </div>

        <h1 className="fade-in-up fade-in-up-delay-2 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6">
          <span className="block text-gray-900 dark:text-white">
            Mohtasin Meherab
          </span>
          <span className="block text-gray-900 dark:text-white">Sikder</span>
        </h1>

        <p className="fade-in-up fade-in-up-delay-3 max-w-2xl text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed">
          <span className="subtitle-gradient">Agentic AI · Machine Learning · Architecture</span>
        </p>

        <p className="fade-in-up fade-in-up-delay-3 max-w-2xl text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
          Architecting autonomous AI systems using multi-agent orchestration, LLM-driven automation, and scalable architectures — drawing on deep experience building robust ecosystems at Samsung Electronics.
        </p>

        <div className="fade-in-up fade-in-up-delay-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center justify-center w-full max-w-sm sm:max-w-none">
          {/* Primary CTA */}
          <Link
            href="/projects"
            className="btn-shimmer inline-flex items-center justify-center px-7 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-gray-900/10 dark:shadow-white/5 w-full sm:w-auto text-sm sm:text-base"
          >
            View Case Studies
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          {/* Secondary CTA */}
          <a
            href="/Resume - Mohtasin Meherab Sikder.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-purple-300 dark:border-purple-800/60 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto text-sm sm:text-base shadow-xs"
          >
            Get Resume
          </a>
          {/* Tertiary CTA */}
          <a
            href="mailto:rusho1152032@gmail.com"
            className="inline-flex items-center justify-center px-5 py-2.5 text-gray-600 dark:text-gray-400 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-full sm:w-auto text-sm"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </a>
        </div>
      </section>

      {/* ═══════════ About Section ═══════════ */}
      <AnimateOnScroll>
        <section id="about">
          <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="relative">
              <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                About
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Short Version
              </h3>
              <div className="max-w-3xl space-y-4 text-gray-700 dark:text-gray-400 text-lg leading-relaxed">
                <p>
                  I&apos;m an{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    AI Engineer and Technical Lead
                  </span>
                  , currently leading a team of engineers at Samsung Electronics. 
                  My work sits at the intersection of{' '}
                  <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
                    Agentic AI
                  </span>
                  ,{' '}
                  <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
                    Machine Learning
                  </span>
                  , and{' '}
                  <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
                    Software Architecture
                  </span>
                  .
                </p>
                <p>
                  I architect autonomous AI orchestration layers that triage and resolve complex user issues via MCP tooling and multi-agent systems. While my current focus is on building intelligent agents and automated pipelines, I draw heavily on my extensive background in designing robust, low-latency mobile platforms and connected IoT (Matter/BLE) ecosystems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Expertise Section ═══════════ */}
      <AnimateOnScroll>
        <section>
          <div className="mb-8 sm:mb-10">
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              What I Do
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Areas of Expertise
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BrainCircuit,
                title: 'Agentic AI',
                description:
                  'Architecting autonomous AI systems using multi-agent orchestration, MCP tooling, and prompt engineering to automate feedback triage and feature prototyping.',
                accent: 'purple',
              },
              {
                icon: Cpu,
                title: 'Machine Learning',
                description:
                  'Implementing intelligent evaluation harnesses, LLM integrations, and robust data pipelines for scalable AI-driven product solutions.',
                accent: 'blue',
              },
              {
                icon: Smartphone,
                title: 'Platform Architecture',
                description:
                  'Building scalable, reactive ecosystems with deep expertise in Swift, Combine, and reliable IoT protocols (BLE, Matter) serving millions of devices.',
                accent: 'purple',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card hover-up hover-border-glow p-8 rounded-2xl"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    item.accent === 'purple'
                      ? 'bg-purple-50 dark:bg-purple-950/30'
                      : item.accent === 'blue'
                        ? 'bg-blue-50 dark:bg-blue-950/30'
                        : 'bg-purple-50 dark:bg-purple-950/30'
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.accent === 'purple'
                        ? 'text-purple-500'
                        : item.accent === 'blue'
                          ? 'text-blue-500'
                          : 'text-purple-500'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Experience Timeline — Alt Background ═══════════ */}
      <AnimateOnScroll>
        <section id="experience" className="section-alt-bg">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              Career
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Experience
            </h3>
          </div>
          <ExperienceTimeline />
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Tech Stack / Skills — Consolidated ═══════════ */}
      <AnimateOnScroll>
        <section>
          <div className="mb-8 sm:mb-10">
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              Technologies
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Skills & Stack
            </h3>
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((category) => (
                <div key={category.category}>
                  <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
                    {category.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="skill-tag px-2.5 py-1 text-xs font-mono rounded-md bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Achievements ═══════════ */}
      <AnimateOnScroll>
        <section>
          <div className="mb-8 sm:mb-10">
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              Recognition
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Achievements & IP
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="glass-card hover-up hover-border-glow rounded-2xl p-6 flex gap-5"
              >
                <div className="text-3xl flex-shrink-0 mt-0.5">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {a.title}
                    </h4>
                    {a.highlight && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40 whitespace-nowrap">
                        {a.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Education ═══════════ */}
      <AnimateOnScroll>
        <section>
          <div className="glass-card rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                Education
              </h2>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {education.degree}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
                {education.institution}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="font-mono">{education.period}</span>
                <span>
                  GPA:{' '}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {education.grade}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Featured Projects ═══════════ */}
      <AnimateOnScroll>
        <section id="projects">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                Portfolio
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Featured Projects
              </h3>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="glass-card hover-up hover-border-glow flex flex-col p-6 rounded-2xl group cursor-pointer"
              >
                {project.metric && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/50 mb-3 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    {project.metric}
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/projects"
            className="sm:hidden mt-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            View all projects <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </section>
      </AnimateOnScroll>

      {/* ═══════════ Latest Blog Posts ═══════════ */}
      {latestPosts.length > 0 && (
        <AnimateOnScroll>
          <section>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                  Blog
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Latest Posts
                </h3>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                View all <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass-card hover-up hover-border-glow block p-6 rounded-2xl group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
        </AnimateOnScroll>
      )}

      {/* ═══════════ Contact CTA ═══════════ */}
      <AnimateOnScroll>
        <section id="contact" className="relative">
          <div className="glass-card rounded-2xl p-8 md:p-14 text-center relative overflow-hidden">
            {/* Stronger gradient mesh for CTA prominence */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-blue-500/8 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-900/10 dark:shadow-white/5">
                <Mail className="w-7 h-7 text-white dark:text-gray-900" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Interested in discussing iOS architecture, IoT systems, or
                agentic AI? I&apos;m always open to new conversations and
                collaborations.
              </p>
              <a
                href="mailto:rusho1152032@gmail.com"
                className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-gray-900/10 dark:shadow-white/5"
              >
                <Mail className="w-4 h-4 mr-2" />
                rusho1152032@gmail.com
              </a>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
