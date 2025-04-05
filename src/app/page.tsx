import type { Metadata } from 'next'
import Container from '@/components/container'
import Declaration from '@/components/declaration'
import { DownloadResume } from '@/components/downloadResume'
import { ErrorBoundary } from '@/components/errorBoundary'
import Footer from '@/components/footer'
import About from '@/components/modules/about'
import Domains from '@/components/modules/domains'
import Educations from '@/components/modules/educations'
import Languages from '@/components/modules/languages'
import Projects from '@/components/modules/projects'
import Skills from '@/components/modules/skills'
import Strengths from '@/components/modules/strengths'
import Works from '@/components/modules/works'
import { ToggleTheme } from '@/components/toggleTheme'
import { Toaster } from '@/components/ui/toaster'
import { meta } from '@/data/index'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

export default async function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <ErrorBoundary>
        <Container>
          <About />
          <Works />
          <Educations />
          <Skills />
          <Strengths />
          <Domains />
          <Projects />
          <Languages />
          <Declaration />
        </Container>
        <Footer />
        <ToggleTheme />
        <DownloadResume />
        <Toaster />
      </ErrorBoundary>
    </main>
  )
}
