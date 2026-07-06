'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

const FOOTER_LINK_HREFS: string[][] = [
  ['/', '/#About', '/about-me', '/#Team', '/#FAQ', '/#Featured', '/#Presse', '/kontakt'],
  ['/about-me', '/#Blog', '/kontakt', '/#Flow', '/#Form', '/#Recovery'],
  ['https://www.mesoskin-hamburg.com'],
]

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/natalie.zimmermann.94',
    icon: '/images/footer/vec.svg',
  },
  {
    href: 'https://tiktok.com/@nataliezimmermann',
    icon: '/images/footer/tiktok.svg',
  },
  {
    href: 'https://www.instagram.com/nataliezimmermann_ger/',
    icon: '/images/footer/instagram.svg',
  },
] as const

const Footer = () => {
  const t = useTranslations('footer')

  const sectionsRaw = t.raw('sections') as Record<
    string,
    { title: string; links: Record<string, { label: string }> }
  >

  const footerSections = Object.values(sectionsRaw).map((section, sectionIndex) => ({
    title: section.title,
    links: Object.values(section.links).map((link, linkIndex) => ({
      label: link.label,
      href: FOOTER_LINK_HREFS[sectionIndex]?.[linkIndex] ?? '#',
    })),
  }))

  const socialNames = Object.values(t.raw('social') as Record<string, string>)

  return (
    <footer className='bg-black text-white relative overflow-hidden'>
      <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black to-black/95 z-0' />
      <div className='absolute top-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0' />

      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20'>
        <div className='pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12'>
          <div className='grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-12'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='lg:col-span-4 relative z-20'
            >
              <p className='text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-md'>
                {t('tagline')}
              </p>

              <div className='space-y-3 mb-6 md:mb-8'>
                <a
                  href='tel:+494053790578'
                  className='flex items-center gap-3 text-white/80 hover:text-accent-cyan transition-colors duration-300 group text-sm md:text-base'
                >
                  <Icon
                    icon='mdi:phone'
                    className='text-accent-cyan text-lg md:text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300'
                  />
                  <span className='break-all'>040 / 53790578</span>
                </a>
                <a
                  href='mailto:info@nataliezimmermann.de'
                  className='flex items-center gap-3 text-white/80 hover:text-accent-cyan transition-colors duration-300 group text-sm md:text-base'
                >
                  <Icon
                    icon='mdi:email'
                    className='text-accent-cyan text-lg md:text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300'
                  />
                  <span className='break-all'>info@nataliezimmermann.de</span>
                </a>
                <div className='flex items-start gap-3 text-white/80 text-sm md:text-base'>
                  <Icon icon='mdi:map-marker' className='text-accent-cyan text-lg md:text-xl mt-1 flex-shrink-0' />
                  <span>Rothenbaumchaussee 156<br />20149 Hamburg</span>
                </div>
              </div>

              <div>
                <p className='text-white/70 text-xs md:text-sm font-semibold mb-3 md:mb-4 uppercase tracking-wide'>
                  {t('followUs')}
                </p>
                <div className='flex items-center gap-3 md:gap-4'>
                  {SOCIAL_LINKS.map((social, index) => (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className='relative z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white/10 transition duration-300 hover:bg-accent-cyan md:h-12 md:w-12'
                      aria-label={socialNames[index]}
                    >
                      <Image
                        src={social.icon}
                        alt={socialNames[index]}
                        width={18}
                        height={18}
                        className='md:w-5 md:h-5 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition duration-300 relative z-40'
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {footerSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className='lg:col-span-2 relative z-20'
              >
                <h3 className='text-white text-base md:text-lg lg:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2'>
                  <Icon icon='mdi:chevron-right' className='text-accent-cyan text-xs md:text-sm' />
                  {section.title}
                </h3>
                <ul className='space-y-2 md:space-y-3'>
                  {section.links.map((link) => {
                    const isExternal = link.href.startsWith('http')
                    return (
                      <li key={link.label}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-white/70 text-sm md:text-base hover:text-accent-cyan transition-colors duration-300 flex items-center gap-2 group'
                          >
                            <Icon
                              icon='mdi:chevron-right'
                              className='text-accent-cyan/50 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300'
                            />
                            <span className='break-words'>{link.label}</span>
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className='text-white/70 text-sm md:text-base hover:text-accent-cyan transition-colors duration-300 flex items-center gap-2 group'
                          >
                            <Icon
                              icon='mdi:chevron-right'
                              className='text-accent-cyan/50 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300'
                            />
                            <span className='break-words'>{link.label}</span>
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className='border-t border-white/10 pt-6 md:pt-8 pb-6 md:pb-8 relative z-20'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center md:text-left order-2 md:order-1'
            >
              <p className='text-white/70 text-xs md:text-sm lg:text-base'>
                © {new Date().getFullYear()} Natalie Zimmermann. {t('copyright')}
              </p>
              <p className='text-white/50 text-xs mt-1 md:mt-2'>
                {t('designedBy')}{' '}
                <a
                  href='https://www.nagacodex.cloud/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-accent-cyan transition-colors duration-300'
                >
                  {t('designer')}
                </a>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex items-center justify-center gap-4 md:gap-6 flex-wrap order-1 md:order-2'
            >
              <Link
                href='/impressum'
                className='text-white/70 text-xs md:text-sm lg:text-base hover:text-accent-cyan transition-colors duration-300'
              >
                Impressum
              </Link>
              <div className='w-px h-3 md:h-4 bg-white/20'></div>
              <Link
                href='/datenschutz'
                className='text-white/70 text-xs md:text-sm lg:text-base hover:text-accent-cyan transition-colors duration-300'
              >
                Datenschutz
              </Link>
              <div className='w-px h-3 md:h-4 bg-white/20'></div>
              <Link
                href='/agb'
                className='text-white/70 text-xs md:text-sm lg:text-base hover:text-accent-cyan transition-colors duration-300'
              >
                AGB
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
