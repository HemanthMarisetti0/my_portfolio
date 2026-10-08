export type CertificationKind = 'Certification' | 'Course' | 'Internship'

export interface Certification {
  title: string
  issuer: string
  kind: CertificationKind
  /** Optional detail line, e.g. dates. */
  note?: string
  /** Thumbnail in public/, shown on the card (a static image keeps the page fast and stable). */
  image?: string
  /** Embeddable page, opened in an iframe when the card is clicked. Omit if the site blocks embedding. */
  embedUrl?: string
  /** Original certificate page, opened in a new tab. */
  link: string
}

function hackerRank(title: string, id: string, slug: string): Certification {
  return {
    title,
    issuer: 'HackerRank',
    kind: 'Certification',
    image: `/certificates/${slug}.webp`,
    embedUrl: `https://www.hackerrank.com/certificates/iframe/${id}`,
    link: `https://www.hackerrank.com/certificates/${id}`,
  }
}

/** Google Drive file (must be shared as "Anyone with the link"). */
function driveFile(id: string) {
  return {
    embedUrl: `https://drive.google.com/file/d/${id}/preview`,
    link: `https://drive.google.com/file/d/${id}/view`,
  }
}

export const certifications: Certification[] = [
  {
    title: 'Fundamentals of Agents',
    issuer: 'Hugging Face',
    kind: 'Course',
    note: 'Hugging Face Agents Course',
    image: '/certificates/hugging-face-agents.webp',
    ...driveFile('1iSHNZRFJOs30A2ey_6HsAp9kjby2f_GY'),
  },
  hackerRank('React (Basic)', 'c69ea571ea0f', 'react-basic'),
  hackerRank('Node.js (Intermediate)', '5b2d10d1f335', 'nodejs-intermediate'),
  hackerRank('SQL (Intermediate)', '21b10ee6606a', 'sql-intermediate'),
  hackerRank('SQL (Basic)', 'c4877090d97d', 'sql-basic'),
  hackerRank('CSS (Basic)', '73c39f33e8bd', 'css-basic'),
  hackerRank('Problem Solving (Basic)', '86f9e412432a', 'problem-solving-basic'),
  {
    title: 'Salesforce Developer Virtual Internship',
    issuer: 'SmartInternz',
    kind: 'Internship',
    note: 'Apr 2023 – May 2023',
    image: '/certificates/salesforce-developer-internship.webp',
    // SmartInternz blocks embedding, so this one opens in a new tab.
    link: 'https://smartinternz.com/internships/salesforce_certificates/71b6753f70fff74032b3897815e8f9fc',
  },
  {
    title: 'Web Development Internship',
    issuer: 'Teachnook × Weboin',
    kind: 'Internship',
    note: 'Jun 2023 – Jul 2023',
    image: '/certificates/web-development-internship.webp',
    ...driveFile('1dV_B9E4t0oQRNabE2o6tleUJQaElxmv5'),
  },
]
