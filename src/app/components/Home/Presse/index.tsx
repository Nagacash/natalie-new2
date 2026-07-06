'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import VideoGallery from './VideoGallery'
import { bebasNeue } from '@/app/fonts'

const PRESS_IMAGES = [
  '/images/articles/nat1.webp',
  '/images/articles/nat2.webp',
  '/images/articles/nat3.webp',
] as const

const PRESS_LINKS = [
  'https://www.ndr.de/fernsehen/sendungen/hamburg_journal/Hamburgerin-Natalie-Zimmermann-boxt-um-WBO-WM-Titel,hamj157910.html',
  '#',
  '#',
] as const

const CATEGORY_STYLES = [
  { icon: 'mdi:television', color: 'bg-accent-cyan' },
  { icon: 'mdi:newspaper-variant', color: 'bg-accent-cyan-light' },
  { icon: 'mdi:radio', color: 'bg-accent-cyan' },
] as const

const Presse = () => {
  const t = useTranslations('presse')

  const categories = Object.values(
    t.raw('categories') as Record<string, { name: string }>
  ).map((category, i) => ({
    ...category,
    ...CATEGORY_STYLES[i],
  }))

  const articlesRaw = t.raw('articles') as Record<
    string,
    { title: string; source: string; date: string; category: string }
  >

  const pressArticles = Object.values(articlesRaw).map((article, i) => ({
    id: i + 1,
    ...article,
    image: PRESS_IMAGES[i],
    link: PRESS_LINKS[i],
  }))

  return (
    <section id='Presse' className='overflow-hidden scroll-mt-[100px] py-16 md:py-20 lg:py-24 bg-grey'>
      <div className='container mx-auto max-w-7xl px-4'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 md:mb-16'
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-accent-cyan text-sm md:text-base font-bold mb-4 uppercase tracking-wider'
          >
            {t('eyebrow')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 ${bebasNeue.className}`}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed'
          >
            {t('description')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex flex-wrap justify-center gap-4 mb-12'
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${category.color} flex items-center gap-2 rounded-xl px-6 py-3 text-white shadow-md shadow-black/10 ring-1 ring-inset ring-white/15`}
            >
              <Icon icon={category.icon} className='text-xl' />
              <span className='font-semibold'>{category.name}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='mb-16 md:mb-20'
        >
          <div className='flex items-center gap-4 mb-8'>
            <div className='flex-shrink-0 w-12 h-12 bg-accent-cyan rounded-xl flex items-center justify-center'>
              <Icon icon='mdi:television' className='text-white text-2xl' />
            </div>
            <h3 className={`text-3xl md:text-4xl font-bold text-text-primary ${bebasNeue.className}`}>
              {t('videosSectionTitle')}
            </h3>
          </div>

          <VideoGallery />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='text-center text-text-secondary mt-6 text-sm md:text-base flex items-center justify-center gap-2'
          >
            <Icon icon='mdi:information-outline' className='text-accent-cyan' />
            {t('videosScrollHint')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mb-12'
        >
          <div className='flex items-center gap-4 mb-8'>
            <div className='flex-shrink-0 w-12 h-12 bg-accent-cyan rounded-xl flex items-center justify-center'>
              <Icon icon='mdi:newspaper-variant' className='text-white text-2xl' />
            </div>
            <h3 className={`text-3xl md:text-4xl font-bold text-text-primary ${bebasNeue.className}`}>
              {t('printSectionTitle')}
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {pressArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group'
              >
                <a
                  href={article.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full'
                >
                  <div className='relative h-48 md:h-56 overflow-hidden'>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
                    <div className='absolute top-4 right-4'>
                      <span className='bg-accent-cyan text-white px-3 py-1 rounded-full text-xs font-semibold'>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className='p-6'>
                    <p className='text-xs text-text-secondary uppercase tracking-wide mb-2 font-semibold'>
                      {article.source} • {article.date}
                    </p>
                    <h4 className='text-lg md:text-xl font-bold text-text-primary mb-3 group-hover:text-accent-cyan transition-colors duration-300 line-clamp-2'>
                      {article.title}
                    </h4>
                    <div className='flex items-center gap-2 text-accent-cyan font-semibold text-sm'>
                      {t('readArticle')}
                      <Icon icon='mdi:arrow-right' className='text-lg group-hover:translate-x-1 transition-transform duration-300' />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className='mt-12'
        >
          <div className='bg-gradient-to-br from-accent-cyan to-accent-cyan-dark rounded-3xl p-8 md:p-12 overflow-hidden relative'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-4'>
                <Icon icon='mdi:television' className='text-white text-3xl' />
                <span className='text-white/90 text-sm font-semibold uppercase tracking-wide'>
                  {t('featured.badge')}
                </span>
              </div>
              <h3 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${bebasNeue.className}`}>
                {t('featured.title')}
              </h3>
              <p className='text-white/90 text-lg mb-6 max-w-2xl'>
                {t('featured.description')}
              </p>
              <a
                href='https://www.ndr.de/fernsehen/sendungen/hamburg_journal/Hamburgerin-Natalie-Zimmermann-boxt-um-WBO-WM-Titel,hamj157910.html'
                target='_blank'
                rel='noopener noreferrer'
                className='btn-solid-light'
              >
                {t('featured.cta')}
                <Icon icon='mdi:arrow-right' className='text-xl' />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Presse
