import { Documentation } from '@/app/components/Documentation/Documentation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dokumentation – Natalie Zimmermann | Body & Mind Hamburg',
  description:
    'Dokumentation und Hintergrundinformationen zu Natalie Zimmermann, Body & Mind Hamburg, Trainingsmethoden und Coaching-Ansätzen.',
  alternates: { canonical: '/documentation' },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <>
      <Documentation />
    </>
  )
}
