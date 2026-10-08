export interface Education {
  degree: string
  field: string
  institution: string
  period: string
  /** Optional extra lines (grade, specialization, coursework). Leave empty to hide. */
  details: string[]
}

/** Add entries most recent first. */
export const education: Education[] = [
  {
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Electronics and Communication Engineering',
    institution: 'SASI Institute of Technology and Engineering, Tadepalligudem',
    period: '2020 – 2024',
    details: ['CGPA: 8.33'],
  },
]
