'use client'

import { Link } from '@/i18n/routing'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'
import BookPromo from '@/app/components/Home/BookPromo'

const PILLAR_HREFS = ['/#Flow', '/#Form', '/#Recovery'] as const
const PILLAR_ICONS = ['mdi:boxing-glove', 'mdi:dumbbell', 'mdi:spa-outline'] as const

const linkClassName =
  'font-semibold text-accent-cyan transition-colors duration-200 hover:text-accent-cyan-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2'

const Aboutus = () => {
  const t = useTranslations('about')

  const pillars = Object.values(
    t.raw('pillars') as Record<string, { label: string }>
  ).map((pillar, i) => ({
    ...pillar,
    href: PILLAR_HREFS[i],
    icon: PILLAR_ICONS[i],
  }))

  return (
    <section
      id='About'
      className='relative -mt-px overflow-hidden bg-gradient-to-b from-accent-cyan-light/25 via-light to-light pt-20 pb-16 md:-mt-1 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24'
    >
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(ellipse_100%_90%_at_50%_0%,rgba(55,190,240,0.1),transparent_72%)] md:h-44'
        aria-hidden
      />
      <div className='container relative z-1 mx-auto max-w-7xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-12 text-center md:mb-16'
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`mb-6 text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl ${bebasNeue.className} text-balance`}
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`mb-2 text-2xl font-bold tracking-wide text-accent-cyan md:text-3xl ${bebasNeue.className}`}
          >
            {t('tagline')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-6 text-lg font-semibold text-text-primary md:text-xl'
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className='copy-prose mx-auto max-w-3xl space-y-5 text-left text-base leading-relaxed text-text-secondary md:text-lg'
          >
            <p>{t('paragraphs.0')}</p>
            <p>
              {t.rich('paragraphs.1', {
                flow: (chunks) => (
                  <Link href='/#Flow' className={linkClassName}>
                    {chunks}
                  </Link>
                ),
                form: (chunks) => (
                  <Link href='/#Form' className={linkClassName}>
                    {chunks}
                  </Link>
                ),
                recovery: (chunks) => (
                  <Link href='/#Recovery' className={linkClassName}>
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <p>{t('paragraphs.2')}</p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className='mt-10 flex flex-wrap justify-center gap-3'
          >
            {pillars.map((pillar) => (
              <li key={pillar.label}>
                <Link
                  href={pillar.href}
                  className='btn-chip btn-chip-idle inline-flex items-center gap-2 font-semibold normal-case tracking-normal'
                >
                  <Icon icon={pillar.icon} className='text-lg text-accent-cyan' aria-hidden />
                  {pillar.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className='mb-12 md:mb-16'>
          <BookPromo />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='text-center'
        >
          <div className='rounded-3xl bg-grey p-8 md:p-10'>
            <h3
              className={`mb-4 text-2xl font-bold text-text-primary md:text-3xl ${bebasNeue.className}`}
            >
              {t('ctaTitle')}
            </h3>
            <p className='mx-auto mb-6 max-w-2xl text-lg text-text-secondary'>
              {t('ctaDescription')}
            </p>
            <div className='flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap'>
              <Link href='/kontakt' className='btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2'>
                {t('ctaPrimary')}
                <Icon icon='mdi:arrow-right' className='text-xl' />
              </Link>
              <Link href='/#Flow' className='btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2'>
                {t('ctaSecondary')}
                <Icon icon='mdi:arrow-down' className='text-xl' />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Aboutus
