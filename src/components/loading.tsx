import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export default function Loading({
  className,
}: {
  className?: string
}) {
  return <Skeleton data-testid="loading-skeleton" className={cn(className, 'h-12 w-12 rounded-full')} />
}
