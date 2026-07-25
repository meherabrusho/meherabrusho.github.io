export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Swift', 'Python'],
  },
  {
    category: 'iOS Development',
    items: ['SwiftUI', 'UIKit', 'ReactiveSwift', 'Combine', 'Swift 6 Concurrency'],
  },
  {
    category: 'Networking & IoT',
    items: ['BLE', 'mDNS', 'Zigbee', 'Z-Wave', 'LAN', 'Matter', 'SoftAP'],
  },
  {
    category: 'Architecture',
    items: ['MVVM-C', 'VIPER', 'SMA', 'Redux', 'DataLayer'],
  },
  {
    category: 'AI & Tooling',
    items: ['Agentic AI', 'MCP', 'Prompt Engineering', 'Coding Agent Workflows'],
  },
];
