import { MetadataRoute } from 'next'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: 'SCO SMB - Enterprise Scanning Solution',
    short_name: 'SCO SMB',
    description: 'Professional document scanning for Kyocera & Sharp printers with automatic organization, security, and enterprise features.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#153B6B',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logos/sco-smb-icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/logos/sco-smb-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en-US',
    dir: 'ltr',
    scope: '/',
    prefer_related_applications: false,
    screenshots: [
      {
        src: '/screenshots/sco-smb-hero-dashboard.png',
        sizes: '1200x800',
        type: 'image/png',
        label: 'SCO SMB Main Dashboard'
      },
      {
        src: '/screenshots/sco-smb-security-settings.png',
        sizes: '1200x800',
        type: 'image/png',  
        label: 'Security Settings Panel'
      }
    ]
  }
}