import type { SVGProps } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IonicProps extends SVGProps<SVGSVGElement> {
  className?: string
}

function Ionic({ className }: IonicProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Ionic"
      x="0px"
      y="0px"
      width="512"
      height="512"
      className={twMerge('h-20 w-20', className)}
    >
      <g fill="#4e8ef7">
        <circle cx="64" cy="64" r="24.08"></circle>
        <path d="M113.14 23.14a8.27 8.27 0 00-13.7-6.25 59 59 0 1011.67 11.67 8.24 8.24 0 002.03-5.42zM64 121A57 57 0 1198.1 18.36a8.27 8.27 0 0011.53 11.53A57 57 0 0164 121z"></path>
      </g>
    </svg>
  )
}

export { Ionic }
