import type { Metadata } from 'next'
import { ErrorBoundary } from '@/components/_shared/error-boundary'
import Declaration from '@/components/declaration'
import Footer from '@/components/footer'
import About from '@/components/pages/about'
import Educations from '@/components/pages/educations'
import Languages from '@/components/pages/languages'
import Projects from '@/components/pages/projects'
import Skills from '@/components/pages/skills'
import Strengths from '@/components/pages/strengths'
import Works from '@/components/pages/works'
import { metadata as meta } from '@/data'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

export default async function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <ErrorBoundary>
        <div className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
          <About />
          <Works />
          <Educations />
          <Skills />
          <Strengths />
          <Projects />
          <Languages />
          <Declaration />
        </div>
        <Footer />
      </ErrorBoundary>
    </main>
  )
}
