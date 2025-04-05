import type { TechStackType } from '@/types'
import React from 'react'
import { Badge } from '../ui/badge'

export const TechnologyList = React.memo(({ techStacks }: { techStacks: TechStackType }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {techStacks.map((tech: string) => (
        <Badge
          key={tech}
          variant="outline"
          aria-label={`Show ${tech}`}
          className="text-xs"
        >
          {tech}
        </Badge>
      ))}
    </div>
  )
})
TechnologyList.displayName = 'TechnologyList'
