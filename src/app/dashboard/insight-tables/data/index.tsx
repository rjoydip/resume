import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'data',
    label: 'Data',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'draft',
    label: 'Draft',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'published',
    label: 'Published',
    icon: CheckCircledIcon,
  },
  {
    value: 'deleted',
    label: 'Deleted',
    icon: CrossCircledIcon,
  },
]
