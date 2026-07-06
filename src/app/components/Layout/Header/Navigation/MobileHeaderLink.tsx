'use client'
import { useState } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { HeaderItem } from '@/app/types/menu'
import { getNavHashTarget } from '@/app/data/nav'
import { useActiveNavLink } from '@/app/hooks/useActiveNavLink'
import { Icon } from '@iconify/react'
import { bebasNeue } from '@/app/fonts'

const MobileHeaderLink: React.FC<{
  item: HeaderItem
  setNavbarOpen: (isOpen: boolean) => void
}> = ({ item, setNavbarOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const path = usePathname()
  const router = useRouter()
  const isActive = useActiveNavLink(item.href)

  const playAudio = () => {
    const audio = new Audio('/sound/click.wav')
    audio.volume = 0.5
    audio.play()
  }

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen)
  }

  const handleClick = (e: React.MouseEvent) => {
    playAudio()
    const targetId = getNavHashTarget(item.href)

    if (targetId) {
      e.preventDefault()

      setNavbarOpen(false)

      setTimeout(() => {
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          const headerOffset = 100
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.history.replaceState(null, '', `/#${targetId}`)
          window.dispatchEvent(new HashChangeEvent('hashchange'))

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        } else {
          router.push(item.href)
        }
      }, 300)
    } else if (!item.submenu) {
      setNavbarOpen(false)
    }
  }

  return (
    <div className='relative w-full mb-4'>
      <div className='flex items-center justify-between'>
        <Link
          href={item.href}
          target={item.target}
          onClick={handleClick}
          className={`text-lg font-semibold flex items-center gap-2 transition-colors duration-300 ${
            isActive
              ? 'text-accent-cyan'
              : 'text-text-primary hover:text-accent-cyan'
          } ${bebasNeue.className}`}
        >
          {item.label}
        </Link>
        {item.submenu && (
          <button
            onClick={handleToggle}
            className='p-2 rounded-lg hover:bg-grey transition-colors duration-200'
            aria-label='Toggle submenu'
          >
            <Icon
              icon='mdi:chevron-down'
              className={`text-xl text-text-primary transition-transform duration-300 ${
                submenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>

      {/* Submenu */}
      {submenuOpen && item.submenu && (
        <div className='mt-2 ml-4 space-y-2 border-l-2 border-accent-cyan/30 pl-4'>
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={() => setNavbarOpen(false)}
              className={`block py-2 text-text-secondary hover:text-accent-cyan transition-colors duration-200 ${
                path === subItem.href ? 'text-accent-cyan font-semibold' : ''
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeaderLink
