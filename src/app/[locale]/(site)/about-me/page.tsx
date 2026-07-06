'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { SITE_URL } from '@/app/data/site'

const AWARD_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7'] as const
const SERVICE_KEYS = ['0', '1', '2', '3', '4', '5'] as const

export default function AboutMePage() {
  const t = useTranslations('aboutMe')

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('meta.breadcrumbHome'), item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('meta.breadcrumbCurrent'),
        item: `${SITE_URL}/about-me`,
      },
    ],
  }

  const aboutPageLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE_URL}/about-me`,
    name: t('meta.title'),
    inLanguage: 'de-DE',
    mainEntity: { '@id': `${SITE_URL}#person` },
    isPartOf: { '@id': `${SITE_URL}#website` },
  }

  return (
    <main className='container mx-auto max-w-5xl px-4 py-16 md:py-24 lg:py-32'>
      <article className='prose prose-lg lg:prose-xl max-w-none'>
        <header className='mb-12'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
            {t('title')}
          </h1>
          <p className='text-lg md:text-xl text-text-secondary font-medium'>
            {t('intro.0')}
          </p>
          <p className='text-lg md:text-xl text-text-secondary'>
            {t('intro.1')}
          </p>
        </header>

        <section>
          <h2>{t('careerHeading')}</h2>
          <p>{t('career.0')}</p>
          <p>{t('career.1')}</p>
        </section>

        <section>
          <h2>{t('awardsHeading')}</h2>
          <ul>
            {AWARD_KEYS.map((key) => (
              <li key={key}>{t(`awards.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t('philosophyHeading')}</h2>
          <p>{t('philosophy.0')}</p>
          <p>{t('philosophy.1')}</p>
        </section>

        <section>
          <h2>{t('servicesHeading')}</h2>
          <ul>
            {SERVICE_KEYS.map((key) => (
              <li key={key}>{t(`services.${key}`)}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{t('locationHeading')}</h2>
          <p>{t('location.0')}</p>
          <p>
            {t('location.1')}{' '}
            <Link href='/kontakt' className='text-accent-cyan font-semibold'>
              {t('location.contactLink')}
            </Link>
            .
          </p>
        </section>
      </article>

      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }}
      />
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </main>
  )
}
