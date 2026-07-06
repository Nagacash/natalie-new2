'use client'

import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

const Join = () => {
  const t = useTranslations('join')

  return (
    <section id='Studio' className='overflow-hidden bg-light py-16 md:py-20 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-3xl text-center'
        >
          <p className='mb-4 text-sm font-bold uppercase tracking-widest text-accent-cyan md:text-base'>
            {t('eyebrow')}
          </p>
          <h2 className={`mb-6 text-4xl font-bold text-text-primary md:text-5xl ${bebasNeue.className} text-balance`}>
            {t('title')}
          </h2>
          <p className='copy-prose mx-auto mb-8 text-base leading-relaxed text-text-secondary md:text-lg'>
            {t('description')}
          </p>

          <div className='rounded-3xl border border-border bg-grey p-8 md:p-10'>
            <p className='mb-6 text-lg text-text-secondary'>
              {t('ctaPrompt')}
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Link href='/kontakt' className='btn-primary inline-flex min-h-12 items-center justify-center gap-2'>
                {t('ctaPrimary')}
                <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
              </Link>
              <a
                href='tel:+494053790578'
                className='btn-secondary inline-flex min-h-12 items-center justify-center gap-2'
              >
                <Icon icon='mdi:phone' className='text-xl' aria-hidden />
                040 / 53790578
              </a>
            </div>
            <p className='mt-6 text-sm text-text-muted'>
              {t('address')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Join
