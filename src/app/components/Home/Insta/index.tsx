'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const INSTA_IMAGES = [
  '/images/insta/insta1.webp',
  '/images/insta/insta2.webp',
  '/images/insta/insta3.webp',
  '/images/insta/insta4.webp',
] as const

const Insta = () => {
  const t = useTranslations('insta')

  const imageAlts = Object.values(t.raw('imageAlts') as Record<string, string>)

  return (
    <section className='container mx-auto max-w-2xl pt-16 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:-mb-44 lg:-mb-34'>
      <div className='grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {INSTA_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
            className='relative group mx-auto overflow-hidden rounded-3xl'
          >
            <Image
              src={src}
              priority={i === 0 || i === 3}
              width={306}
              height={306}
              alt={imageAlts[i]}
              className='w-full h-full object-cover'
            />

            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <div className='absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-3xl flex items-center justify-center'>
                <Image
                  src='/images/insta/instagram.svg'
                  alt={t('instagramAlt')}
                  width={36}
                  height={36}
                  className='cursor-pointer'
                />
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Insta
