'use client'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div id="container" className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
      {children}
    </div>
  )
}
Container.displayName = 'Container'
