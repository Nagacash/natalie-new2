'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import ImageLightbox from '@/app/components/Common/ImageLightbox'
import { bebasNeue } from '@/app/fonts'

const EFFECT_IMAGES = [
  '/images/new/recovery1.webp',
  '/images/new/recovery2.webp',
  '/images/new/recovery3.webp',
] as const
const EFFECT_ICONS = ['mdi:spa-outline', 'mdi:pulse', 'mdi:weather-windy'] as const

const Recovery = () => {
  const t = useTranslations('recovery')

  const intro = Object.values(t.raw('intro') as Record<string, string>)
  const effects = Object.values(
    t.raw('effects') as Record<
      string,
      { num: string; label: string; title: string; text: string }
    >
  ).map((effect, i) => ({
    ...effect,
    imgSrc: EFFECT_IMAGES[i],
    icon: EFFECT_ICONS[i],
  }))
  const gains = Object.values(t.raw('gains') as Record<string, string>)
  const steps = Object.values(
    t.raw('steps') as Record<string, { num: string; title: string; text: string }>
  )

  const linkClassName =
    'font-semibold text-accent-cyan underline-offset-2 transition-colors duration-200 hover:text-accent-cyan-dark hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2'

  return (
    <section id='Recovery' className='overflow-hidden bg-light py-16 md:py-20 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='order-2 lg:order-1'
          >
            <ImageLightbox
              src='/images/new/recovery1.webp'
              alt={t('heroImageAlt')}
              caption={t('heroImageCaption')}
              fill
              className='relative aspect-[3/4] overflow-hidden rounded-3xl shadow-[var(--shadow-card-lift)] lg:aspect-[3/4]'
              imageClassName='object-cover object-center transition duration-500 group-hover:scale-[1.02]'
              sizes='(max-width: 1024px) 100vw, 50vw'
            >
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
              <span className='absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm'>
                {t('heroImageCaption')}
              </span>
            </ImageLightbox>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='order-1 lg:order-2'
          >
            <p className='mb-4 text-sm font-bold uppercase tracking-widest text-accent-cyan md:text-base'>
              {t('eyebrow')}
            </p>
            <h2
              className={`mb-6 text-4xl font-bold text-text-primary md:text-5xl lg:text-6xl ${bebasNeue.className} text-balance`}
            >
              {t('title')}
            </h2>
            {intro.map((paragraph) => (
              <p
                key={paragraph}
                className='copy-prose mb-5 text-base leading-relaxed text-text-secondary last:mb-8 md:text-lg'
              >
                {paragraph}
              </p>
            ))}
            <Link href='/kontakt' className='btn-accent inline-flex items-center gap-2'>
              {t('cta')}
              <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mt-20 md:mt-28'
        >
          <div className='mb-10 text-center md:mb-14'>
            <p className='mb-3 text-sm font-bold uppercase tracking-widest text-accent-cyan'>
              {t('effectsSection.eyebrow')}
            </p>
            <h3
              className={`mb-4 text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl ${bebasNeue.className} text-balance`}
            >
              {t('effectsSection.title')}
            </h3>
            <p className='copy-prose mx-auto max-w-2xl text-base text-text-secondary md:text-lg'>
              {t('effectsSection.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
            {effects.map((item, i) => (
              <motion.article
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className='group overflow-hidden rounded-3xl border border-border/60 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl'
              >
                <div className='relative h-48 overflow-hidden md:h-52'>
                  <Image
                    src={item.imgSrc}
                    alt={item.title}
                    fill
                    className='object-cover object-center transition-[filter] duration-300 group-hover:brightness-[1.03]'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                  <span className='absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wide text-white/90'>
                    {item.label}
                  </span>
                  <span
                    className={`absolute right-4 top-4 text-4xl font-bold text-white/30 ${bebasNeue.className}`}
                  >
                    {item.num}
                  </span>
                </div>
                <div className='p-6 md:p-8'>
                  <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-cyan/10'>
                    <Icon icon={item.icon} className='text-xl text-accent-cyan' aria-hidden />
                  </div>
                  <h4 className={`mb-3 text-xl font-bold text-text-primary md:text-2xl ${bebasNeue.className}`}>
                    {item.title}
                  </h4>
                  <p className='text-base leading-relaxed text-text-secondary'>{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mt-20 md:mt-28'
        >
          <div className='mb-8 text-center md:mb-10'>
            <p className='mb-3 text-sm font-bold uppercase tracking-widest text-accent-cyan'>
              {t('gainsSection.eyebrow')}
            </p>
            <h3
              className={`text-3xl font-bold text-text-primary md:text-4xl ${bebasNeue.className}`}
            >
              {t('gainsSection.title')}
            </h3>
          </div>
          <ul className='flex flex-wrap justify-center gap-3 md:gap-4'>
            {gains.map((gain, i) => (
              <motion.li
                key={gain}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <span className='btn-chip btn-chip-idle inline-flex cursor-default uppercase tracking-wide'>
                  {gain}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mt-20 md:mt-28'
        >
          <div className='mb-10 text-center md:mb-14'>
            <p className='mb-3 text-sm font-bold uppercase tracking-widest text-accent-cyan'>
              {t('stepsSection.eyebrow')}
            </p>
            <h3
              className={`mb-4 text-3xl font-bold text-text-primary md:text-4xl ${bebasNeue.className} text-balance`}
            >
              {t('stepsSection.title')}
            </h3>
            <p className='copy-prose mx-auto max-w-2xl text-base text-text-secondary md:text-lg'>
              {t('stepsSection.subtitle')}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className='relative rounded-3xl bg-grey p-6 md:p-8'
              >
                <span
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-cyan text-xl font-bold text-white ${bebasNeue.className}`}
                >
                  {step.num}
                </span>
                <h4 className={`mb-3 text-xl font-bold text-text-primary ${bebasNeue.className}`}>
                  {step.title}
                </h4>
                <p className='text-base leading-relaxed text-text-secondary'>{step.text}</p>
              </motion.div>
            ))}
          </div>

          <p className='copy-prose mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-text-muted md:text-base'>
            {t.rich('disclaimer', {
              memberships: (chunks) => (
                <Link href='/#services-section' className={linkClassName}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mt-16 md:mt-24'
        >
          <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep-slate to-text-primary p-8 text-center shadow-xl md:p-12 lg:p-16'>
            <div className='pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-accent-cyan/20 blur-2xl' />
            <div className='relative z-10'>
              <h3
                className={`mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl ${bebasNeue.className} text-balance`}
              >
                {t('bottomCta.title')}
              </h3>
              <p className='copy-prose mx-auto mb-8 max-w-2xl text-base text-white/85 md:text-lg'>
                {t('bottomCta.description')}
              </p>
              <Link href='/kontakt' className='btn-accent inline-flex items-center gap-2'>
                {t('cta')}
                <Icon icon='mdi:arrow-right' className='text-xl' aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Recovery
