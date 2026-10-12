'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800" aria-label="Toggle theme" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="w-4 h-4 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="w-4 h-4 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-blue-400" />
    </button>
  );
}
