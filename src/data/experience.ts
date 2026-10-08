import type { Experience } from './types'

/** Most recent first. Dates are 'YYYY-MM'; leave `end` out for the current role. */
export const experience: Experience[] = [
  {
    role: 'Software Developer',
    company: 'Atelia Softwares',
    location: 'Hyderabad, India',
    start: '2024-09',
    summary:
      'Developing and maintaining healthcare applications for practices, hospitals and patients across both web and mobile platforms.',
    responsibilities: [
      'Develop and maintain healthcare applications for Practice, Hospital and Patient users',
      'Ship features across both web and mobile platforms',
      'Build reusable UI components and implement assigned features',
      'Fix bugs while following coding standards and best practices',
      'Participate in daily stand-ups, sprint planning and code reviews',
      'Collaborate with the team to improve feature quality',
    ],
    technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'JavaScript', 'Node.js', 'REST APIs'],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Atelia Softwares',
    location: 'Hyderabad, India',
    start: '2023-12',
    end: '2024-09',
    summary: 'Contributed to both frontend and backend development in production-grade healthcare apps.',
    responsibilities: [
      'Contributed to frontend and backend development of production healthcare apps',
      'Assisted in building REST APIs',
      'Integrated APIs with frontend components',
    ],
    technologies: ['React', 'Node.js', 'REST APIs', 'JavaScript'],
  },
]
