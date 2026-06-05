import { assetPath } from './assets.js';

export const products = [
  {
    id: 'noir-cerice',
    slug: 'noir-cerice',
    name: 'Noir Cerice',
    collection: 'Dunkle Kirsche',
    price: 129,
    sizes: [
      { label: '50 ml', price: 129 },
      { label: '100 ml', price: 169 },
    ],
    family: ['Schwarzkirsche', 'Rose', 'Ambraholz'],
    mood: 'Samt, Lack und dunkle Frucht',
    accent: 'cherry',
    world: 'dark',
    image: assetPath('/images/noir-cerice-studio.jpg'),
    imageAlt: 'Noir Cerice, rot-schwarzer Valoir Parfum Flakon',
    short: 'Ein dunkler Kirschduft mit schwarzer Rose, Ebenholz und rauchiger Ambra.',
    story:
      'Noir Cerice beginnt mit Schwarzkirsche, Himbeere und rosa Pfeffer. Im Herzen liegen schwarze Rose, Pflaume und Jasmin Sambac. Ebenholz, Vanille-Absolue, Moschus und Rauchharz geben dem Duft eine ruhige, dunkle Tiefe.',
    accordLine: 'Schwarzkirsche, schwarze Rose, Ebenholz und rauchige Ambra.',
    campaign:
      'Ein Duft wie rotes Glas auf warmer Haut: dunkel, elegant und nah.',
    accords: ['Schwarzkirsche', 'Schwarze Rose', 'Ebenholz', 'Rauchige Ambra'],
    notes: {
      Kopfnote: ['Schwarzkirsche', 'Himbeere', 'Rosa Pfeffer', 'Bergamotte'],
      Herznote: ['Schwarze Rose', 'Pflaume', 'Jasmin Sambac', 'Patchouli-Herz'],
      Basisnote: ['Schwarzes Ebenholz', 'Vanille-Absolue', 'Ambra', 'Moschus', 'Rauchharz'],
    },
    performance: {
      Intensität: 86,
      Haltbarkeit: 92,
      Sillage: 78,
    },
    whenToWear: ['Abend', 'Dinner', 'Kühle Luft', 'Besondere Momente'],
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Citronellol, Coumarin, Geraniol, Benzyl Benzoate, Benzyl Salicylate, Eugenol.',
  },
  {
    id: 'luna-solea',
    slug: 'luna-solea',
    name: 'Luna Solea',
    collection: 'Goldene Wärme',
    price: 129,
    sizes: [
      { label: '50 ml', price: 129 },
      { label: '100 ml', price: 169 },
    ],
    family: ['Pfirsich', 'Mango', 'Vanille-Amber'],
    mood: 'Goldenes Licht und cremige Wärme',
    accent: 'amber',
    world: 'solar',
    image: assetPath('/images/luna-solea-studio.jpg'),
    imageAlt: 'Luna Solea, orange-goldener Valoir Parfum Flakon',
    short: 'Ein warmer Duft aus Pfirsich, Mango, Osmanthus und cremiger Vanille-Amber.',
    story:
      'Luna Solea öffnet mit Pfirsich, Mango und Blutorange. Osmanthus, Jasmin, Iris und Zimt geben dem Duft ein weiches Herz. Vanille-Absolue, Tonka, Ambra, weißer Moschus und Guajakholz bleiben warm auf der Haut.',
    accordLine: 'Pfirsich, Mango, Osmanthus und Vanille-Amber.',
    campaign:
      'Ein Duft wie goldenes Licht: weich, sinnlich und klar.',
    accords: ['Pfirsich', 'Mango', 'Osmanthus', 'Vanille-Amber'],
    notes: {
      Kopfnote: ['Pfirsich', 'Mango-Akkord', 'Blutorange', 'Bergamotte', 'Rosa Pfeffer'],
      Herznote: [
        'Jasmin Sambac',
        'Osmanthus-Absolue',
        'Zimt CO2',
        'Amberwood',
        'Iris',
        'Heliotrope',
        'Patchouli-Herz',
      ],
      Basisnote: ['Vanille-Absolue', 'Tonka-Bohne', 'Virginisches Zedernholz', 'Ambra', 'Weißer Moschus & Ambrette', 'Guajakholz'],
    },
    performance: {
      Intensität: 78,
      Haltbarkeit: 88,
      Sillage: 72,
    },
    whenToWear: ['Goldene Stunde', 'Sommerabend', 'Warme Räume', 'Tageslicht'],
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Benzyl Salicylate, Limonene, Linalool, Coumarin, Citral, Benzyl Alcohol, Farnesol, Geraniol.',
  },
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function getSizePrice(product, size = '50 ml') {
  return product.sizes.find((entry) => entry.label === size)?.price || product.price;
}
