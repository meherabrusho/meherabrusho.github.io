'use client';

import {
  Smartphone,
  Wifi,
  BrainCircuit,
  Cpu,
  Layers,
  GitBranch,
  Zap,
  Shield,
} from 'lucide-react';

const icons = [
  { Icon: Smartphone, x: '12%', y: '18%', size: 28, delay: '0s', duration: '18s' },
  { Icon: Wifi, x: '85%', y: '22%', size: 24, delay: '2s', duration: '20s' },
  { Icon: BrainCircuit, x: '78%', y: '65%', size: 30, delay: '1s', duration: '16s' },
  { Icon: Cpu, x: '8%', y: '70%', size: 22, delay: '3s', duration: '22s' },
  { Icon: Layers, x: '25%', y: '80%', size: 20, delay: '4s', duration: '19s' },
  { Icon: GitBranch, x: '68%', y: '12%', size: 22, delay: '1.5s', duration: '21s' },
  { Icon: Zap, x: '92%', y: '48%', size: 18, delay: '2.5s', duration: '17s' },
  { Icon: Shield, x: '5%', y: '42%', size: 20, delay: '3.5s', duration: '23s' },
];

export default function HeroIcons() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {icons.map(({ Icon, x, y, size, delay, duration }, i) => (
        <div
          key={i}
          className="absolute hero-float-icon"
          style={{
            left: x,
            top: y,
            animationDelay: delay,
            animationDuration: duration,
          }}
        >
          <Icon
            className="text-purple-400/[0.08] dark:text-purple-400/[0.12]"
            style={{ width: size, height: size }}
          />
        </div>
      ))}
    </div>
  );
}
