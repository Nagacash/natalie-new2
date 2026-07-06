import type { Metadata } from 'next'
import React from 'react'

const SITE_URL = 'https://www.nataliezimmermann.de'

export const metadata: Metadata = {
  title: 'Impressum – Natalie Zimmermann | Body & Mind Hamburg',
  description:
    'Impressum von Natalie Zimmermann – Physiotherapeutin & Personal Fitness Trainerin, Body & Mind, Rothenbaumchaussee 156, 20149 Hamburg. Angaben gemäß § 5 TMG.',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
}

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
