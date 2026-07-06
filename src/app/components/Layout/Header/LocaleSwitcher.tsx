'use client'

import { useEffect, useTransition } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter as useNextRouter } from 'next/navigation'
import {
  getPathname,
  usePathname,
  useRouter,
  type Locale,
} from '@/i18n/routing'

const locales: Locale[] = ['de', 'en']

function localeButtonClass(active: boolean, pending: boolean) {
  return `inline-flex h-9 min-w-[2.75rem] items-center justify-center rounded-sm px-3 text-center text-xs font-bold uppercase tracking-wide transition-colors duration-200 ${
    active
      ? 'bg-accent-cyan text-white shadow-sm'
      : pending
        ? 'cursor-wait text-text-muted'
        : 'cursor-pointer text-text-secondary hover:text-accent-cyan'
  }`
}

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const nextRouter = useNextRouter()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('nav')

  useEffect(() => {
    locales.forEach((loc) => {
      if (loc !== locale) {
        nextRouter.prefetch(getPathname({ href: pathname, locale: loc }))
      }
    })
  }, [locale, pathname, nextRouter])

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale || isPending) return
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div
      className='inline-flex items-center rounded-sm border border-border bg-white p-0.5 shadow-sm'
      role='group'
      aria-label='Language'
      aria-busy={isPending}
      data-locale-switcher
    >
      {locales.map((nextLocale) => {
        const active = locale === nextLocale
        const label = nextLocale === 'de' ? t('localeDe') : t('localeEn')

        return (
          <button
            key={nextLocale}
            type='button'
            onClick={() => handleSwitch(nextLocale)}
            disabled={active || isPending}
            className={localeButtonClass(active, isPending && !active)}
            aria-current={active ? 'true' : undefined}
            aria-label={label}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
