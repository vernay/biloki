import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Biloki - Gestion de séjours sans effort',
    short_name: 'Biloki',
    description: 'Biloki centralise, automatise et orchestre le cycle de vie des séjours pour conciergeries, propriétaires, prestataires et locataires.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#04a4ff',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
