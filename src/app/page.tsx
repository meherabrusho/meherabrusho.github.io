import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  Smartphone,
  Wifi,
  BrainCircuit,
  GraduationCap,
  Award,
  Cpu,
} from 'lucide-react';
import { getAllProjects } from '@/lib/projects';
import { skills } from '@/data/skills';
import { achievements } from '@/data/achievements';
import { education } from '@/data/achievements';
import { getAllPosts } from '@/lib/blog';
import ExperienceTimeline from '@/components/ExperienceTimeline';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.filter(p => p.featured).length > 0
    ? allProjects.filter(p => p.featured).slice(0, 3)
    : allProjects.slice(0, 3);

  return (
    <div className="flex flex-col space-y-24 md:space-y-32">
      {/* ═══════════ Hero Section ═══════════ */}
      <section className="relative pt-16 sm:pt-24 pb-6 flex flex-col items-center text-center">
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

        {/* Role badge */}
        <div className="fade-in-up inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700/50 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Lead Engineer at Samsung Electronics
          </span>
        </div>

        <h1 className="fade-in-up fade-in-up-delay-1 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="block text-gray-900 dark:text-white">
            Mohtasin Meherab
          </span>
          <span className="block text-gray-900 dark:text-white">Sikder</span>
        </h1>

        <p className="fade-in-up fade-in-up-delay-2 max-w-2xl text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          iOS · IoT · Agentic AI
        </p>

        <p className="fade-in-up fade-in-up-delay-2 max-w-2xl text-base md:text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
          Building robust mobile ecosystems at scale, engineering reliable IoT
          connectivity protocols, and architecting autonomous AI systems — all
          at Samsung Electronics.
        </p>

        <div className="fade-in-up fade-in-up-delay-3 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-gray-900/10 dark:shadow-white/5 w-full sm:w-auto"
          >
            View Case Studies
          </Link>
          <a
            href="/Resume - Mohtasin Meherab Sikder.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-purple-200 dark:border-purple-800/40 bg-purple-50/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 font-semibold hover:bg-purple-100 dark:hover:bg-purple-950/40 transition-all hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
          >
            Get Resume
          </a>
          <a
            href="mailto:rusho1152032@gmail.com"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all w-full sm:w-auto"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </a>
        </div>
      </section>

      {/* ═══════════ About Section ═══════════ */}
      <section className="fade-in-up">
        <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="relative">
            <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              About
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Short Version
            </h3>
            <div className="max-w-3xl space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                I&apos;m a Lead Engineer at{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Samsung Electronics
                </span>
                , where I&apos;ve grown from a Software Engineer to leading a
                team of engineers over 4+ years. My work sits at the
                intersection of{' '}
                <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
                  iOS
                </span>
                ,{' '}
                <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
                  IoT
                </span>
                , and{' '}
                <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400">
                  Agentic AI
                </span>
                .
              </p>
              <p>
                I architect device onboarding systems, engineer stable
                connectivity modules for BLE, Zigbee, and Matter protocols, and
                most recently, I&apos;ve been building autonomous AI
                orchestration layers that triage and resolve user issues. I hold
                a top-tier A1 patent grading for a novel IoT architecture I
                conceptualized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Expertise Section ═══════════ */}
      <section>
        <div className="text-center mb-12">
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
              icon: Smartphone,
              title: 'iOS Engineering',
              description:
                'Building complex mobile features with SwiftUI, UIKit, Combine and Swift 6 concurrency — from layout systems to reactive architectures like MVVM-C and VIPER.',
              accent: 'purple',
            },
            {
              icon: Wifi,
              title: 'IoT & Connectivity',
              description:
                'Designing and engineering reliable device communication modules across BLE, Zigbee, Z-Wave, Matter, mDNS, LAN, and SoftAP protocols.',
              accent: 'blue',
            },
            {
              icon: BrainCircuit,
              title: 'Agentic AI',
              description:
                'Architecting autonomous AI systems using multi-agent orchestration, MCP tooling, and prompt engineering to automate feedback triage and feature prototyping.',
              accent: 'purple',
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={`glass-card hover-up p-8 rounded-2xl fade-in-up fade-in-up-delay-${index + 1}`}
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

      {/* ═══════════ Experience Timeline ═══════════ */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
            Career
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Experience
          </h3>
        </div>
        <ExperienceTimeline />
      </section>

      {/* ═══════════ Tech Stack / Skills ═══════════ */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
            Technologies
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Skills & Stack
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((category) => (
            <div
              key={category.category}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4">
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm font-mono rounded-lg bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ Achievements ═══════════ */}
      <section>
        <div className="text-center mb-12">
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
              className="glass-card hover-up rounded-2xl p-6 flex gap-5"
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

      {/* ═══════════ Education ═══════════ */}
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

      {/* ═══════════ Featured Projects ═══════════ */}
      <section>
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
              className="glass-card hover-up flex flex-col p-6 rounded-2xl group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
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
                    className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
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

      {/* ═══════════ Latest Blog Posts ═══════════ */}
      {latestPosts.length > 0 && (
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
                className="glass-card hover-up block p-6 rounded-2xl group"
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
      )}

      {/* ═══════════ Contact CTA ═══════════ */}
      <section className="relative">
        <div className="glass-card rounded-2xl p-8 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

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
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-gray-900/10 dark:shadow-white/5"
            >
              <Mail className="w-4 h-4 mr-2" />
              rusho1152032@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
