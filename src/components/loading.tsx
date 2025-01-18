import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'

export default function Loading({
  className,
}: {
  className?: string
}) {
  return <Skeleton data-testid="loading-skeleton" className={cn(className, 'h-12 w-12 rounded-full')} />
}
