'use client'
import { Metadata } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ImpressumPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32">
      <button type='button' onClick={() => router.back()} className='btn-back'>
        ← Zurück
      </button>
      <h1 className='text-4xl font-bold mb-8'>Impressum</h1>
      <p>Natalie Zimmermann</p>
      <p>Physiotherapeutin & Personal Fitness Trainerin | body&mind</p>
      <p>Rothenbaumchaussee 156</p>
      <p>20149 Hamburg</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
      <p>Telefon: 040 53 790 578</p>
      <p>E-Mail: info@nataliezimmermann.de</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
      <p>DE270705224</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Aufsichtsbehörde</h2>
      <p>Gesundheitsamt Eimsbüttel</p>
      <p>Grindelberg 62-66</p>
      <p>20144 Hamburg</p>
      <p><a href="https://www.hamburg.de/eimsbuettel/dezernat-soziales-jugend-und-gesundheit/79970/fachamt-gesundheit/" target="_blank" rel="noopener noreferrer">https://www.hamburg.de/eimsbuettel/dezernat-soziales-jugend-und-gesundheit/79970/fachamt-gesundheit/</a></p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Redaktionell verantwortlich</h2>
      <p>Natalie Zimmermann</p>
      <p>Rothenbaumchaussee 156</p>
      <p>20149 Hamburg</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Haftungsausschluss (Disclaimer)</h2>
      <h3 className="text-xl font-semibold mt-4 mb-2">Haftung für Inhalte</h3>
      <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
      <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Haftung für Links</h3>
      <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
      <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Urheberrecht</h3>
      <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
      <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
    </div>
  )
}
