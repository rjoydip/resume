import { twMerge } from 'tailwind-merge'

interface VercelProps {
  className?: string
}

function Vercel({ className }: VercelProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Vercel"
      x="0px"
      y="0px"
      width="512"
      height="512"
      className={twMerge('h-20 w-20', className)}
    >
      <path d="M64.002 8.576 128 119.424H0Zm0 0"></path>
    </svg>
  )
}

export { Vercel }
