import { today } from '@/data'

export function Footer() {
  return (
    <div className="flex mx-auto justify-center p-4 print:hidden">
      ©
      {today.getFullYear()}
      {' '}
      Joydip Roy ❤️
    </div>
  )
}
Footer.displayName = 'Footer'
