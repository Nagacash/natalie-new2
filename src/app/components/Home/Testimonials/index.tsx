'use client'

import Slider from 'react-slick'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

const TESTIMONIAL_IMAGES = [
  '/images/testimonial/user1.svg',
  '/images/testimonial/user2.svg',
  '/images/testimonial/user3.svg',
  '/images/testimonial/user1.svg',
  '/images/testimonial/user2.svg',
  '/images/testimonial/user3.svg',
] as const

const TESTIMONIAL_RATINGS = [5, 4, 4, 4, 4, 4] as const

interface TestimonialType {
  name: string
  profession: string
  comment: string
  imgSrc: string
  rating: number
}

interface TestimonialCardProps {
  items: TestimonialType
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 600,
  pauseOnHover: true,
  cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
  ],
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ items }) => {
  const validRating = Math.min(Math.max(items.rating, 0), 5)

  return (
    <div className='px-2 md:px-4'>
      <div className='bg-white shadow-testimonial rounded-3xl p-6 md:p-8 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 group'>
        <div className='mb-4'>
          <Icon
            icon='mdi:format-quote-open'
            className='text-accent-cyan text-4xl opacity-20'
          />
        </div>

        <div className='flex gap-1 mb-4'>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              icon='mdi:star'
              className={`text-lg ${
                i < validRating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        <p className='text-text-secondary text-base md:text-lg leading-relaxed mb-6 flex-grow'>
          &ldquo;{items.comment}&rdquo;
        </p>

        <div className='border-t border-border mb-6'></div>

        <div className='flex items-center gap-4'>
          <div className='relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-accent-cyan/20 group-hover:ring-accent-cyan/40 transition-[box-shadow] duration-300'>
            <Image
              src={items.imgSrc}
              alt={`${items.name} - ${items.profession}`}
              fill
              className='object-cover'
            />
          </div>
          <div className='flex-grow'>
            <p className='text-text-primary font-bold text-base md:text-lg mb-1'>
              {items.name}
            </p>
            <p className='text-text-secondary text-sm'>
              {items.profession}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Testimonial: React.FC = () => {
  const t = useTranslations('testimonial')

  const itemsRaw = t.raw('items') as Record<
    string,
    { name: string; profession: string; comment: string }
  >

  const testimonals: TestimonialType[] = Object.values(itemsRaw).map((item, i) => ({
    ...item,
    imgSrc: TESTIMONIAL_IMAGES[i],
    rating: TESTIMONIAL_RATINGS[i],
  }))

  let averageRating = 0
  if (testimonals.length > 0) {
    const sum = testimonals.reduce((acc, item) => acc + item.rating, 0)
    averageRating = sum / testimonals.length
  }

  return (
    <section
      className='relative bg-gradient-to-br from-accent-cyan/5 via-light to-accent-cyan-light/5 overflow-hidden py-16 md:py-20 lg:py-24'
      id='testimonial-section'
    >
      <div
        className='pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-5'
        style={{ backgroundImage: 'url(/images/wework/elipse.svg)' }}
        aria-hidden
      />

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 mb-4'
          >
            <div className='flex items-center gap-2'>
              <div className='flex gap-1'>
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    icon='mdi:star'
                    className={`text-xl sm:text-2xl ${
                      i < Math.round(averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className='text-xl sm:text-2xl font-bold text-text-primary'>
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className='hidden h-8 w-px bg-border sm:block' />
            <p className='text-center text-sm text-text-secondary sm:text-left sm:text-base md:text-lg'>
              {t('ratingSummary')}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='testimonial-slider pb-12'
        >
          <Slider {...settings}>
            {testimonals.map((items, i) => (
              <TestimonialCard key={i} items={items} />
            ))}
          </Slider>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-10 md:mt-12 text-center'
        >
          <div className='inline-flex max-w-full flex-col items-center gap-3 rounded-xl bg-white px-4 py-3 text-center shadow-md shadow-black/10 ring-1 ring-border/60 sm:flex-row sm:px-6 sm:text-left'>
            <Icon icon='mdi:shield-check' className='text-accent-cyan text-2xl shrink-0' />
            <p className='text-sm font-semibold text-text-primary sm:text-base'>
              {t('trustBadge')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonial
