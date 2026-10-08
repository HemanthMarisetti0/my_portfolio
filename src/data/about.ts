import { Blocks, BrainCircuit, GraduationCap, Layers, Lightbulb, Network } from 'lucide-react'
import { site } from './site'
import type { Icon } from './types'

export const aboutParagraphs = [
  "I'm a software developer at Atelia Softwares in Hyderabad, where I've spent the last two and a half years building healthcare applications for practices, hospitals and patients, on both web and mobile. I started there as a full-stack intern and grew into a full-time developer.",
  'Day to day I build UI components, implement features end to end and integrate them with REST APIs, working in a team that runs on stand-ups, sprint planning and code reviews. I care about clean, maintainable TypeScript and about shipping work that holds up in production.',
  'Outside of work I enjoy building my own products and experimenting with AI: LLM integrations, retrieval-augmented generation and agents with function calling. I am always learning the next tool that helps me build better software.',
]

export const interests: { label: string; icon: Icon }[] = [
  { label: 'Solving real-world engineering problems', icon: Lightbulb },
  { label: 'Building scalable applications', icon: Layers },
  { label: 'Designing clean, predictable APIs', icon: Network },
  { label: 'Working with modern frontend technologies', icon: Blocks },
  { label: 'Experimenting with AI agents, RAG and LLMs', icon: BrainCircuit },
  { label: 'Continuously learning new technologies', icon: GraduationCap },
]

export const quickFacts = [
  { label: 'Role', value: site.role },
  { label: 'Company', value: site.company },
  { label: 'Experience', value: site.experience },
  { label: 'Education', value: 'B.Tech, ECE' },
  { label: 'Location', value: site.location },
  { label: 'Languages', value: site.languages.join(', ') },
]
