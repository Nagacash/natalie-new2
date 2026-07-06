import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy – Natalie Zimmermann',
  description:
    'English privacy notice. The legally binding version is the German Datenschutzerklärung.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
