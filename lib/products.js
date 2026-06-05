import { assetPath } from './assets.js';

export const products = [
  {
    id: 'noir-cerice',
    slug: 'noir-cerice',
    name: 'Noir Cerice',
    collection: 'Shadow lacquer',
    price: 129,
    sizes: [
      { label: '50 ml', price: 129 },
      { label: '100 ml', price: 169 },
    ],
    family: ['Dark cherry', 'Floral smoke', 'Amber woods'],
    mood: 'Black lacquer, velvet night and cherry heat',
    accent: 'ruby',
    world: 'dark',
    image: assetPath('/images/noir-cerice.jpg'),
    imageAlt: 'Noir Cerice red and black Valoir fragrance bottle',
    short: 'A lacquered cherry fragrance pulled through black rose, ebony and smoked amber.',
    story:
      'Noir Cerice opens like red glass in a dark room: black cherry, raspberry and pink pepper flash first, then sink into black rose, plum and jasmine sambac. Ebony, vanilla absolute, musk and smoke resin leave a polished shadow on the skin.',
    accordLine: 'Dark cherry cut with black rose, ebony and smoked amber.',
    campaign:
      'Velvet, mirror and smoke. Noir Cerice is made for after-dark presence: close, polished, difficult to forget.',
    accords: ['Black Cherry', 'Black Rose', 'Ebony', 'Smoked Amber'],
    notes: {
      Top: ['Black cherry', 'Raspberry', 'Pink pepper', 'Bergamot'],
      Heart: ['Black rose', 'Plum', 'Jasmine sambac', 'Purified patchouli heart'],
      Base: ['Black ebony', 'Vanilla absolute', 'Amber', 'Musk', 'Smoke resin'],
    },
    performance: {
      Intensity: 86,
      Longevity: 92,
      Sillage: 78,
    },
    whenToWear: ['After dark', 'Dinner rooms', 'Velvet evenings', 'Cold air'],
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Citronellol, Coumarin, Geraniol, Benzyl Benzoate, Benzyl Salicylate, Eugenol.',
  },
  {
    id: 'luna-solea',
    slug: 'luna-solea',
    name: 'Luna Solea',
    collection: 'Solar amber',
    price: 129,
    sizes: [
      { label: '50 ml', price: 129 },
      { label: '100 ml', price: 169 },
    ],
    family: ['Golden fruit', 'Creamy amber', 'Soft woods'],
    mood: 'Amber light, ripe fruit and sun-warmed skin',
    accent: 'amber',
    world: 'solar',
    image: assetPath('/images/luna-solea.jpg'),
    imageAlt: 'Luna Solea orange and gold Valoir fragrance bottle',
    short: 'A golden fragrance of peach, mango, osmanthus and creamy vanilla amber.',
    story:
      'Luna Solea moves like heat on skin. Peach, mango and blood orange glow at the opening before osmanthus, jasmine, iris and cinnamon CO2 turn the light creamy. Vanilla absolute, tonka, amber, white musk and guaiac wood leave a soft solar trail.',
    accordLine: 'Peach and mango warmed by osmanthus, vanilla and amber.',
    campaign:
      'A low sun over polished skin. Luna Solea is radiant without glare: fruit, cream, warmth and a long amber finish.',
    accords: ['Peach', 'Mango', 'Osmanthus', 'Vanilla Amber'],
    notes: {
      Top: ['Peach', 'Mango accord', 'Blood orange', 'Bergamot', 'Pink pepper'],
      Heart: [
        'Jasmine sambac',
        'Osmanthus absolute',
        'Cinnamon CO2',
        'Amberwood',
        'Iris',
        'Heliotrope',
        'Purified patchouli heart',
      ],
      Base: ['Vanilla absolute', 'Tonka bean', 'Virginian cedarwood', 'Amber', 'White musk & ambrette', 'Guaiac wood'],
    },
    performance: {
      Intensity: 78,
      Longevity: 88,
      Sillage: 72,
    },
    whenToWear: ['Golden hour', 'Late summer nights', 'Bare shoulders', 'Warm interiors'],
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
