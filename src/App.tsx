import { MotionConfig } from 'framer-motion'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { About } from '@/sections/About'
import { Certifications } from '@/sections/Certifications'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

export default function App() {
  return (
    // reducedMotion="user" turns transform animations off for visitors who ask for reduced motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
