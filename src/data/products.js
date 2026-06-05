import noirImage from '../assets/noir-cerice.jpg';
import lunaImage from '../assets/luna-solea.jpg';

export const products = [
  {
    id: 'noir-cerice',
    slug: 'noir-cerice',
    name: 'Noir Cerice',
    subtitle: 'Dunkle Kirsche. Schwarze Rose. Rauchige Ambra.',
    price: 129,
    volume: '50 ml Eau de Parfum',
    image: noirImage,
    imageAlt: 'Noir Cerice Parfumflakon in Rot und Schwarz',
    shortDescription:
      'Ein dunkler, verführerischer Kirschduft mit schwarzer Rose, Ebenholz, Vanille und rauchiger Ambra.',
    longDescription:
      'Noir Cerice beginnt saftig und tief, fast wie eine reife Kirsche im Schatten. Im Herzen entsteht eine dunkle florale Spannung aus schwarzer Rose, Pflaume und Jasmin Sambac. Die Basis legt sich weich, warm und leicht rauchig auf die Haut.',
    family: 'Fruchtig, floral, amber',
    mood: 'Verführerisch, tief, abendlich',
    accent: 'ruby',
    accords: ['Schwarzkirsche', 'Schwarze Rose', 'Ebenholz', 'Vanille', 'Rauchharz'],
    notes: {
      Kopfnote: ['Schwarzkirsche', 'Himbeere', 'Rosa Pfeffer', 'Bergamotte'],
      Herznote: ['Schwarze Rose', 'Pflaume', 'Jasmin Sambac', 'Gereinigtes Patchouli Herz'],
      Basisnote: ['Schwarzes Ebenholz', 'Vanille-Absolue', 'Ambra', 'Moschus', 'Rauchharz'],
    },
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Citronellol, Coumarin. Platzhalter für finale INCI-Angaben.',
  },
  {
    id: 'luna-solea',
    slug: 'luna-solea',
    name: 'Luna Solea',
    subtitle: 'Goldene Frucht. Cremige Wärme. Strahlende Ambra.',
    price: 129,
    volume: '50 ml Eau de Parfum',
    image: lunaImage,
    imageAlt: 'Luna Solea Parfumflakon in Orange und Gold',
    shortDescription:
      'Ein goldener, cremig-warmer Duft mit Pfirsich, Mango, Blutorange, Osmanthus, Zimt, Vanille und Ambra.',
    longDescription:
      'Luna Solea öffnet hell und saftig, bevor sich Osmanthus, Zimt und Iris zu einer cremigen Sonnenwärme verbinden. Vanille, Tonka und Ambra geben dem Duft eine leuchtende, weiche Signatur.',
    family: 'Fruchtig, cremig, holzig',
    mood: 'Warm, sinnlich, strahlend',
    accent: 'amber',
    accords: ['Pfirsich', 'Mango', 'Osmanthus', 'Vanille', 'Ambra'],
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
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Benzyl Salicylate, Limonene, Linalool, Coumarin. Platzhalter für finale INCI-Angaben.',
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}
