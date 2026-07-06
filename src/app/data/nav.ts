import { HeaderItem } from '@/app/types/menu'

export const headerNavLinks: HeaderItem[] = [
  { label: 'Home', href: '/#Hero' },
  { label: 'Philosophie', href: '/#About' },
  { label: 'Über mich', href: '/#UberMich' },
  { label: 'Team', href: '/#Team' },
  { label: 'FAQ', href: '/#FAQ' },
  { label: 'Featured', href: '/#Featured' },
  { label: 'Presse', href: '/#Presse' },
  { label: 'Kontakt', href: '/kontakt' },
]

export const mobileNavLinks: HeaderItem[] = [
  ...headerNavLinks,
  { label: 'Blog', href: '/#Blog' },
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
]

export function getNavHashTarget(href: string): string | null {
  if (href.startsWith('#')) return href.slice(1)
  const hashIndex = href.indexOf('#')
  if (hashIndex !== -1) return href.slice(hashIndex + 1)
  return null
}
