import Link from 'next/link'

import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link href="/dashboard" className="rounded-[6px]">
        Dashboard
      </Link>
      <Link
        href="/dashboard/forms"
        className="rounded-[6px]"
      >
        Forms
      </Link>
      <Link
        href="/dashboard/insight-tables"
        className="rounded-[6px]"
      >
        Insight Tables
      </Link>
    </nav>
  )
}
