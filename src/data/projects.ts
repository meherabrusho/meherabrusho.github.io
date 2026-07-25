export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
}

export const projects: Project[] = [
  {
    title: 'Agentic AI Orchestration Layer',
    description:
      'An autonomous AI system that triages and analyzes user feedback (VoCs) to drastically reduce Mean Time To Resolution, using multi-agent orchestration and prompt engineering.',
    tags: ['Python', 'Agentic AI', 'MCP', 'Prompt Engineering'],
    link: '#',
    repo: 'https://github.com/meherabrusho',
  },
  {
    title: 'IoT Device Onboarding Architecture',
    description:
      'Designed and implemented the device onboarding system for Samsung SmartThings, orchestrating a 400+ file migration from ReactiveSwift to Combine with zero regressions.',
    tags: ['Swift', 'Combine', 'BLE', 'Zigbee', 'PlantUML'],
    link: '#',
    repo: 'https://github.com/meherabrusho',
  },
  {
    title: 'Remote D2D Test Framework',
    description:
      'A device-to-device test automation framework for IoT and mobile platforms, eliminating physical hardware constraints and establishing CI guardrails for early anomaly detection.',
    tags: ['Python', 'CI/CD', 'IoT', 'Automation'],
    link: '#',
    repo: 'https://github.com/meherabrusho',
  },
  {
    title: 'BLE & Zigbee Connection Modules',
    description:
      'Engineered highly stable connection modules achieving 88% success rate for BLE Hubs and 73% for hybrid Zigbee+BLE locks across diverse hardware.',
    tags: ['Swift', 'BLE', 'Zigbee', 'Matter', 'SoftAP'],
    link: '#',
    repo: 'https://github.com/meherabrusho',
  },
  {
    title: 'Portfolio Website',
    description:
      'This website — built with Next.js 16, Tailwind CSS 4, and deployed on GitHub Pages with a premium dark-mode design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: 'https://meherabrusho.github.io',
    repo: 'https://github.com/meherabrusho/meherabrusho.github.io',
  },
];
