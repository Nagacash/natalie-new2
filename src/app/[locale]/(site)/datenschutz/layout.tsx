import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Natalie Zimmermann | Body & Mind Hamburg',
  description:
    'Datenschutzerklärung von Natalie Zimmermann (Body & Mind, Hamburg). Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: true, follow: true },
}

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
