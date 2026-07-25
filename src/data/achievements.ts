export interface Achievement {
  icon: string;        // emoji
  title: string;
  description: string;
  highlight?: string;  // optional accent text
}

export const achievements: Achievement[] = [
  {
    icon: '🏅',
    title: 'A1 Patent Grading',
    description:
      'Conceptualized a novel IoT architecture that passed internal evaluation and was awarded a top-tier A1 patent grading for high-value intellectual property.',
    highlight: 'Intellectual Property',
  },
  {
    icon: '⭐',
    title: 'Icon of the Month',
    description:
      'Awarded in September 2022 for reducing server calls and implementing reusable code design that improved user experience.',
    highlight: 'Sep 2022',
  },
  {
    icon: '🧑‍💻',
    title: 'Advanced & Professional Coding',
    description:
      'Passed Samsung\'s Advanced and Professional coding tests, demonstrating elite algorithmic and systems-level proficiency.',
    highlight: 'Certified',
  },
  {
    icon: '🇰🇷',
    title: 'On-site Collaboration — Korea',
    description:
      'Visited the Republic of Korea 3 times (2022, 2025, 2026) for cross-functional collaboration with Samsung HQ engineering teams.',
    highlight: '3 Visits',
  },
];

export const education = {
  institution: 'University of Rajshahi',
  degree: 'Bachelor of Science — Computer Science',
  period: 'Feb 2016 – Jan 2021',
  grade: '3.23 / 4.0',
};
