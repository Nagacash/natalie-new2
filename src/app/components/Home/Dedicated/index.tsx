'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

const STRENGTH_ICONS = ['mdi:fire', 'mdi:chess-knight', 'mdi:shield-check'] as const
const GALLERY_IMAGES = [
  { src: '/images/dedicated/sa1.webp', key: '0' },
  { src: '/images/dedicated/sab2.webp', key: '1' },
  { src: '/images/dedicated/sab5.webp', key: '2' },
] as const

const Dedicated = () => {
  const t = useTranslations('dedicated')

  const strengths = Object.values(
    t.raw('strengths') as Record<string, { title: string; text: string }>
  ).map((strength, i) => ({
    ...strength,
    icon: STRENGTH_ICONS[i],
  }))

  const galleryAlts = t.raw('galleryAlts') as Record<string, string>

  return (
    <section className='relative overflow-hidden bg-light bg-cover bg-center py-16 md:py-20 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-12 text-center md:mb-16'
        >
          <p className='mb-4 text-sm font-bold uppercase tracking-widest text-accent-cyan md:text-base'>
            {t('eyebrow')}
          </p>
          <h2
            className={`text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl ${bebasNeue.className} text-balance`}
          >
            {t('title')}
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12'>
          <Image
            src='/images/dedicated/spiral.svg'
            height={272}
            width={686}
            alt=''
            aria-hidden
            className='absolute left-0 top-0 -z-10 hidden h-auto w-auto opacity-20 lg:block'
          />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='col-span-12 lg:col-span-6'
          >
            <div className='group relative overflow-hidden rounded-3xl shadow-2xl'>
              <Image
                src='/images/dedicated/sabine.webp'
                alt={t('mainImageAlt')}
                width={416}
                height={530}
                className='h-auto w-full object-cover transition-[filter] duration-300 group-hover:brightness-[1.03]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='col-span-12 flex flex-col justify-center lg:col-span-6'
          >
            <p className='copy-prose mb-8 text-base leading-relaxed text-text-secondary md:text-lg'>
              {t('description')}
            </p>

            <ul className='mb-8 space-y-5'>
              {strengths.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className='flex gap-4'
                >
                  <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan'>
                    <Icon icon={item.icon} className='text-2xl' aria-hidden />
                  </span>
                  <div>
                    <p className={`mb-1 text-lg font-bold text-text-primary ${bebasNeue.className}`}>
                      {item.title}
                    </p>
                    <p className='text-sm leading-relaxed text-text-secondary md:text-base'>
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className='mb-8 grid grid-cols-3 gap-3 md:gap-4'>
              {GALLERY_IMAGES.map((item, i) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className='group relative aspect-[4/5] overflow-hidden rounded-xl shadow-md ring-1 ring-border/50 transition-shadow duration-300 hover:shadow-lg'
                >
                  <Image
                    src={item.src}
                    alt={galleryAlts[item.key]}
                    fill
                    className='object-cover object-center transition-[filter] duration-300 group-hover:brightness-[1.03]'
                  />
                </motion.div>
              ))}
            </div>

            <div className='flex flex-col gap-4 sm:flex-row'>
              <Link href='/kontakt' className='btn-primary inline-flex min-h-12 items-center justify-center gap-2'>
                {t('ctaPrimary')}
                <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
              </Link>
              <Link
                href='/#UberMich'
                className='btn-secondary inline-flex min-h-12 items-center justify-center gap-2'
              >
                {t('ctaSecondary')}
                <Icon icon='mdi:account-outline' className='text-xl' aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Dedicated
