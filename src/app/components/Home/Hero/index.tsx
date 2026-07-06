'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'
import { bebasNeue } from '@/app/fonts'

const AMAZON_BOOK_URL =
  'https://www.amazon.de/-/en/Mens-Health-Womens-Erfolgsgeheimnisse-Box-Weltmeisterin/dp/3613509911'

const QUICK_LINK_ICONS = ['mdi:account-circle', 'mdi:book-open-variant', 'mdi:phone'] as const
const QUICK_LINK_HREFS = ['/#About', AMAZON_BOOK_URL, '/kontakt'] as const
const QUICK_LINK_EXTERNAL = [false, true, false] as const

const ease = [0.22, 1, 0.36, 1] as const

function useNarrowViewport() {
  const [isNarrow, setIsNarrow] = useState(false)

  useLayoutEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isNarrow
}

const Hero = () => {
  const t = useTranslations('hero')
  const shouldReduceMotion = useReducedMotion()
  const motionOff = shouldReduceMotion
  const isNarrow = useNarrowViewport()
  const videoRef = useRef<HTMLVideoElement>(null)

  const quickLinks = Object.values(
    t.raw('quickLinks') as Record<string, { label: string }>
  ).map((link, i) => ({
    ...link,
    icon: QUICK_LINK_ICONS[i],
    href: QUICK_LINK_HREFS[i],
    external: QUICK_LINK_EXTERNAL[i],
  }))

  const stats = Object.values(
    t.raw('stats') as Record<string, { value: string; label: string }>
  )

  useEffect(() => {
    if (shouldReduceMotion) return
    const video = videoRef.current
    if (!video) return

    const play = () => {
      void video.play().catch(() => {})
    }

    play()
    video.addEventListener('loadeddata', play)
    return () => video.removeEventListener('loadeddata', play)
  }, [shouldReduceMotion])

  return (
    <section
      id='Hero'
      className='relative z-10 overflow-hidden bg-grain bg-gradient-to-br from-light via-accent-cyan/5 to-accent-cyan-light/30 pt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-20 sm:pb-24 md:min-h-[100dvh] md:flex md:items-center md:pb-28 md:py-20 lg:py-24 lg:pb-32'
    >
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden' aria-hidden>
        {shouldReduceMotion ? (
          <Image
            src='/images/hero/sab6.webp'
            alt=''
            fill
            className='object-cover opacity-[0.1]'
            sizes='100vw'
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease }}
            className='absolute inset-0'
          >
            <motion.video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload='auto'
              poster='/images/hero/sab6.webp'
              initial={false}
              animate={
                motionOff || isNarrow ? undefined : { scale: [1.06, 1.1, 1.06] }
              }
              transition={
                motionOff || isNarrow
                  ? undefined
                  : { scale: { duration: 14, repeat: Infinity, ease: 'easeInOut' } }
              }
              className='absolute inset-0 h-full w-full scale-[1.14] object-cover object-[center_18%] opacity-[0.24] saturate-[0.85] contrast-[0.92] [mask-image:linear-gradient(to_bottom,black_0%,black_42%,rgba(0,0,0,0.55)_68%,transparent_100%)] sm:scale-[1.12] sm:object-[center_24%] sm:opacity-[0.28] md:scale-[1.06] md:object-[center_40%] md:opacity-[0.38]'
            >
              <source src='/clip/mist.mp4' type='video/mp4' />
            </motion.video>

            <div className='absolute inset-0 bg-gradient-to-b from-light/94 via-light/72 to-light/90 md:hidden' />
            <div className='absolute inset-0 hidden bg-gradient-to-r from-light/92 via-light/55 to-accent-cyan-light/25 md:block' />
            <div className='absolute inset-0 bg-gradient-to-br from-transparent via-accent-cyan/[0.06] to-accent-cyan/15 mix-blend-soft-light md:via-accent-cyan/[0.07] md:to-accent-cyan/20' />
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_110%_50%_at_50%_8%,rgba(55,190,240,0.08),transparent_62%)] md:bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(55,190,240,0.12),transparent_70%)]' />

            <div className='absolute bottom-0 right-0 h-[min(32vw,120px)] w-[min(48vw,200px)] bg-gradient-to-tl from-light/95 via-accent-cyan-light/80 to-transparent backdrop-blur-2xl md:h-[min(22vw,96px)] md:w-[min(34vw,168px)] md:via-accent-cyan-light/75' />
            <div className='absolute bottom-0 right-0 h-[min(20vw,72px)] w-[min(30vw,140px)] rounded-tl-3xl bg-light/50 backdrop-blur-3xl md:h-[min(14vw,56px)] md:w-[min(22vw,112px)] md:bg-light/40' />
          </motion.div>
        )}
      </div>
      <div
        className='pointer-events-none absolute top-[20%] right-0 z-0 h-[min(70vw,420px)] w-[min(70vw,420px)] translate-x-1/3 rounded-full bg-accent-cyan/15 blur-[100px] md:top-1/2 md:h-[min(80vw,520px)] md:w-[min(80vw,520px)] md:-translate-y-1/2'
        aria-hidden
      />

      <div className='container relative z-10 mx-auto max-w-7xl px-4'>
        <div className='flex flex-col gap-10 min-w-0 sm:gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16'>
          <motion.div
            initial={motionOff ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionOff ? 0.2 : 0.75, ease }}
            className='order-1 w-full min-w-0 lg:order-2 lg:w-1/2'
          >
            <div className='group relative mx-auto w-full max-w-[min(100%,28rem)] max-lg:mb-2 lg:max-w-none'>
              <div className='relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-card-lift)] ring-1 ring-black/[0.06] sm:aspect-[5/6] sm:rounded-3xl md:aspect-[4/5] lg:h-[min(72vh,650px)] lg:max-h-[650px] lg:aspect-auto'>
                <Image
                  src='/images/hero/lind3.webp'
                  alt={t('imageAlt')}
                  fill
                  className='object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:group-hover:scale-100'
                  priority
                  sizes='(max-width: 1024px) min(100vw - 2rem, 28rem), 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent' />

                <div className='absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 md:bottom-5 md:left-5 md:right-5'>
                  <span className='inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold uppercase tracking-wide text-text-primary shadow-md backdrop-blur-sm ring-1 ring-black/5'>
                    <Icon icon='mdi:trophy-variant' className='text-lg text-accent-cyan' aria-hidden />
                    {t('badgePhoto')}
                  </span>
                  <span className='inline-flex rounded-xl bg-accent-cyan/95 px-3 py-2 text-xs font-bold tabular-nums text-white shadow-md backdrop-blur-sm lg:hidden'>
                    {t('badgeYearsMobile')}
                  </span>
                </div>
              </div>

              <motion.div
                initial={motionOff ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: motionOff ? 0 : 0.45, ease }}
                className='absolute -bottom-4 -left-4 z-10 hidden rounded-2xl bg-white p-4 shadow-[var(--shadow-card-lift)] lg:block'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan'>
                    <Icon icon='mdi:trophy-variant' className='text-2xl text-white' aria-hidden />
                  </div>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-text-secondary'>{t('floatingCardOrg')}</p>
                    <p className='text-sm font-bold text-text-primary'>{t('floatingCardTitle')}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={motionOff ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: motionOff ? 0 : 0.52, ease }}
                className='absolute -right-4 -top-4 z-10 hidden rounded-2xl bg-accent-cyan p-4 shadow-[var(--shadow-card-lift)] lg:block'
              >
                <p className='mb-1 text-2xl font-bold tabular-nums text-white'>{t('floatingCardYears')}</p>
                <p className='text-xs text-white/90'>{t('floatingCardYearsLabel')}</p>
              </motion.div>
            </div>
          </motion.div>

          <div className='relative z-20 order-2 w-full min-w-0 text-center lg:order-1 lg:w-1/2 lg:text-left'>
            <motion.div
              initial={motionOff ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.65, delay: motionOff ? 0 : 0.12, ease }}
              className='mb-4 inline-flex items-center gap-2 rounded-full bg-accent-cyan/12 px-4 py-2 text-sm font-semibold tracking-wide text-accent-cyan md:mb-6 md:text-base'
            >
              <Icon icon='mdi:trophy' className='text-xl' aria-hidden />
              {t('badge')}
            </motion.div>

            <motion.h1
              initial={motionOff ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.7, delay: motionOff ? 0 : 0.18, ease }}
              className={`mb-4 text-[clamp(2rem,8vw,2.75rem)] font-bold leading-[1.05] text-text-primary sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl ${bebasNeue.className} text-balance`}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={motionOff ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.6, delay: motionOff ? 0 : 0.24, ease }}
              className='relative z-10 mx-auto mb-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0'
            >
              {t('subtitle')}
            </motion.p>

            <motion.p
              initial={motionOff ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.6, delay: motionOff ? 0 : 0.28, ease }}
              className='relative z-10 mx-auto mb-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg md:mb-8 lg:mx-0'
            >
              {t('subtitle2')}
            </motion.p>

            <motion.div
              initial={motionOff ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.6, delay: motionOff ? 0 : 0.3, ease }}
              className='mb-6 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start'
            >
              <Link
                href='/kontakt'
                className='btn-primary inline-flex w-full min-h-12 items-center justify-center gap-2 sm:w-auto'
              >
                <Icon icon='mdi:calendar-check' className='text-xl' aria-hidden />
                {t('ctaPrimary')}
              </Link>
              <Link
                href='/#About'
                className='btn-secondary inline-flex w-full min-h-12 items-center justify-center gap-2 sm:w-auto'
              >
                <Icon icon='mdi:heart-pulse' className='text-xl' aria-hidden />
                {t('ctaSecondary')}
              </Link>
            </motion.div>

            <motion.div
              initial={motionOff ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.55, delay: motionOff ? 0 : 0.36, ease }}
              className='mb-8 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start'
            >
              {quickLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex min-h-11 items-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-accent-cyan md:text-base'
                  >
                    <Icon icon={link.icon} className='text-lg shrink-0' aria-hidden />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='inline-flex min-h-11 items-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-accent-cyan md:text-base'
                  >
                    <Icon icon={link.icon} className='text-lg shrink-0' aria-hidden />
                    {link.label}
                  </Link>
                )
              ))}
            </motion.div>

            <motion.div
              initial={motionOff ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.2 : 0.55, delay: motionOff ? 0 : 0.42, ease }}
              className='mx-auto mt-2 grid max-w-md grid-cols-3 gap-3 border-t border-border/80 pt-6 sm:gap-4 lg:mx-0'
            >
              {stats.map((item) => (
                <div key={item.label} className='min-w-0 text-center tabular-nums lg:text-left'>
                  <p className='mb-0.5 text-xl font-bold text-text-primary sm:text-2xl md:text-3xl'>
                    {item.value}
                  </p>
                  <p className='text-[10px] leading-tight text-text-secondary sm:text-xs md:text-sm'>
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: motionOff ? 0 : 0.7 }}
          className='mt-8 flex justify-center lg:absolute lg:bottom-20 lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 xl:bottom-24'
        >
          <button
            type='button'
            onClick={() => {
              document.getElementById('About')?.scrollIntoView({
                behavior: shouldReduceMotion ? 'auto' : 'smooth',
              })
            }}
            className='flex min-h-11 cursor-pointer flex-col items-center gap-1 rounded-lg px-3 py-2 text-text-secondary transition-colors duration-200 hover:text-accent-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2'
            aria-label={t('scrollAria')}
          >
            <span className='text-xs font-semibold uppercase tracking-widest sm:text-sm'>
              {t('scrollLabel')}
            </span>
            <motion.span
              animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              className='inline-flex'
            >
              <Icon icon='mdi:chevron-down' className='text-2xl' aria-hidden />
            </motion.span>
          </button>
        </motion.div>
      </div>

      <div
        className='pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 sm:h-44 md:h-52'
        aria-hidden
      >
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-light/50 to-light' />
        <div className='absolute inset-x-0 bottom-16 h-32 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(55,190,240,0.14),transparent_68%)] sm:bottom-20 md:bottom-24' />
        <svg
          className='absolute bottom-0 left-0 h-12 w-full text-light sm:h-14 md:h-16'
          viewBox='0 0 1440 56'
          preserveAspectRatio='none'
          aria-hidden
        >
          <path
            fill='currentColor'
            d='M0,36 C320,56 520,12 720,34 C920,56 1120,10 1440,32 L1440,56 L0,56 Z'
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
