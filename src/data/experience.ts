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
      'Mentored an agile team of 4 engineers to drive high-quality technical execution aligned with strategic business goals.',
      'Architected an autonomous AI orchestration layer to triage and analyze user feedback (VoCs), drastically reducing MTTR.',
      'Spearheaded a remote device-to-device test framework for IoT & Mobile Automation, eliminating physical hardware constraints and establishing CI guardrails.',
      'Led the technical discovery and engineering of Proof of Concepts (PoCs) for next-generation mobile AI features.',
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
