import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

const socialLinks = [
  {
    href: 'https://github.com/meherabrusho',
    icon: FaGithub,
    label: 'GitHub',
    hoverClass: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    href: 'https://www.linkedin.com/in/mohtasin-meherab/',
    icon: FaLinkedin,
    label: 'LinkedIn',
    hoverClass: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/80 dark:border-gray-800/50 bg-gray-50/50 dark:bg-[#060a12]">
      {/* Gradient top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Meherab<span className="text-purple-500">.</span>
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Lead Engineer at Samsung Electronics — building robust iOS
              ecosystems, reliable IoT connectivity, and autonomous AI systems.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/Resume - Mohtasin Meherab Sikder.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-400 ${social.hoverClass} transition-all hover:scale-110`}
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:rusho1152032@gmail.com"
              className="block text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors w-fit"
            >
              rusho1152032@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200/50 dark:border-gray-800/30 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Mohtasin Meherab Sikder. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
