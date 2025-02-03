import type { Metadata } from 'next'
import { ErrorBoundary } from '@/components/_shared/error-boundary'
import Declaration from '@/components/declaration'
import Footer from '@/components/footer'
import { metadata as meta } from '@/data'
import { getQueryClient } from '@/lib/qclient'
import About from '@/pages/about'
import Educations from '@/pages/educations'
import Languages from '@/pages/languages'
import Projects from '@/pages/projects'
import Skills from '@/pages/skills'
import Strengths from '@/pages/strengths'
import Works from '@/pages/works'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export const metadata: Metadata = {
  title: `${meta.name}`,
  description: meta.description,
}

export default async function Page() {
  const queryClient = await getQueryClient()

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <HydrationBoundary state={dehydrate(queryClient)}>
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
        </ErrorBoundary>
        <Footer />
      </HydrationBoundary>
    </main>
  )
}
