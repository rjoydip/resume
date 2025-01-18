import type { IconType } from '@/types'
import {
  BadgeCheck,
  CircleDot,
  Dot,
  Github,
  Globe,
  Linkedin,
  MailIcon,
  MapPin,
  PhoneIcon,
  Server,
  Smartphone,
  Twitter,
} from 'lucide-react'
import * as React from 'react'
import titleize from 'titleize'
import { Badge } from '../components/ui/badge'

interface IconProps {
  className?: string
  href?: string
  strokeWidth?: number
}

export function getIcon(icon: IconType = null, props: IconProps = {}) {
  switch (icon?.toLowerCase()) {
    case 'dot':
      return <Dot {...props} />
    case 'backend':
    case 'server':
      return <Server {...props} />
    case 'email':
    case 'mail':
      return <MailIcon {...props} />
    case 'mobile':
    case 'phone':
      return <PhoneIcon {...props} />
    case 'smartphone':
      return <Smartphone {...props} />
    case 'web':
      return <Globe {...props} />
    case 'map':
      return <MapPin {...props} />
    case 'circle-dot':
      return <CircleDot {...props} />
    case 'badge-check':
      return <BadgeCheck {...props} />
    case 'linkedin':
      return <Linkedin {...props} />
    case 'twitter':
    case 'x':
      return <Twitter {...props} />
    case 'github':
      return <Github {...props} />
    default:
      return (
        icon && (
          <Badge className="px-1 py-0 text-[10px]" variant="secondary">
            {titleize(icon.toString())}
          </Badge>
        )
      )
  }
}
