export const dtcTopBarItems = [
  'Kostenloser Versand ab 100 €',
  'Geschenkverpackung verfügbar',
  'Sichere Zahlung',
  '10 % für Newsletter-Anmeldung',
];

export const dtcServices = [
  ['Kostenloser Versand', 'Ab 100 € Bestellwert innerhalb Deutschlands.'],
  ['Geschenkverpackung', 'Jeder Flakon kann als Geschenk vorbereitet werden.'],
  ['Sichere Zahlung', 'Der Checkout wird über Stripe geöffnet und verarbeitet.'],
  ['Rückgabe', 'Ungeöffnete Düfte können innerhalb von 14 Tagen zurückgegeben werden.'],
];

export const dtcFilters = ['Alle', 'Fruchtig', 'Warm', 'Dunkel', 'Amber'];

export const dtcProfiles = {
  'noir-cerice': {
    atmosphere: 'Dunkel. Fruchtig. Rauchig.',
    landingLine: 'Dunkle Kirsche. Samtige Tiefe. Rauchige Wärme.',
    detailDescription:
      'Noir Cerice eröffnet mit intensiver Schwarzkirsche, saftiger Himbeere und einem feinen Prickeln von rosa Pfeffer. Im Herzen entfalten sich schwarze Rose, Pflaume und Jasmin Sambac zu einer dunklen, floralen Tiefe. Ebenholz, Vanille-Absolue, Ambra, Moschus und ein Hauch Rauchharz hinterlassen eine warme, magnetische Spur.',
    filters: ['Fruchtig', 'Dunkel'],
    profile: {
      Intensität: 86,
      Haltbarkeit: 92,
      Sillage: 78,
    },
    occasions: ['Abend', 'Dinner', 'Kühle Luft', 'Besondere Momente'],
    notes: {
      Kopfnote: ['Schwarzkirsche', 'Himbeere', 'Rosa Pfeffer', 'Bergamotte'],
      Herznote: ['Schwarze Rose', 'Pflaume', 'Jasmin Sambac', 'Gereinigtes Patchouli Herz'],
      Basisnote: ['Schwarzes Ebenholz', 'Vanille-Absolue', 'Ambra', 'Moschus', 'Rauchharz'],
    },
  },
  'luna-solea': {
    atmosphere: 'Golden. Warm. Cremig.',
    landingLine: 'Goldene Frucht. Cremige Wärme. Leuchtende Präsenz.',
    detailDescription:
      'Luna Solea beginnt saftig und leuchtend mit Pfirsich, Mango, Blutorange und Bergamotte. Im Herzen entsteht durch Jasmin Sambac, Osmanthus, Zimt, Amberwood und Iris eine warme, goldene Tiefe. Vanille-Absolue, Tonka-Bohne, Zedernholz, Ambra, Moschus und Guajakholz bilden eine cremige, elegante Basis.',
    filters: ['Fruchtig', 'Warm', 'Amber'],
    profile: {
      Intensität: 78,
      Haltbarkeit: 88,
      Sillage: 72,
    },
    occasions: ['Tageslicht', 'Goldene Stunde', 'Sommerabend', 'Warme Räume'],
    notes: {
      Kopfnote: ['Pfirsich', 'Mango Akkord', 'Blutorange', 'Bergamotte', 'Rosa Pfeffer'],
      Herznote: [
        'Jasmin Sambac',
        'Osmanthus Absolue',
        'Zimt CO₂',
        'Amberwood',
        'Iris',
        'Heliotrop',
        'Gereinigtes Patchouli Herz',
      ],
      Basisnote: [
        'Vanille Absolue',
        'Tonka-Bohne',
        'Zedernholz Virginiana',
        'Ambra',
        'Weißer Moschus & Ambrette',
        'Guajakholz',
      ],
    },
  },
};

export const dtcFaq = [
  ['Wie lange dauert der Versand?', 'Bestellungen werden innerhalb von 2-4 Werktagen vorbereitet und versendet.'],
  [
    'Kann ich ungeöffnete Düfte zurückgeben?',
    'Ja. Ungeöffnete und unbenutzte Düfte können innerhalb von 14 Tagen nach Zustellung zurückgegeben werden.',
  ],
  ['Gibt es Geschenkverpackung?', 'Ja. Für beide Größen ist eine hochwertige Geschenkverpackung vorgesehen.'],
  ['Wie erhalte ich meinen Newsletter-Rabatt?', 'Nach der Anmeldung erhältst du deinen Code für 10 % auf die erste Bestellung.'],
];

export const dtcValues = [
  ['Präsenz', 'Düfte, die nicht laut sein müssen und dennoch bleiben.'],
  ['Tiefe', 'Kontraste aus Frucht, Holz, Wärme und klaren Akzenten.'],
  ['Eleganz', 'Reduktion in Form, Sprache und Produktinszenierung.'],
  ['Duftkunst', 'Kompositionen mit sinnlicher Struktur und moderner Ruhe.'],
];
