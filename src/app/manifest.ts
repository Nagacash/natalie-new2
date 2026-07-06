import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Natalie Zimmermann – Box-Weltmeisterin, Speakerin & Mental Coach Hamburg',
    short_name: 'Natalie Zimmermann',
    description:
      'Natalie Zimmermann – Profibox-Weltmeisterin, Speakerin, Mental Coach, Physiotherapeutin und Personal Trainerin in Hamburg-Harvestehude. Body & Mind Studio Rothenbaumchaussee 156.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#37BEF0',
    lang: 'de-DE',
    dir: 'ltr',
    categories: ['health', 'fitness', 'sports', 'lifestyle', 'coaching'],
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
