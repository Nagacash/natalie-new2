'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import { Link, useRouter } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

const ARTICLE_IMAGES = [
  '/images/dedicated/sab5.webp',
  '/images/articles/nat3.webp',
  '/images/dedicated/sab2.webp',
] as const

const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  speed: 500,
  cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ],
}

const getServiceIcon = (heading: string) => {
  const headingLower = heading.toLowerCase()
  if (headingLower.includes('recovery') || headingLower.includes('ihht')) {
    return 'mdi:spa-outline'
  }
  if (headingLower.includes('flow') || headingLower.includes('box') || headingLower.includes('kick')) {
    return 'mdi:boxing-glove'
  }
  if (headingLower.includes('form')) {
    return 'mdi:dumbbell'
  }
  if (headingLower.includes('coach')) {
    return 'mdi:brain'
  }
  return 'mdi:star'
}

const Articles = () => {
  const t = useTranslations('articles')
  const router = useRouter()

  const playAudio = () => {
    const audio = new Audio('/sound/click.wav')
    audio.volume = 0.5
    audio.play()
  }

  const itemsRaw = t.raw('items') as Record<
    string,
    {
      heading: string
      heading2: string
      description: string
      date: string
      cta: string
    }
  >

  const articles = Object.values(itemsRaw).map((item, i) => ({
    ...item,
    imgSrc: ARTICLE_IMAGES[i],
  }))

  return (
    <section id='Blog' className='relative bg-light overflow-hidden py-16 md:py-20 lg:py-24'>
      <div className='absolute top-0 right-0 w-1/3 h-1/3 bg-accent-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
      <div className='absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-cyan/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />

      <div className='container mx-auto max-w-7xl px-4 relative z-10'>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Slider {...settings}>
            {articles.map((item, i) => {
              const serviceIcon = getServiceIcon(item.heading)
              return (
                <div key={i} className='px-2 md:px-4'>
                  <div className='bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group'>
                    <div className='relative h-64 overflow-hidden'>
                      <Image
                        src={item.imgSrc}
                        alt={item.heading}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

                      <div className='absolute top-4 right-4 w-14 h-14 bg-accent-cyan rounded-2xl flex items-center justify-center shadow-lg'>
                        <Icon icon={serviceIcon} className='text-white text-2xl' />
                      </div>

                      <div className='absolute bottom-4 left-4'>
                        <span className='bg-white/90 backdrop-blur-sm text-text-primary px-3 py-1 rounded-full text-xs font-semibold'>
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <div className='p-6 md:p-8 flex-grow flex flex-col'>
                      <div className='mb-4'>
                        <h3 className={`text-2xl md:text-3xl font-bold text-text-primary mb-2 ${bebasNeue.className}`}>
                          {item.heading}
                        </h3>
                        {item.heading2 && (
                          <h4 className='text-lg md:text-xl font-semibold text-accent-cyan'>
                            {item.heading2}
                          </h4>
                        )}
                      </div>

                      <p className='text-text-secondary text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-4'>
                        {item.description}
                      </p>

                      <button
                        onClick={() => {
                          playAudio()
                          router.push('/kontakt')
                        }}
                        className='btn-primary w-full inline-flex items-center justify-center gap-2'
                        aria-label={`${item.heading} - ${item.cta}`}
                      >
                        <Icon icon='mdi:arrow-right' className='text-xl' />
                        {item.cta}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </motion.div>

        <style jsx global>{`
          .slick-dots {
            bottom: -50px !important;
          }
          .slick-dots li button:before {
            color: var(--color-accent-cyan) !important;
            font-size: 12px !important;
            opacity: 0.3 !important;
          }
          .slick-dots li.slick-active button:before {
            opacity: 1 !important;
            color: var(--color-accent-cyan) !important;
          }
          .slick-prev,
          .slick-next {
            z-index: 20;
            width: 48px;
            height: 48px;
          }
          .slick-prev:before,
          .slick-next:before {
            color: var(--color-accent-cyan);
            font-size: 24px;
          }
          .slick-prev {
            left: -60px;
          }
          .slick-next {
            right: -60px;
          }
          @media (max-width: 1024px) {
            .slick-prev,
            .slick-next {
              display: none !important;
            }
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-16 md:mt-20 text-center'
        >
          <div className='bg-gradient-to-br from-accent-cyan to-accent-cyan-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2' />
            <div className='relative z-10'>
              <Icon icon='mdi:handshake' className='text-5xl mb-4 mx-auto' />
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${bebasNeue.className}`}>
                {t('bottomCta.title')}
              </h3>
              <p className='text-white/90 text-lg mb-6 max-w-2xl mx-auto'>
                {t('bottomCta.description')}
              </p>
              <Link href='/kontakt' className='btn-solid-light'>
                {t('bottomCta.button')}
                <Icon icon='mdi:arrow-right' className='text-xl' />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Articles
