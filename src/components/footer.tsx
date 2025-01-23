export function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="flex mx-auto justify-center p-4 print:hidden">
      ©
      {year}
      {' '}
      Joydip Roy ❤️
    </div>
  )
}
