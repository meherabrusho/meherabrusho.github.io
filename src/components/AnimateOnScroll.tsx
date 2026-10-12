'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the animation starts after becoming visible */
  delay?: number;
  /** IntersectionObserver threshold (0-1). Default 0.1 */
  threshold?: number;
  /** Animation variant */
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right';
}

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  animation = 'fade-up',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
