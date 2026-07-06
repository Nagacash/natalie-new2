'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import type { Locale } from '@/i18n/routing'

const locales: Locale[] = ['de', 'en']

function localeButtonClass(active: boolean) {
  return `inline-flex h-9 min-w-[2.75rem] items-center justify-center rounded-sm px-3 text-center text-xs font-bold uppercase tracking-wide transition-colors duration-200 cursor-pointer ${
    active
      ? 'bg-accent-cyan text-white shadow-sm'
      : 'text-text-secondary hover:text-accent-cyan'
  }`
}

export default function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <div
      className='inline-flex items-center rounded-sm border border-border/80 bg-white/80 p-0.5 shadow-sm backdrop-blur-sm'
      role='group'
      aria-label='Language'
      data-locale-switcher
    >
      {locales.map((nextLocale) => {
        const active = locale === nextLocale
        const label = nextLocale === 'de' ? t('localeDe') : t('localeEn')

        if (active) {
          return (
            <span
              key={nextLocale}
              className={localeButtonClass(true)}
              aria-current='true'
            >
              {label}
            </span>
          )
        }

        return (
          <Link
            key={nextLocale}
            href={pathname}
            locale={nextLocale}
            replace
            scroll={false}
            prefetch
            className={localeButtonClass(false)}
            aria-label={label}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
