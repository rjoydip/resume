import RootLayout from '@/components/root-layout'

function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}

export default Layout
