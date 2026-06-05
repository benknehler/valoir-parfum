export const infoPages = {
  contact: {
    title: 'Contact',
    eyebrow: 'Studio',
    intro: 'For orders, press and private appointments, reach the Valoir studio directly.',
    details: [
      ['Email', 'studio@valoir.parfum'],
      ['Client care', 'Monday to Friday, 10:00-18:00 CET'],
      ['Private list', 'Early access is reserved for subscribers.'],
    ],
  },
  shipping: {
    title: 'Shipping',
    eyebrow: 'Delivery',
    intro: 'Valoir orders are prepared with care and shipped from the studio within 2-4 business days.',
    details: [
      ['Complimentary', 'Shipping is complimentary from 100€.'],
      ['Packaging', 'Each bottle is protected and eligible for gift wrapping.'],
      ['Tracking', 'Tracking details are sent as soon as the parcel leaves the studio.'],
    ],
  },
  returns: {
    title: 'Returns',
    eyebrow: 'Client care',
    intro: 'Sealed fragrances may be returned within 14 days of delivery.',
    details: [
      ['Condition', 'Products must be unopened, unused and in original packaging.'],
      ['Return window', 'Return requests can be made within 14 days of delivery.'],
      ['Support', 'The studio will guide each approved return by email.'],
    ],
  },
  privacy: {
    title: 'Privacy',
    eyebrow: 'Data',
    intro: 'Valoir only uses client information to process orders, support service requests and send requested updates.',
    details: [
      ['Orders', 'Order data is used for fulfilment, payment handling and client support.'],
      ['Newsletter', 'Email updates are sent only after consent and can be unsubscribed at any time.'],
      ['Security', 'Secure payment data is handled by the selected payment provider in production.'],
    ],
  },
  imprint: {
    title: 'Imprint',
    eyebrow: 'Maison',
    intro: 'Valoir Parfum is presented as an independent fragrance concept and commerce experience.',
    details: [
      ['Brand', 'Valoir Parfum'],
      ['Contact', 'studio@valoir.parfum'],
      ['Responsibility', 'Responsible contact for this digital experience: studio@valoir.parfum.'],
    ],
  },
};

export function getInfoPage(slug) {
  return infoPages[slug];
}
