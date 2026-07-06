'use client'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { MotionConfig } from 'framer-motion'

const Aoscompo = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    AOS.init({
      duration: prefersReducedMotion ? 0 : 800,
      once: true,
      disable: prefersReducedMotion,
    })
  }, [])

  return (
    <MotionConfig reducedMotion='user'>
      <div>{children}</div>
    </MotionConfig>
  )
}

export default Aoscompo
