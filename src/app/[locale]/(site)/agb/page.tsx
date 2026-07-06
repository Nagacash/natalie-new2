import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGB – Natalie Zimmermann | Body & Mind Hamburg',
  description:
    'Allgemeine Geschäftsbedingungen (AGB) von Natalie Zimmermann – Body & Mind, Hamburg. Geltungsbereich, Vertragsschluss, Preise, Widerrufsrecht und Haftung.',
  alternates: { canonical: '/agb' },
  robots: { index: true, follow: true },
};

const AGBPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Allgemeine Geschäftsbedingungen (AGB)</h1>
      <div className="prose lg:prose-xl">
        <h2>1. Geltungsbereich</h2>
        <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die über die Website www.nataliezimmermann.de zwischen Natalie Zimmermann (nachfolgend "Anbieter") und ihren Kunden (nachfolgend "Kunde") geschlossen werden.</p>
        
        <h2>2. Vertragsgegenstand</h2>
        <p>Der Anbieter bietet Coaching-Dienstleistungen, Speaker-Auftritte und den Verkauf von Merchandise-Artikeln an. Der genaue Umfang der Leistungen ergibt sich aus der jeweiligen Produktbeschreibung auf der Website.</p>

        <h2>3. Vertragsschluss</h2>
        <p>Die Darstellung der Produkte auf der Website stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Abgabe einer Bestellung dar. Durch Anklicken des Bestell-Buttons gibt der Kunde eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Der Vertrag kommt zustande, wenn der Anbieter die Bestellung des Kunden durch eine Auftragsbestätigung per E-Mail annimmt.</p>

        <h2>4. Preise und Zahlungsbedingungen</h2>
        <p>Alle Preise sind Endpreise in Euro und enthalten die gesetzliche Umsatzsteuer. Die Zahlung erfolgt per Vorkasse, PayPal oder Kreditkarte. Die Belastung des Kontos des Kunden erfolgt mit Abschluss der Bestellung.</p>

        <h2>5. Lieferung und Versand</h2>
        <p>Die Lieferung von Waren erfolgt an die vom Kunden angegebene Lieferanschrift. Die Lieferzeit beträgt in der Regel 3-5 Werktage. Bei digitalen Inhalten erfolgt die Bereitstellung per Download-Link.</p>

        <h2>6. Widerrufsrecht</h2>
        <p>Dem Kunden steht ein gesetzliches Widerrufsrecht zu. Die Einzelheiten hierzu sind der Widerrufsbelehrung zu entnehmen, die auf der Website gesondert zur Verfügung gestellt wird.</p>

        <h2>7. Haftung</h2>
        <p>Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit. Für einfache Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.</p>

        <h2>8. Datenschutz</h2>
        <p>Der Schutz der personenbezogenen Daten des Kunden hat für den Anbieter höchste Priorität. Alle Informationen hierzu finden sich in der Datenschutzerklärung auf der Website.</p>

        <h2>9. Schlussbestimmungen</h2>
        <p>Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so wird hierdurch die Gültigkeit der übrigen Bestimmungen nicht berührt. Anstelle der unwirksamen Bestimmung treten die gesetzlichen Vorschriften.</p>
      </div>
    </div>
  );
};

export default AGBPage;
