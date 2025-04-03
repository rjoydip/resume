import type { TechStackType } from '@/types'
import React from 'react'
import titleize from 'titleize'
import { Badge } from '../ui/badge'

export const TechnologyList = React.memo(({ techStacks }: { techStacks: TechStackType }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {techStacks.map((tech: string) => (
        <Badge
          key={tech}
          variant="outline"
          aria-label={`Show ${titleize(tech)}`}
          className="text-xs"
        >
          {titleize(tech)}
        </Badge>
      ))}
    </div>
  )
})
TechnologyList.displayName = 'TechnologyList'
