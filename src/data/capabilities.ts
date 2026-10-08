import { Bot, Layers, LayoutTemplate, Server } from 'lucide-react'
import type { Capability } from './types'

export const capabilities: Capability[] = [
  {
    title: 'Frontend Engineering',
    description:
      'Building responsive, maintainable React applications: typed components, predictable state and interfaces that work on every screen.',
    icon: LayoutTemplate,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query'],
  },
  {
    title: 'Backend Engineering',
    description: 'Designing APIs, authentication systems and backend services that are clear to consume and safe by default.',
    icon: Server,
    tags: ['Node.js', 'NestJS', 'REST', 'JWT · OAuth'],
  },
  {
    title: 'AI Applications',
    description:
      'Building AI-powered tools using LLMs, agents and function calling, with guardrails like human approval where it matters.',
    icon: Bot,
    tags: ['Gemini', 'AI Agents', 'Function Calling'],
  },
  {
    title: 'Full-Stack Applications',
    description: 'Connecting modern frontend, backend and database technologies into complete products that solve a real problem.',
    icon: Layers,
    tags: ['PostgreSQL', 'Prisma', 'Firebase'],
  },
]
