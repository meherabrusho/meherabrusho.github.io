'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/50 bg-white/70 dark:bg-[#0a0f1a]/70 backdrop-blur-xl"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Desktop Nav */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
            >
              Meherab<span className="text-purple-500">.</span>
            </Link>
            <div className="hidden md:flex space-x-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side: socials + theme + mobile toggle */}
          <div className="flex items-center space-x-3">
            {/* Social icons — hidden on mobile */}
            <div className="hidden sm:flex items-center space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg text-gray-400 dark:text-gray-500 ${social.hoverClass} transition-colors`}
                >
                  <social.icon className="w-[18px] h-[18px]" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700" />

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#0a0f1a]/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg text-gray-400 ${social.hoverClass} transition-colors`}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
