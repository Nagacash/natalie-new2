'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

type ImageLightboxProps = {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  imageClassName?: string
  children?: ReactNode
  footer?: ReactNode
  showZoomHint?: boolean
}

const ImageLightbox = ({
  src,
  alt,
  caption,
  width,
  height,
  fill = false,
  sizes,
  priority,
  className = '',
  imageClassName = '',
  children,
  footer,
  showZoomHint = true,
}: ImageLightboxProps) => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const t = useTranslations('common.lightbox')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [open, close])

  const overlayTransition = shouldReduceMotion ? 0.15 : 0.3
  const panelTransition = shouldReduceMotion ? 0.15 : 0.35

  return (
    <>
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setOpen(true)}
        className={`group relative block w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-4 ${className}`}
        aria-label={t('expand')}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={imageClassName}
            sizes={sizes}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width ?? 900}
            height={height ?? 1200}
            className={imageClassName}
            sizes={sizes}
            priority={priority}
          />
        )}
        {children}
        {showZoomHint ? (
          <span
            className='pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-sm bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100'
            aria-hidden
          >
            <Icon icon='mdi:arrow-expand' className='text-xl' />
          </span>
        ) : null}
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <motion.button
                    type='button'
                    aria-label={t('close')}
                    className='fixed inset-0 z-[100] cursor-zoom-out bg-black/80 backdrop-blur-sm'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: overlayTransition }}
                    onClick={close}
                  />
                  <motion.div
                    role='dialog'
                    aria-modal='true'
                    aria-label={t('dialogLabel')}
                    className='pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: overlayTransition }}
                  >
                    <motion.figure
                      className='pointer-events-auto relative max-w-[min(92vw,56rem)]'
                      initial={{
                        opacity: 0,
                        scale: shouldReduceMotion ? 1 : 0.92,
                        y: shouldReduceMotion ? 0 : 12,
                      }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: shouldReduceMotion ? 1 : 0.96,
                        y: shouldReduceMotion ? 0 : 8,
                      }}
                      transition={{
                        duration: panelTransition,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <button
                        ref={closeRef}
                        type='button'
                        onClick={close}
                        className='absolute -right-2 -top-2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white text-text-primary shadow-lg transition hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan sm:-right-4 sm:-top-4'
                        aria-label={t('close')}
                      >
                        <Icon icon='mdi:close' className='text-2xl' aria-hidden />
                      </button>
                      <div className='overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/10'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={alt}
                          className='max-h-[min(85vh,860px)] w-auto max-w-[min(92vw,56rem)] object-contain'
                        />
                      </div>
                      {caption ? (
                        <figcaption className='mt-4 text-center text-sm text-white/90 md:text-base'>
                          {caption}
                        </figcaption>
                      ) : null}
                      {footer}
                    </motion.figure>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  )
}

export default ImageLightbox
