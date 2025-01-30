import React from 'react'
import titleize from 'titleize'
import { Badge } from '../ui/badge'

export const TechnologyList = React.memo(({ techStacks }: { techStacks: string[] }) => {
  return techStacks.map((techStack: string) => <Badge key={techStack} variant="secondary" className="mx-0.5 my-0.5 align-middle text-[12px]">{titleize(techStack)}</Badge>)
})
TechnologyList.displayName = 'TechnologyList'
