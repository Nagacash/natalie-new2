'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const MOMENT_IMAGES = [
  '/images/new/nature1.webp',
  '/images/new/nature2.webp',
  '/images/new/nature3.webp',
] as const

const NatureTriptych = () => {
  const t = useTranslations('about')

  const moments = Object.values(
    t.raw('natureTriptych.moments') as Record<
      string,
      { label: string; caption: string; alt: string }
    >
  ).map((moment, i) => ({
    ...moment,
    src: MOMENT_IMAGES[i],
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.22 }}
      className='mx-auto mb-10 max-w-4xl'
      aria-label={t('natureTriptych.ariaLabel')}
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5'>
        {moments.map((item, i) => (
          <figure
            key={item.label}
            className='group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-border/60 transition-shadow duration-300 hover:shadow-lg'
          >
            <div className='relative aspect-[3/4] overflow-hidden'>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className='object-cover object-center transition-[filter] duration-300 group-hover:brightness-[1.03]'
                sizes='(max-width: 640px) 100vw, 33vw'
                priority={i === 1}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent' />
              <figcaption className='absolute bottom-0 left-0 right-0 p-4 text-left'>
                <span className='mb-1 block text-xs font-bold uppercase tracking-widest text-accent-cyan-light'>
                  {item.label}
                </span>
                <span className='block text-sm font-medium text-white'>{item.caption}</span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </motion.div>
  )
}

export default NatureTriptych
