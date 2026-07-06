import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { headerNavLinks, mobileNavLinks } from '@/app/data/nav'
import { aboutdata } from '@/app/types/aboutdata'
import { workdata } from '@/app/types/workdata'
import { featureddata } from '@/app/types/featureddata'
import { testimonials } from '@/app/types/testimonials'
import { articles } from '@/app/types/articles'
import { footerlinks } from '@/app/types/footerlinks'

// header nav-links data
const headerData: HeaderItem[] = headerNavLinks

// mobile header nav-links data
const mobileHeaderData: HeaderItem[] = mobileNavLinks

// about data (legacy – section content is static in AboutUs)
const Aboutdata: aboutdata[] = []

// work-data
const WorkData: workdata[] = [
  {
    profession: 'Mental Coach, Speaker, Influencer, Profiboxerin, Personal Trainer, Physiotherapeutin. Spezialisiert auf Manuelle Therapie und Leistungssportler. Faszienexpertin und Lu Jong Yoga Lehrerin. Mentalcoach mit Schwerpunkt Wingwave. Leidenschaftliche Kampfsportlerin seit 22 Jahren.',
    name: 'Natalie',
    imgSrc: '/images/wework/coach1-team.webp',
  },
  {
    profession: 'Bachelor of Arts in Fitnessökonomie. Zertifizierter Trainer (B- und A-Lizenz), Ernährungsberater und Athletiktrainer (B-Lizenz). Bietet EMS-Training an. Ehemaliger semi-professioneller Fußballspieler, jetzt Fußballcoach, Box- und Kickboxen-Coach.',
    name: 'Jerry',
    imgSrc: '/images/wework/coach2-team.webp',
  },
  {
    profession: 'Ernährungswissenschaftler (B.Sc.), M.Sc. in Ernährung und Sport. Dozent an der Macromedia Hochschule. Über zehn Jahre Erfahrung als Personal Trainer mit Zusatzqualifikationen als Functionaltrainer. Sportliche Erfahrungen in Karate, Fußball, Leistungsturnen, Kickboxen, Boxen, Thaiboxen, Grappling, BJJ und MMA.',
    name: 'Juri',
    imgSrc: '/images/wework/coach3-team.webp',
  },
]

// featured data
const FeaturedData: featureddata[] = [
  {
    heading: '',
    imgSrc: '/images/featured/box1.webp',
  },
  {
    heading: '',
    imgSrc: '/images/featured/box2.webp',
  },
]

// plans data
const PlansData = [
  {
    heading: 'Powerworkout 2 Times a Week',
    price: {
      monthly: 19,
      yearly: 190,
    },
    user: 'pro Monat',
    features: [
      '2 Trainingseinheiten pro Woche',
      'Individueller Trainingsplan',
      'Ernährungsberatung (Basis)',
      'Zugang zur Community',
      'E-Mail-Support',
    ],
  },
  {
    heading: '4 Times a Week',
    price: {
      monthly: 29,
      yearly: 290,
    },
    user: 'pro Monat',
    features: [
      '4 Trainingseinheiten pro Woche',
      'Fortgeschrittener Trainingsplan',
      'Detaillierte Ernährungsberatung',
      'Premium Community Zugang',
      'Priorisierter E-Mail-Support',
    ],
  },
  {
    heading: 'Jeden Tag Trainieren',
    price: {
      monthly: 59,
      yearly: 590,
    },
    user: 'pro Monat',
    features: [
      'Tägliche Trainingseinheiten',
      'Maßgeschneiderter Elite-Trainingsplan',
      'Umfassende Ernährungs- und Lebensstilberatung',
      'Exklusiver 1-zu-1 Coaching-Zugang',
      '24/7 WhatsApp Support',
    ],
  },
]

// testimonial data
const TestimonialsData: testimonials[] = [
  {
    name: 'FATI',
    profession: 'AMATEUR BOXER',
    comment:
      'Kann ich nur weiter empfehlen,danke für die nette Beratung,die besten personal Trainer aus Hamburg sind hier zu finden !!',
    imgSrc: '/images/testimonial/user1.svg',
    rating: 5,
  },
  {
    name: 'EINSTÜCKMAXIKA',
    profession: 'STUDENTIN',
    comment:
      'Mein Vater und ich waren vor unserer Kilimandscharoreise fünf mal beim Höhentraining, um uns bestmöglich auf die extreme Höhe vorzubereiten.',
    imgSrc: '/images/testimonial/user2.svg',
    rating: 4,
  },
  {
    name: 'DEMET A',
    profession: 'VATER',
    comment:'Kann ich nur weiterempfehlen! Seit 8 Wochen trainiere ich mit Natalie. Beide sind absolute Profis auf ihrem Gebiet und man merkt ihnen an, dass sie ihre Passion gefunden haben, was mich total motiviert.',
    imgSrc: '/images/testimonial/user3.svg',
    rating: 4,
  },
  {
    name: 'RobertA Foxy',
    profession: 'MUTTER',
    comment:
      'SUPER !! ',
    imgSrc: '/images/testimonial/user1.svg',
    rating: 4,
  },
  {
    name: 'Leslie Alexander',
    profession: 'CEO, Parkview Int.Ltd',
    comment:
      'Seit 8 Wochen trainiere ich mit Natalie und Eugen mindestens einmal die Woche und will es nicht mehr missen. Selbst wenn ich vor dem Training gestresst und müde bin - danach fühle ich mich grandios und gleichzeitig ausgepowert und voller Energie. Beide sind absolute Profis auf ihrem Gebiet und man merkt ihnen an, dass sie ihre Passion gefunden haben, was mich total motiviert.',
    imgSrc: '/images/testimonial/user2.svg',
    rating: 4,
  },
  {
    name: 'ENRICO Fisher',
    profession: 'ARBEITER',
    comment:
      'ZU GUT DAS GANZE, UNBEDINGT BUCHEN :)',
    imgSrc: '/images/testimonial/user3.svg',
    rating: 4,
  },
]

// artical data
const ArticlesData: articles[] = [
  {
    time: 'Jetzt anfragen',
    heading: 'FLOW',
    heading2: 'Box & Kickboxen',
    name: 'Bewegung als mentales Ventil. FLOW verbindet Boxen und Kickboxen zu intensiver körperlicher und mentaler Entlastung – Stress abbauen, Energie freisetzen, Fokus finden.',
    date: '2025',
    imgSrc: '/images/dedicated/sab5.webp',
    width: 200,
    height: 200,
  },
  {
    time: 'Jetzt anfragen',
    heading: 'FORM',
    heading2: 'Kraft & Performance Coaching',
    name: 'FORM ist individuelles Performance Coaching für Menschen, die ihren Körper gezielt stärken und langfristig belastbarer werden möchten. Durch funktionelles Training, Athletiktraining und persönliche Betreuung entsteht mehr Kraft, Stabilität und körperliche Leistungsfähigkeit.',
    date: '2025',
    imgSrc: '/images/articles/nat3.webp',
    width: 200,
    height: 200,
  },
  {
    time: 'Jetzt anfragen',
    heading: 'Recovery',
    heading2: 'Regeneration & IHHT',
    name: 'Regeneration für Körper und Nervensystem. IHHT-Training, ATP-Atmung und regenerative Methoden für Erholung, Energie und Balance.',
    date: '2025',
    imgSrc: '/images/dedicated/sab2.webp',
    width: 200,
    height: 200,
  },

]

// footer links data
const FooterLinksData: footerlinks[] = [
  {
    section: 'Menu',
    links: headerData
  },
  {
    section: 'Others',
    links: [
      { label: 'Über mich', href: '/about-me' },
      { label: 'Leistungen', href: '/#Blog' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'FLOW', href: '/#Flow' },
      { label: 'Recovery', href: '/#Recovery' },
    ]
  },
  {
    section: 'Partners',
    links: [
      { label: 'Mesoskin', href: 'https://www.mesoskin-hamburg.com' },
    ]
  }
]

export const GET = () => {
  return NextResponse.json({
    headerData,
    mobileHeaderData,
    Aboutdata,
    WorkData,
    FeaturedData,
    PlansData,
    TestimonialsData,
    ArticlesData,
    FooterLinksData,
  })
}
