import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meat Choice Digital Companion',
    short_name: 'Meat Choice',
    description: 'Budget smarter. Avoid till-shock.',
    start_url: '/',
    display: 'standalone',
    background_color: '#18181B',
    theme_color: '#E11D48',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
