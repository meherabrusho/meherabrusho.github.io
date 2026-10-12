export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Lead Engineer',
    company: 'Samsung Electronics',
    period: 'Mar 2026 – Present',
    location: 'Dhaka, Bangladesh',
    highlights: [
      'Architected an autonomous AI orchestration layer utilizing multi-agent systems and MCP tooling to triage user feedback (VoCs), drastically reducing MTTR.',
      'Led the technical discovery, prototyping, and engineering of next-generation AI and Machine Learning features for consumer applications.',
      'Spearheaded a remote device-to-device test framework for automation, establishing rigorous CI guardrails and eliminating physical hardware constraints.',
      'Mentored an agile team of engineers, driving high-quality technical execution and aligning technical architecture with strategic business goals.',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Samsung Electronics',
    period: 'Mar 2024 – Apr 2026',
    location: 'Dhaka, Bangladesh',
    highlights: [
      'Acted as Tech Lead for device onboarding, designing system blueprints (PlantUML) and orchestrating a 400+ file migration from ReactiveSwift to Combine.',
      'Engineered highly stable connection modules, achieving an 88% success rate for BLE Hubs and 73% for hybrid Zigbee+BLE locks.',
      'Standardized coding practices via rigorous reviews, mentored junior engineers, and resolved critical market VoCs through data-driven analysis.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Samsung Electronics',
    period: 'Jan 2022 – Feb 2024',
    location: 'Dhaka, Bangladesh',
    highlights: [
      'Spearheaded Test-Driven Development (TDD) for complex iOS and iPad layout features, ensuring high test coverage and rapid deployment cycles.',
      'Owned local device communication modules, driving LAN success rates from 67% to 80% while maintaining 75% reliability for Zigbee and Z-Wave registrations.',
      'Diagnosed and resolved critical memory leaks and architectural bottlenecks to significantly boost application responsiveness.',
    ],
  },
];
