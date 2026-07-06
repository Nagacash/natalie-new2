'use client'

import { useEffect } from 'react'

export default function ScrollUp() {
  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return null
}
