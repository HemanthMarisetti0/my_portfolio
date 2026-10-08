import {
  Bot,
  Database,
  FileText,
  FolderSearch,
  Gauge,
  History,
  Home,
  KeyRound,
  Layers,
  ListChecks,
  Mail,
  MonitorSmartphone,
  Quote,
  Server,
  ShieldCheck,
} from 'lucide-react'
import type { MiniProject, Project } from './types'

/** Replace the bracketed link placeholders with your repository and deployment URLs. */
export const projects: Project[] = [
  {
    id: 'mailpilot',
    name: 'MailPilot',
    tagline: 'AI Email Assistant',
    category: 'AI · Full-stack',
    description:
      'An AI assistant for Gmail. Sign in with Google, browse your inbox, and ask a Gemini-powered agent to search, read, summarise, organise or reply to your email in plain language. Anything that changes your mailbox or sends mail waits for your approval first.',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'NestJS',
      'Node.js',
      'Gemini',
      'Gmail API',
      'PostgreSQL (Neon)',
      'Prisma',
      'Google OAuth 2.0',
      'JWT',
      'Swagger',
      'Jest',
      'pnpm workspaces',
    ],
    features: [
      'Google sign-in with OAuth; Google tokens encrypted at rest',
      'Inbox: list, search, read and act on emails and threads',
      'Read / unread, star, archive, trash, restore, important and labels',
      'Compose and send new mail',
      'Chat assistant that answers questions about your inbox',
      'Reads and summarises messages, then proposes actions',
      'Approval card before any send, reply or mailbox change',
      'Bulk actions on every email matching a Gmail query, with a count and preview',
      'Email analysis: summary, category, priority, sentiment, action items, deadlines',
      'Rate-limit aware: per-user Gmail throttling and Gemini model fallback',
      'Light and dark themes',
    ],
    links: { github: 'https://github.com/HemanthMarisetti0/email_agent_backend', demo: 'https://email-agent-hk.vercel.app/' },
    screenshot: {
      src: '/projects/mailpilot.webp',
      alt: 'MailPilot assistant screen: a chat prompt with suggested requests such as summarising unread emails and deleting old promotions',
      width: 1917,
      height: 910,
      url: 'email-agent-hk.vercel.app',
      focus: '72% 45%',
    },
    architecture: {
      caption: 'request → agent → Gmail',
      nodes: [
        { title: 'React client', detail: 'Inbox · assistant · approval cards', tech: 'React 19 · Vite', icon: MonitorSmartphone },
        { title: 'NestJS API', detail: 'Google OAuth · session JWT · Swagger', tech: 'NestJS · TypeScript', icon: Server },
        { title: 'Gemini agent', detail: 'Tool-calling loop · model fallback', tech: '@google/genai', icon: Bot, highlight: true },
        { title: 'Gmail API', detail: 'Search · read · modify · send', tech: 'googleapis', icon: Mail },
      ],
      branch: {
        under: 1,
        node: { title: 'PostgreSQL', detail: 'Users, encrypted tokens, pending approvals', tech: 'Neon · Prisma 7', icon: Database },
      },
      note: {
        title: 'Human in the loop.',
        text: 'Sends, replies and every mailbox change are saved as a pending approval. The client shows exactly what will happen (recipients and body, or a match count with a 5-email preview), and nothing reaches Gmail until you approve it.',
        tone: 'warning',
      },
    },
    featured: true,
  },
  {
    id: 'bill-tracker',
    name: 'Household Bill Tracker',
    tagline: 'Bills, income, investments and savings in one place',
    category: 'Practical · Real-world',
    description:
      "A web app for tracking household bills, salary, investments and savings. Sign in with Google, log bills by type, record your income, and see what's paid, what's still due and how much is left each month.",
    stack: ['React', 'TypeScript', 'Vite', 'Firebase Auth', 'Cloud Firestore', 'Firestore security rules', 'pnpm', 'ESLint'],
    features: [
      'Monthly overview: income, spent on bills, invested, saved and left',
      'This month vs last month bill comparison',
      'Spending by type with monthly budgets that warn at 80%',
      '40+ built-in bill types in five groups, plus your own custom types',
      'Meter-based water, electricity and gas bills from readings and rate',
      'Recurring bills copied automatically each month',
      'Paid / unpaid status, due dates, overdue flags and payment methods',
      'Search, filter and CSV export',
      'Separate Investments (SIP), Savings and Income tabs',
      'Google sign-in, per-user data protected by Firestore rules',
      'Light and dark mode; mobile-friendly tables and tabs',
    ],
    links: { github: 'https://github.com/HemanthMarisetti0/bill_tracker', demo: 'https://billtracker-eight.vercel.app/' },
    screenshot: {
      src: '/projects/bill-tracker.webp',
      alt: 'Bill Tracker overview: monthly income, bills, investments, savings and money left, with tabs for bills, investments, savings, income and types',
      width: 1917,
      height: 908,
      url: 'billtracker-eight.vercel.app',
      focus: '20% 60%',
    },
    architecture: {
      caption: 'client → Firebase, no custom backend',
      nodes: [
        { title: 'React client', detail: 'Six dashboard tabs · lazy-loaded pages', tech: 'React · TypeScript · Vite', icon: MonitorSmartphone },
        { title: 'Google sign-in', detail: 'Auth context for the whole app', tech: 'Firebase Authentication', icon: KeyRound },
        { title: 'Security rules', detail: 'Each user reads and writes only their own data', tech: 'firestore.rules', icon: ShieldCheck, highlight: true },
        { title: 'Cloud Firestore', detail: 'users/{uid}: bills · income · settings', tech: 'Cloud Firestore', icon: Database },
      ],
      branch: {
        under: 0,
        node: {
          title: 'Services layer',
          detail: 'Bill calculations · recurring bills · budgets · meters · income',
          tech: 'src/services',
          icon: Layers,
        },
      },
      note: {
        title: 'Serverless by design.',
        text: 'The app talks to Firebase directly, with no API server to run. Firestore security rules enforce per-user access, and the Login and Dashboard pages load on demand, so the login page never downloads the Firestore SDK.',
        tone: 'accent',
      },
    },
    highlights: [
      { icon: Gauge, title: 'Meter-based calculations', text: 'Consumption and amount worked out from previous and current readings and a rate.' },
      { icon: ListChecks, title: 'Budgets & status', text: 'Monthly budgets per type, overdue flags and paid / unpaid tracking at a glance.' },
      { icon: History, title: 'The whole month', text: 'Income, bills, investments and savings together, compared with last month.' },
    ],
    badge: { icon: Home, label: 'Built for everyday household use' },
  },
  {
    id: 'docmind',
    name: 'DocMind',
    tagline: 'Chat with your documents',
    category: 'AI · RAG',
    description:
      'Upload PDFs, Word files and text files, organise them into collections, and ask questions. A Gemini function-calling agent searches your own documents and answers with citations to the exact passages it used.',
    stack: [
      'React',
      'Vite',
      'TanStack Query',
      'Tailwind CSS',
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'pgvector',
      'Gemini',
      'Supabase',
      'JWT',
      'Google OAuth',
    ],
    features: [
      'Email / password sign-up and Sign in with Google (JWT sessions)',
      'Upload PDF, DOCX and TXT files',
      'Background processing: text extraction, chunking and embeddings',
      'Collections to group documents, e.g. "HR" or "Contracts"',
      'Scope a chat to all documents, one collection or one document',
      'Gemini function-calling agent that decides where to look',
      'Answers cite the exact document chunks they came from',
      'Semantic search with cosine similarity over an HNSW index',
      'Conversation history with threads and messages',
      'Dashboard with usage stats, profile settings and light / dark theme',
    ],
    links: { github: 'https://github.com/HemanthMarisetti0/doc_mind', demo: 'https://doc-mind-hk.vercel.app/login' },
    screenshot: {
      src: '/projects/docmind.webp',
      alt: 'DocMind chat screen asking "What would you like to know?", with scope options for all documents, a collection or a document, and suggested questions',
      width: 1917,
      height: 907,
      url: 'doc-mind-hk.vercel.app',
      focus: '68% 45%',
    },
    highlights: [
      { icon: Bot, title: 'Agent, not just retrieval', text: 'The agent picks its own tools: search_documents, search_collection or get_document.' },
      { icon: Quote, title: 'Cited answers', text: 'Every answer links back to the document chunks it was built from.' },
      { icon: FolderSearch, title: 'Scoped search', text: 'Ask across everything, or limit a chat to one collection or one document.' },
    ],
    badge: { icon: Quote, label: 'Answers with citations' },
    architecture: {
      caption: 'question → agent → vector search → cited answer',
      nodes: [
        { title: 'React client', detail: 'Chat · documents · collections', tech: 'React · Vite · TanStack Query', icon: MonitorSmartphone },
        { title: 'NestJS API', detail: 'JWT + Google OAuth · processing queue', tech: 'NestJS · Prisma', icon: Server },
        { title: 'Gemini agent', detail: 'Function calling over document tools', tech: 'Gemini · chat + embeddings', icon: Bot, highlight: true },
        { title: 'pgvector search', detail: 'Cosine similarity · HNSW index', tech: 'PostgreSQL on Supabase', icon: Database },
      ],
      branch: {
        under: 1,
        node: {
          title: 'Ingestion pipeline',
          detail: 'Supabase Storage → extract text (pdf-parse, mammoth) → chunk → embed',
          tech: '768-dim Gemini embeddings',
          icon: FileText,
        },
      },
      note: {
        title: 'Grounded in your documents.',
        text: 'Uploads are processed in the background into chunks and embeddings. When you ask a question, the agent decides where to look, retrieves the most similar chunks, and answers with citations to them.',
        tone: 'accent',
      },
    },
  },
]

/** Smaller projects, listed compactly below the main project cards. */
export const otherProjects: MiniProject[] = [
  {
    id: 'dictionary',
    name: 'Dictionary',
    description: 'Look up any word for phonetics, audio pronunciation, definitions with examples, synonyms and antonyms.',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Material UI'],
    links: { github: 'https://github.com/HemanthMarisetti0/Dictionary_react', demo: 'https://neon-banoffee-dc5688.netlify.app/' },
  },
  {
    id: 'wiki-connect',
    name: 'WikiConnect',
    description: 'Wikipedia search with debounced live results, snippets, and loading and error states.',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Material UI'],
    links: { github: 'https://github.com/HemanthMarisetti0/wiki_connect', demo: 'https://imaginative-gingersnap-7eff86.netlify.app/' },
  },
  {
    id: 'chat-app',
    name: 'ChatApp',
    description: 'A real-time chat app over WebSockets, with a React client and an Express server.',
    stack: ['React', 'TypeScript', 'Socket.IO', 'Express.js'],
    links: { github: 'https://github.com/HemanthMarisetti0/web_socket_chat_app' },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'This site: an animated single-page portfolio with light and dark themes, live GitHub activity and a contact form.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    links: { github: 'https://github.com/HemanthMarisetti0/my_portfolio' },
  },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]

/** Extra detail used by the featured MailPilot case study. */
export const mailPilotCaseStudy = {
  problem:
    'Managing an inbox means a lot of repetitive clicking: searching, opening, starring, archiving and replying one message at a time. Handing that to an AI is appealing, but an agent acting on real email must never delete or send something by surprise.',
  solution:
    'MailPilot runs a Gemini tool-calling loop over the Gmail API. Read tools run straight away; every send, reply or mailbox change becomes a pending approval that shows exactly what will happen (recipients and body, or a match count and preview) and runs only when the user approves it.',
  /** Agent tools, split by whether they need the user's approval. */
  tools: {
    read: ['search_emails', 'count_emails', 'read_email', 'read_thread', 'list_labels'],
    approval: ['modify_emails', 'send_email', 'reply_to_email'],
  },
  highlights: [
    {
      title: 'Security',
      points: [
        'Google tokens encrypted with AES-256-GCM',
        'Session token passed in the URL fragment, never in server logs',
        'Access token refreshed automatically before it expires',
      ],
    },
    {
      title: 'Reliability',
      points: [
        'Gmail calls limited to 4 at a time per user',
        'Falls back to the next Gemini model when a quota runs out',
        'Pending approvals expire after one hour',
      ],
    },
    {
      title: 'Engineering',
      points: [
        'pnpm workspace with backend and frontend apps',
        'Interactive API docs with Swagger',
        'Jest unit and e2e tests, ESLint and Prettier',
      ],
    },
  ],
}
