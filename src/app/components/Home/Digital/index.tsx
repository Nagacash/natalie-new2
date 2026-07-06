'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

const Digital = () => {
  const t = useTranslations('digital')
  const titlePrefix = t('title').replace(t('titleHighlight'), '').trim()

  return (
    <section className='relative overflow-hidden bg-grey py-16 md:py-20 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep-slate via-[#1a5f7a] to-accent-cyan-dark shadow-[var(--shadow-card-lift)] ring-1 ring-black/5'>
          <div className='pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-cyan/20 blur-3xl' aria-hidden />

          <div className='relative z-10 grid grid-cols-1 items-center gap-8 p-6 sm:p-8 md:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12'>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center lg:text-left'
            >
              <p className='mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-cyan-light md:text-base lg:justify-start'>
                <Icon icon='mdi:dumbbell' className='text-xl' aria-hidden />
                {t('eyebrow')}
              </p>

              <h2
                className={`mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl ${bebasNeue.className} text-balance`}
              >
                {titlePrefix}{' '}
                <span className='text-accent-cyan-light'>{t('titleHighlight')}</span>
              </h2>

              <p className='mb-8 max-w-xl text-base leading-relaxed text-white/85 md:text-lg lg:mx-0 mx-auto'>
                {t('description')}
              </p>

              <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
                <Link href='/kontakt' className='btn-accent inline-flex min-h-12 items-center justify-center gap-2'>
                  {t('ctaPrimary')}
                  <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
                </Link>
                <Link
                  href='/#Team'
                  className='btn-outline-light inline-flex min-h-12 items-center justify-center gap-2'
                >
                  {t('ctaSecondary')}
                  <Icon icon='mdi:account-group' className='text-xl' aria-hidden />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='relative mx-auto w-full max-w-md lg:max-w-none'
            >
              <div className='relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)] ring-1 ring-white/20 sm:aspect-[5/4] lg:aspect-[4/5]'>
                <Image
                  src='/images/new/natalie.jpg'
                  alt={t('imageAlt')}
                  fill
                  className='object-cover object-center'
                  sizes='(max-width: 1024px) 90vw, 480px'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Digital
