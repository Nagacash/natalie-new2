'use client'

import { Key, useEffect, useRef, useState } from 'react'
import { WHATSAPP_URL } from '@/app/data/contact'
import { HeaderItem } from '@/app/types/menu'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import LocaleSwitcher from './LocaleSwitcher'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslations } from 'next-intl'

function buildNavLinks(
  t: ReturnType<typeof useTranslations<'nav'>>,
  keys: Array<'headerLinks' | 'mobileOnlyLinks'>,
): HeaderItem[] {
  const links: HeaderItem[] = []

  for (const key of keys) {
    const group = t.raw(key) as Record<string, { label: string; href: string }>
    Object.values(group).forEach((item) => {
      links.push({ label: item.label, href: item.href })
    })
  }

  return links
}

const Header: React.FC = () => {
  const t = useTranslations('nav')
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const headerData = buildNavLinks(t, ['headerLinks'])
  const mobileHeaderData = buildNavLinks(t, ['headerLinks', 'mobileOnlyLinks'])

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <>
      <header
        className={`fixed top-0 z-sticky w-full transition-[background-color,box-shadow,border-color] duration-300 ${
          sticky && !navbarOpen
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border'
            : 'bg-white border-b border-border/50'
        }`}
      >
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='flex items-center justify-between h-16 md:h-20 lg:h-24'>
            <div className='flex-shrink-0 z-50'>
              <Logo />
            </div>

            <nav className='hidden lg:flex items-center gap-6 xl:gap-8 flex-grow justify-center'>
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </nav>

            <div className='flex items-center gap-2 md:gap-3'>
              <LocaleSwitcher />

              <a
                href={WHATSAPP_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-accent-sm hidden lg:flex'
                aria-label={t('aria.whatsappContact')}
              >
                <Icon icon='mdi:whatsapp' className='text-xl' aria-hidden='true' />
                <span className='hidden xl:inline'>{t('whatsapp')}</span>
              </a>

              <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className='btn-icon-surface z-50 p-2 lg:hidden'
                aria-label={t('aria.toggleMobileMenu')}
                aria-expanded={navbarOpen}
              >
                <div className='flex flex-col gap-1.5 w-6'>
                  <span
                    className={`block h-0.5 bg-darkmode transition-[transform,opacity] duration-300 ${
                      navbarOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-darkmode transition-[transform,opacity] duration-300 ${
                      navbarOpen ? 'opacity-0' : ''
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 bg-darkmode transition-[transform,opacity] duration-300 ${
                      navbarOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {navbarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-fixed lg:hidden'
          onClick={() => setNavbarOpen(false)}
          aria-hidden='true'
        />
      )}

      <div
        ref={mobileMenuRef}
        className={`mobile-nav-drawer lg:hidden fixed top-0 right-0 h-full w-full max-w-sm shadow-2xl transform transition-transform duration-300 ease-in-out z-modal ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-hidden={!navbarOpen}
      >
        <div className='flex items-center justify-between border-b border-border bg-white p-6'>
          <Logo />
          <div className='flex items-center gap-2'>
            <LocaleSwitcher />
            <button
              onClick={() => setNavbarOpen(false)}
              className='btn-icon-surface p-2 hover:bg-grey'
              aria-label={t('aria.closeMenu')}
            >
              <Icon icon='mdi:close' className='text-2xl text-text-primary' />
            </button>
          </div>
        </div>

        <nav className='flex flex-col overflow-y-auto bg-white p-6 h-[calc(100vh-80px)]'>
          {mobileHeaderData.map((item: HeaderItem, index: Key | null | undefined) => (
            <MobileHeaderLink key={index} item={item} setNavbarOpen={setNavbarOpen} />
          ))}

          <a
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='btn-accent-sm mt-6 flex w-full justify-center'
            onClick={() => setNavbarOpen(false)}
          >
            <Icon icon='mdi:whatsapp' className='text-xl' />
            {t('whatsappContact')}
          </a>

          <div className='mt-8 border-t border-border pt-8'>
            <p className='text-text-secondary text-sm font-semibold mb-4 uppercase tracking-wide'>
              {t('contactHeading')}
            </p>
            <div className='space-y-3'>
              <a
                href='tel:+494053790578'
                className='flex items-center gap-3 text-text-primary hover:text-accent-cyan transition-colors duration-300'
              >
                <Icon icon='mdi:phone' className='text-xl text-accent-cyan' />
                <span>040 / 53790578</span>
              </a>
              <a
                href='mailto:info@nataliezimmermann.de'
                className='flex items-center gap-3 text-text-primary hover:text-accent-cyan transition-colors duration-300'
              >
                <Icon icon='mdi:email' className='text-xl text-accent-cyan shrink-0' />
                <span className='break-all'>info@nataliezimmermann.de</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
