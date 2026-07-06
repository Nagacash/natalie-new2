import type { Metadata } from 'next'
import React from 'react'

const SITE_URL = 'https://www.nataliezimmermann.de'

export const metadata: Metadata = {
  title: 'Kontakt – Body & Mind Studio Hamburg',
  description:
    'Kontaktieren Sie Natalie Zimmermann – Body & Mind Studio Hamburg, Rothenbaumchaussee 156, 20149 Hamburg. Telefon 040 / 53790578, E-Mail info@nataliezimmermann.de. Personal Training, Mental Coaching, Physiotherapie & Boxen in Hamburg-Harvestehude.',
  keywords: [
    'Natalie Zimmermann Kontakt',
    'Personal Trainer Hamburg Kontakt',
    'Body and Mind Studio Hamburg',
    'Termin Personal Training Hamburg',
    'Boxen Hamburg buchen',
    'Mental Coach Hamburg Termin',
  ],
  alternates: { canonical: '/kontakt' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/kontakt`,
    title: 'Kontakt – Body & Mind Studio Hamburg',
    description:
      'Body & Mind Studio Hamburg-Harvestehude – Termin vereinbaren für Personal Training, Mental Coaching, Boxen oder Physiotherapie.',
  },
  twitter: {
    card: 'summary',
    title: 'Kontakt – Body & Mind Hamburg',
    description:
      'Termin vereinbaren bei Body & Mind in Hamburg-Harvestehude.',
  },
}

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${SITE_URL}/kontakt`,
    name: 'Kontakt – Natalie Zimmermann',
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${SITE_URL}#website` },
    about: { '@id': `${SITE_URL}#localbusiness` },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kontakt',
        item: `${SITE_URL}/kontakt`,
      },
    ],
  }

  return (
    <>
      {children}
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }}
      />
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  )
}
