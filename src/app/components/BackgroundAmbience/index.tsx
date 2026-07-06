'use client'

import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { ambientAudio } from '@/app/lib/ambientAudio'

export default function BackgroundAmbience() {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    ambientAudio.init()
    return ambientAudio.subscribe(setPlaying)
  }, [])

  return (
    <button
      type='button'
      onClick={() => ambientAudio.toggle()}
      aria-label={
        playing
          ? 'Hintergrundmusik pausieren – Lateral Drift'
          : 'Hintergrundmusik abspielen – Lateral Drift'
      }
      aria-pressed={playing}
      title={playing ? 'Musik pausieren' : 'Chill-Vibe einschalten'}
      className={`fixed bottom-6 left-6 z-fixed flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm shadow-md ring-1 ring-inset transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 md:bottom-8 md:left-8 ${
        playing
          ? 'bg-accent-cyan text-white shadow-accent-cyan/35 ring-white/10 hover:bg-accent-cyan-dark'
          : 'bg-white text-text-primary shadow-black/10 ring-black/5 hover:bg-grey'
      }`}
    >
      <Icon
        icon={playing ? 'mdi:music-note' : 'mdi:music-note-off-outline'}
        className='text-2xl'
        aria-hidden
      />
    </button>
  )
}
