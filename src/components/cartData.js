import { atom } from 'nanostores';

export const isCartOpen = atom(true);

export let cart = [
  {
    id: 0,
    name: 'e.l.f. Makeup Mist & Set, Hydrating Setting Spray For Setting & Reviving Makeup',
    price: 7.8,
    image: 'https://m.media-amazon.com/images/I/51LDQgICtjL._AC_UL480_QL65_.jpg',
    qty: 1,
  },
];