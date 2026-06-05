export const infoPages = {
  contact: {
    title: 'Kontakt',
    eyebrow: 'Studio',
    intro: 'Für Bestellungen, Presseanfragen und persönliche Beratung erreichst du das Valoir Studio direkt.',
    details: [
      ['E-Mail', 'studio@valoir.parfum'],
      ['Kundenservice', 'Montag bis Freitag, 10:00-18:00 Uhr MEZ'],
      ['Beratung', 'Wir unterstützen bei Duftauswahl, Geschenkverpackung und Versandfragen.'],
    ],
  },
  shipping: {
    title: 'Versand',
    eyebrow: 'Lieferung',
    intro: 'Valoir Bestellungen werden sorgfältig vorbereitet und innerhalb von 2-4 Werktagen versendet.',
    details: [
      ['Kostenfrei', 'Der Versand ist ab 100 € Bestellwert kostenfrei.'],
      ['Verpackung', 'Jeder Flakon wird geschützt verpackt und kann als Geschenk vorbereitet werden.'],
      ['Sendung', 'Die Sendungsverfolgung wird nach Übergabe an den Versanddienst gesendet.'],
    ],
  },
  returns: {
    title: 'Rückgabe',
    eyebrow: 'Service',
    intro: 'Versiegelte Düfte können innerhalb von 14 Tagen nach Zustellung zurückgegeben werden.',
    details: [
      ['Zustand', 'Produkte müssen ungeöffnet, unbenutzt und in Originalverpackung sein.'],
      ['Frist', 'Rückgabeanfragen sind innerhalb von 14 Tagen nach Zustellung möglich.'],
      ['Ablauf', 'Das Studio begleitet jede bestätigte Rückgabe per E-Mail.'],
    ],
  },
  privacy: {
    title: 'Datenschutz',
    eyebrow: 'Daten',
    intro: 'Valoir nutzt Kundendaten nur für Bestellung, Service und ausdrücklich gewünschte Updates.',
    details: [
      ['Bestellungen', 'Bestelldaten werden für Abwicklung, Zahlung und Kundenservice genutzt.'],
      ['Newsletter', 'E-Mails werden nur nach Zustimmung gesendet und können jederzeit abbestellt werden.'],
      ['Sicherheit', 'Zahlungsdaten werden im späteren Live-Betrieb durch den angebundenen Zahlungsanbieter verarbeitet.'],
    ],
  },
  imprint: {
    title: 'Impressum',
    eyebrow: 'Valoir Parfum',
    intro: 'Valoir Parfum ist als eigenständiges Duft- und Commerce-Konzept angelegt.',
    details: [
      ['Marke', 'Valoir Parfum'],
      ['Kontakt', 'studio@valoir.parfum'],
      ['Verantwortung', 'Verantwortlicher Kontakt für diese digitale Präsenz: studio@valoir.parfum.'],
    ],
  },
};

export function getInfoPage(slug) {
  return infoPages[slug];
}
