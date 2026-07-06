'use client'

import { Link } from '@/i18n/routing'
import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'
import ImageLightbox from '@/app/components/Common/ImageLightbox'

const PROMO_IMAGE = '/images/new/sommer-special-2026.webp'

const SummerSpecial = () => {
  const t = useTranslations('summerSpecial')
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id='SommerSpecial'
      aria-labelledby='summer-special-heading'
      className='relative z-20 overflow-hidden border-y border-accent-cyan/20 bg-gradient-to-b from-accent-cyan-light/50 via-white to-accent-cyan-light/30 py-8 md:py-12'
    >
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_80%_100%_at_50%_0%,rgba(55,190,240,0.14),transparent)]'
        aria-hidden
      />

      <div className='container relative mx-auto max-w-7xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className='mx-auto flex max-w-3xl flex-col items-center text-center'
        >
          <p className='mb-2 text-sm font-bold uppercase tracking-widest text-accent-cyan'>
            {t('eyebrow')}
          </p>
          <h2
            id='summer-special-heading'
            className={`mb-2 text-3xl font-bold text-text-primary md:text-4xl ${bebasNeue.className}`}
          >
            {t('title')}
          </h2>
          <p className='mb-1 max-w-xl text-base text-text-secondary md:text-lg'>{t('description')}</p>
          <p className='mb-6 text-sm font-semibold text-accent-cyan-dark'>{t('validUntil')}</p>

          <ImageLightbox
            src={PROMO_IMAGE}
            alt={t('imageAlt')}
            width={900}
            height={1600}
            caption={`${t('title')} · ${t('validUntil')}`}
            className='w-full max-w-[min(100%,24rem)] overflow-hidden rounded-sm shadow-[var(--shadow-card-lift)] ring-1 ring-black/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg'
            imageClassName='h-auto w-full'
            sizes='(max-width: 640px) min(100vw - 2rem, 24rem), (max-width: 1024px) 28rem, 32rem'
            footer={
              <div className='mt-5 flex justify-center'>
                <Link
                  href='/kontakt'
                  className='btn-accent inline-flex min-h-12 items-center justify-center gap-2 px-8'
                >
                  {t('cta')}
                  <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
                </Link>
              </div>
            }
          />

          <Link
            href='/kontakt'
            className='btn-accent mt-6 inline-flex min-h-12 items-center justify-center gap-2 px-8'
          >
            {t('cta')}
            <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SummerSpecial
