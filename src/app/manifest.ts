import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'rjoydip',
    short_name: 'rjoydip',
    description: 'Joydip Roy',
    start_url: '/',
    display: 'standalone',
    display_override: ['fullscreen', 'standalone', 'browser'],
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'any',
    categories: ['Resume', 'Curriculum Vitae', 'Profile', 'Portfolio'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icons/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/icons/icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        src: '/icons/icon-114x114.png',
        sizes: '114x114',
        type: 'image/png',
      },
      {
        src: '/icons/icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/icons/icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
