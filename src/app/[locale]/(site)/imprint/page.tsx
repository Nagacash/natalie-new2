import React from 'react';

const ImprintPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Impressum</h1>
      <div className="prose lg:prose-xl">
        <p>Angaben gemäß § 5 TMG</p>
        <p>
          Natalie Zimmermann<br />
          Musterstraße 111<br />
          12345 Musterstadt
        </p>
        <p>
          <strong>Vertreten durch:</strong><br />
          Natalie Zimmermann
        </p>
        <p>
          <strong>Kontakt:</strong><br />
          Telefon: +49 (0) 123 456789<br />
          E-Mail: <a href="mailto:kontakt@nataliezimmermann.de">kontakt@nataliezimmermann.de</a>
        </p>
        <p>
          <strong>Umsatzsteuer-ID:</strong><br />
          Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:<br />
          DE123456789
        </p>
        <p>
          <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
          Natalie Zimmermann<br />
          Musterstraße 111<br />
          12345 Musterstadt
        </p>
      </div>
    </div>
  );
};

export default ImprintPage;