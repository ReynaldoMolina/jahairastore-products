import { atom } from 'nanostores';

export const isCartOpen = atom(true);
export let cartData = atom([
  {
    id: 1,
    qty: 1,
  },
]);