export const products = [
  {
    id: 'noir-cerice',
    slug: 'noir-cerice',
    name: 'Noir Cerice',
    collection: 'The Shadow Signature',
    price: 129,
    sizes: ['50 ml', '100 ml'],
    family: ['Dark', 'Fruity', 'Floral', 'Amber'],
    mood: 'Seduction, shadow and velvet warmth',
    accent: 'ruby',
    image: '/images/noir-cerice.jpg',
    imageAlt: 'Noir Cerice red and black Valoir fragrance bottle',
    short:
      'Dark cherry, black rose and smoked amber. A fragrance built around seduction, shadow and velvet warmth.',
    story:
      'Noir Cerice opens with lacquered black cherry and a breath of pink pepper before falling into black rose, plum and jasmine. Ebony, vanilla absolute and smoked resin leave a velvet-dark trail close to the skin.',
    accords: ['Black cherry', 'Black rose', 'Ebony', 'Vanilla absolute', 'Smoked amber'],
    notes: {
      Top: ['Black cherry', 'Raspberry', 'Pink pepper', 'Bergamot'],
      Heart: ['Black rose', 'Plum', 'Jasmin Sambac', 'Purified patchouli heart'],
      Base: ['Black ebony', 'Vanilla absolute', 'Amber', 'Musk', 'Smoke resin'],
    },
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Linalool, Limonene, Citronellol, Coumarin. Placeholder for final INCI declaration.',
  },
  {
    id: 'luna-solea',
    slug: 'luna-solea',
    name: 'Luna Solea',
    collection: 'The Solar Signature',
    price: 129,
    sizes: ['50 ml', '100 ml'],
    family: ['Warm', 'Fruity', 'Amber', 'Woody'],
    mood: 'Radiance, soft warmth and elegant depth',
    accent: 'amber',
    image: '/images/luna-solea.jpg',
    imageAlt: 'Luna Solea orange and gold Valoir fragrance bottle',
    short:
      'Golden peach, mango, osmanthus and creamy amber. A radiant composition with soft warmth and elegant depth.',
    story:
      'Luna Solea glows from the first spray: peach, mango and blood orange suspended over osmanthus, cinnamon CO₂ and iris. Vanilla absolute, tonka, cedar and amber settle into a creamy solar trail.',
    accords: ['Golden peach', 'Mango accord', 'Osmanthus', 'Vanilla', 'Amberwood'],
    notes: {
      Top: ['Peach', 'Mango accord', 'Blood orange', 'Bergamot', 'Pink pepper'],
      Heart: [
        'Jasmin Sambac',
        'Osmanthus absolute',
        'Cinnamon CO₂',
        'Amberwood',
        'Iris',
        'Heliotrope',
        'Purified patchouli heart',
      ],
      Base: ['Vanilla absolute', 'Tonka bean', 'Virginian cedarwood', 'Amber', 'White musk & ambrette', 'Guaiac wood'],
    },
    ingredients:
      'Alcohol Denat., Parfum, Aqua, Benzyl Salicylate, Limonene, Linalool, Coumarin. Placeholder for final INCI declaration.',
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

export const serviceNotes = [
  'Complimentary shipping over 100€',
  'Secure payment',
  'Crafted fragrance DNA',
  'Private launch access',
];
