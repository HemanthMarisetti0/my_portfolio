import type { ComponentType, SVGProps } from 'react'

export type Icon = ComponentType<SVGProps<SVGSVGElement>>

export interface NavItem {
  id: string
  label: string
}

export interface Skill {
  name: string
  icon: Icon
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: Icon
  skills: Skill[]
  /** Tailwind grid span classes for the bento layout. */
  span: string
}

export interface Experience {
  role: string
  company: string
  location: string
  /** 'YYYY-MM' */
  start: string
  /** 'YYYY-MM'; omit for a current role. */
  end?: string
  summary: string
  responsibilities: string[]
  technologies: string[]
}

export interface Screenshot {
  src: string
  alt: string
  width: number
  height: number
  /** Address shown in the browser-frame bar above the screenshot. */
  url: string
  /** CSS object-position for the zoomed card thumbnail, e.g. '70% 45%'. Defaults to the centre. */
  focus?: string
}

export interface ArchitectureNode {
  title: string
  detail: string
  tech: string
  icon: Icon
  /** Visually emphasise this node (e.g. the AI agent). */
  highlight?: boolean
}

export interface Architecture {
  /** Short flow label shown top-right, e.g. 'request → agent → Gmail'. */
  caption: string
  /** Main left-to-right flow (up to 4 nodes). */
  nodes: ArchitectureNode[]
  /** Optional node hanging below one of the main nodes (by index). */
  branch?: { under: number; node: ArchitectureNode }
  /** Footnote under the diagram. 'warning' suits safety mechanisms, 'accent' general design notes. */
  note: { title: string; text: string; tone?: 'warning' | 'accent' }
}

export interface Project {
  id: string
  name: string
  tagline: string
  category: string
  description: string
  stack: string[]
  features: string[]
  links: { github: string; demo: string }
  /** A real screenshot of the app, shown on the card and in the details view. */
  screenshot: Screenshot
  architecture?: Architecture
  featured?: boolean
  /** Three headline features shown with icons on the project card. */
  highlights?: { icon: Icon; title: string; text: string }[]
  /** Small floating label over the project visual. */
  badge?: { icon: Icon; label: string }
}

export interface Capability {
  title: string
  description: string
  icon: Icon
  tags: string[]
}

/** A smaller project shown as a compact card, without screenshots or a details view. */
export interface MiniProject {
  id: string
  name: string
  description: string
  stack: string[]
  links: { github: string; demo?: string }
}
