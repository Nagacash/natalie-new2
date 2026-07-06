'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import ImageLightbox from '@/app/components/Common/ImageLightbox'
import { bebasNeue } from '@/app/fonts'

const AMAZON_BOOK_URL =
  'https://www.amazon.de/-/en/Mens-Health-Womens-Erfolgsgeheimnisse-Box-Weltmeisterin/dp/3613509911'

const BookPromo = () => {
  const t = useTranslations('about')
  const shouldReduceMotion = useReducedMotion()

  const highlights = Object.values(
    t.raw('bookPromo.highlights') as Record<string, string>
  )

  return (
    <motion.aside
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby='book-promo-heading'
      className='relative'
    >
      <div className='book-promo relative overflow-hidden rounded-3xl bg-grain shadow-[var(--shadow-card-lift)] ring-1 ring-black/5'>
        <div
          className='absolute inset-0 bg-gradient-to-br from-deep-slate via-[#1a5f7a] to-accent-cyan-dark'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-cyan/25 blur-3xl'
          aria-hidden
        />
        <div
          className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl'
          aria-hidden
        />

        <div className='relative z-10 grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:gap-10 md:p-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12 lg:p-12'>
          <div className='order-1 flex flex-col items-center lg:order-none lg:items-start'>
            <ImageLightbox
              src='/images/new/book1.webp'
              alt={t('bookPromo.coverAria')}
              caption={t('bookPromo.title')}
              fill
              priority
              className='relative aspect-[9/16] w-[min(52vw,12.5rem)] overflow-hidden rounded-2xl shadow-[0_28px_60px_-18px_rgba(0,0,0,0.55)] ring-1 ring-white/30 transition-shadow duration-300 hover:shadow-[0_32px_70px_-16px_rgba(0,0,0,0.6)] focus-visible:shadow-[0_32px_70px_-16px_rgba(0,0,0,0.6)] sm:w-48 md:w-52 lg:w-56'
              imageClassName='object-cover transition duration-500 group-hover:scale-[1.03]'
              sizes='(max-width: 640px) 52vw, (max-width: 1024px) 192px, 224px'
            >
              <div
                className='pointer-events-none absolute inset-y-3 left-0 w-[3px] rounded-full bg-white/25'
                aria-hidden
              />
            </ImageLightbox>
            <div
              className='mx-auto mt-4 h-2 w-[70%] rounded-full bg-black/25 blur-md'
              aria-hidden
            />
          </div>

          <div className='order-2 text-center lg:order-none lg:text-left'>
            <div className='mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start'>
              <span className='inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-400' aria-hidden />
                {t('bookPromo.badgeNew')}
              </span>
              <span className='inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/15 px-3 py-1 text-xs font-semibold text-white/90'>
                <Icon icon='mdi:trophy' className='text-sm text-amber-300' aria-hidden />
                {t('bookPromo.badgeChampion')}
              </span>
            </div>

            <p className='mb-2 text-sm font-semibold uppercase tracking-widest text-accent-cyan-light/90'>
              {t('bookPromo.eyebrow')}
            </p>

            <h3
              id='book-promo-heading'
              className={`mb-3 text-3xl font-bold leading-[1.05] text-white sm:text-4xl lg:text-[2.75rem] ${bebasNeue.className} text-balance`}
            >
              {t('bookPromo.title')}
            </h3>

            <p className='mb-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg lg:mx-0 lg:max-w-none'>
              {t('bookPromo.description')}
            </p>

            <ul className='mb-8 space-y-3 text-left'>
              {highlights.map((item) => (
                <li key={item} className='flex items-start gap-3 text-sm text-white/90 md:text-base'>
                  <Icon
                    icon='mdi:check-circle'
                    className='mt-0.5 flex-shrink-0 text-lg text-accent-cyan-light'
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:items-start lg:justify-start'>
              <a
                href={AMAZON_BOOK_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-solid-light inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 px-8 py-3.5 text-base font-bold sm:w-auto md:text-lg'
              >
                <Icon icon='simple-icons:amazon' className='text-2xl' aria-hidden />
                {t('bookPromo.cta')}
                <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
              </a>
              <p className='text-xs text-white/65 sm:max-w-[11rem] sm:text-left'>
                {t('bookPromo.footnote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

export default BookPromo
