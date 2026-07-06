'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

const VIDEO_SRCS = [
  'https://www.youtube-nocookie.com/embed/SLAkZV6mL3E?rel=0',
  'https://www.youtube-nocookie.com/embed/-f76VQTPltI?rel=0',
  'https://www.youtube-nocookie.com/embed/tfqBXnPkm4A?rel=0',
  'https://www.youtube-nocookie.com/embed/sFCfVHTVoy4?rel=0',
] as const

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const VideoGallery: React.FC = () => {
  const t = useTranslations('presse')

  const videos = Object.values(
    t.raw('videoGallery.videos') as Record<string, { title: string }>
  ).map((video, i) => ({
    id: String(i + 1),
    src: VIDEO_SRCS[i],
    title: video.title,
  }))

  const playAudio = () => {
    const audio = new Audio('/sound/click.wav')
    audio.volume = 0.5
    audio.play()
  }
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage(([oldPage]) => [oldPage + newDirection, newDirection])
  }

  const videoIndex = Math.abs(page % videos.length)
  const currentVideo = videos[videoIndex]

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        playAudio()
        setPage(([oldPage]) => [oldPage - 1, -1])
      } else if (e.key === 'ArrowRight') {
        playAudio()
        setPage(([oldPage]) => [oldPage + 1, 1])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className='relative w-full max-w-5xl mx-auto'>
      <div className='relative w-full overflow-hidden rounded-2xl shadow-2xl bg-black'>
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className='aspect-video w-full'
          >
            <iframe
              src={currentVideo.src}
              title={currentVideo.title}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
              className='w-full h-full'
              loading='lazy'
            />
          </motion.div>
        </AnimatePresence>

        <button
          type='button'
          onClick={() => {
            playAudio()
            paginate(-1)
          }}
          className='absolute left-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-sm border border-border/50 bg-white/95 p-3 text-text-primary shadow-md shadow-black/10 backdrop-blur-sm transition duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 active:scale-[0.97]'
          aria-label={t('videoGallery.prevVideo')}
        >
          <Icon icon='mdi:chevron-left' className='text-2xl' aria-hidden />
        </button>
        <button
          type='button'
          onClick={() => {
            playAudio()
            paginate(1)
          }}
          className='absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-sm border border-border/50 bg-white/95 p-3 text-text-primary shadow-md shadow-black/10 backdrop-blur-sm transition duration-200 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 active:scale-[0.97]'
          aria-label={t('videoGallery.nextVideo')}
        >
          <Icon icon='mdi:chevron-right' className='text-2xl' aria-hidden />
        </button>

        <div className='absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-xl bg-black/75 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm'>
          {videoIndex + 1} / {videos.length}
        </div>
      </div>

      <div className='mt-6 overflow-x-auto pb-4'>
        <div className='flex gap-4 justify-center'>
          {videos.map((video, index) => (
            <button
              type='button'
              key={video.id}
              onClick={() => {
                playAudio()
                const dir = index > videoIndex ? 1 : -1
                setPage([index, dir])
              }}
              className={`flex-shrink-0 w-24 h-16 cursor-pointer rounded-sm overflow-hidden border-2 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 ${
                index === videoIndex
                  ? 'border-accent-cyan scale-110 shadow-lg'
                  : 'border-transparent hover:border-accent-cyan/50 hover:scale-105 opacity-70 hover:opacity-100'
              }`}
              aria-label={`Video ${index + 1}: ${video.title}`}
            >
              <div className='w-full h-full bg-gradient-to-br from-accent-cyan to-accent-cyan-dark flex items-center justify-center'>
                <Icon icon='mdi:play' className='text-white text-2xl' />
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className='text-center text-text-secondary text-xs mt-4 flex items-center justify-center gap-2'>
        <Icon icon='mdi:keyboard' className='text-accent-cyan' />
        {t('videoGallery.keyboardHint')}
      </p>
    </div>
  )
}

export default VideoGallery
