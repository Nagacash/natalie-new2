import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Imprint – Natalie Zimmermann',
  description:
    'English imprint. Please refer to the German Impressum page for the legally binding version.',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
}

export default function ImprintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
