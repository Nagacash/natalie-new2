import type { Metadata } from 'next'
import '../globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { manrope } from '@/app/fonts'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'
import BackgroundAmbience from '@/app/components/BackgroundAmbience'
import Aoscompo from '@/utils/aos'
import { SITE_URL, socialShareImageMetadata } from '@/app/data/site'
import { Analytics } from '@vercel/analytics/next'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === 'en'

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isEn
        ? 'Natalie Zimmermann – Boxing World Champion, Speaker & Mental Coach in Hamburg'
        : 'Natalie Zimmermann – Box-Weltmeisterin, Speakerin & Mental Coach in Hamburg',
      template: isEn
        ? '%s | Natalie Zimmermann – Hamburg'
        : '%s | Natalie Zimmermann – Hamburg',
    },
    description: isEn
      ? 'Natalie Zimmermann – professional boxing world champion, speaker, mental coach, physical therapist & personal trainer in Hamburg-Harvestehude. Body & Mind Studio, Rothenbaumchaussee 156, 20149 Hamburg.'
      : 'Natalie Zimmermann – Profibox-Weltmeisterin, Speakerin, Mental Coach, Physiotherapeutin & Personal Trainerin in Hamburg-Harvestehude. Body & Mind Studio, Rothenbaumchaussee 156, 20149 Hamburg.',
    applicationName: 'Natalie Zimmermann',
    authors: [{ name: 'Natalie Zimmermann', url: SITE_URL }],
    keywords: isEn
      ? [
          'Natalie Zimmermann',
          'Boxing World Champion',
          'Personal Trainer Hamburg',
          'Mental Coach Hamburg',
          'Speaker Hamburg',
          'Physical Therapy Hamburg',
          'Boxing Hamburg',
          'Body and Mind Studio Hamburg',
        ]
      : [
          'Natalie Zimmermann',
          'Box Weltmeisterin',
          'Personal Trainer Hamburg',
          'Mental Coach Hamburg',
          'Speakerin Hamburg',
          'Physiotherapie Hamburg',
          'Boxen Hamburg',
          'Body and Mind Hamburg',
        ],
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'de_DE',
      url: isEn ? `${SITE_URL}/en` : SITE_URL,
      siteName: isEn
        ? 'Natalie Zimmermann – Body & Mind Hamburg'
        : 'Natalie Zimmermann – Body & Mind Hamburg',
      title: isEn
        ? 'Natalie Zimmermann – Boxing World Champion, Speaker & Mental Coach in Hamburg'
        : 'Natalie Zimmermann – Box-Weltmeisterin, Speakerin & Mental Coach in Hamburg',
      description: isEn
        ? 'Professional boxing world champion, speaker, mental coach & personal trainer in Hamburg. Body & Mind Studio in Harvestehude.'
        : 'Profibox-Weltmeisterin, Speakerin, Mental Coach & Personal Trainerin in Hamburg. Body & Mind Studio in Harvestehude.',
      images: [socialShareImageMetadata],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn
        ? 'Natalie Zimmermann – Boxing World Champion, Speaker & Mental Coach Hamburg'
        : 'Natalie Zimmermann – Box-Weltmeisterin, Speakerin & Mental Coach Hamburg',
      description: isEn
        ? 'Professional boxing world champion, speaker, mental coach & personal trainer in Hamburg.'
        : 'Profibox-Weltmeisterin, Speakerin, Mental Coach & Personal Trainerin in Hamburg.',
      images: [socialShareImageMetadata.url],
      creator: '@nataliezimmermann',
    },
    alternates: {
      canonical: isEn ? '/en' : '/',
      languages: {
        de: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    icons: {
      icon: [{ url: '/icon.png', type: 'image/png', sizes: '32x32' }],
      shortcut: '/icon.png',
      apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: 'Natalie Zimmermann – Body & Mind',
    alternateName: 'Body & Mind by Natalie Zimmermann',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/logo.svg`,
    image: `${SITE_URL}/images/hero/natalie.webp`,
    email: 'info@nataliezimmermann.de',
    telephone: '+49-40-53790578',
    description:
      locale === 'en'
        ? 'Body & Mind by Natalie Zimmermann – personal training, mental coaching, physical therapy, boxing, and speaking in Hamburg-Harvestehude.'
        : 'Body & Mind by Natalie Zimmermann – Personal Training, Mental Coaching, Physiotherapie, Boxen und Vorträge in Hamburg-Harvestehude.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rothenbaumchaussee 156',
      addressLocality: 'Hamburg',
      addressRegion: 'HH',
      postalCode: '20149',
      addressCountry: 'DE',
    },
    sameAs: [
      'https://www.facebook.com/natalie.zimmermann.94',
      'https://www.instagram.com/nataliezimmermann_ger/',
      'https://tiktok.com/@nataliezimmermann',
    ],
  }

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: 'Natalie Zimmermann – Body & Mind Hamburg',
    inLanguage: locale === 'en' ? 'en-US' : 'de-DE',
    publisher: { '@id': `${SITE_URL}#organization` },
  }

  return (
    <html lang={locale === 'en' ? 'en-US' : 'de-DE'} suppressHydrationWarning>
      <head>
        <meta name='theme-color' content='#37BEF0' />
        <meta name='geo.region' content='DE-HH' />
        <meta name='geo.placename' content='Hamburg, Harvestehude' />
        <meta name='geo.position' content='53.578612;9.987175' />
        <meta name='ICBM' content='53.578612, 9.987175' />
        <script
          type='application/ld+json'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type='application/ld+json'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className={`${manrope.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Aoscompo>
            <Header />
            <div className='flex-grow'>{children}</div>
            <Footer />
          </Aoscompo>
          <ScrollToTop />
          <BackgroundAmbience />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
