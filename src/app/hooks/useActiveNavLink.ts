'use client'

import { useEffect, useState } from 'react'
import { usePathname } from '@/i18n/routing'
import { getNavHashTarget } from '@/app/data/nav'

const DEFAULT_HOME_SECTION = 'Hero'

function readSectionFromUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_HOME_SECTION
  return window.location.hash.replace('#', '') || DEFAULT_HOME_SECTION
}

/** Active state for header links: Home on fresh `/`, section links when hash matches. */
export function useActiveNavLink(href: string): boolean {
  const pathname = usePathname()
  const hashTarget = getNavHashTarget(href)
  const [section, setSection] = useState(DEFAULT_HOME_SECTION)

  useEffect(() => {
    const sync = () => setSection(readSectionFromUrl())
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  if (hashTarget !== null) {
    return pathname === '/' && section === hashTarget
  }

  return pathname === href
}
