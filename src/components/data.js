import { atom } from 'nanostores';

export const isCartOpen = atom(false);
export const cartData = atom([]);

export const socialmedia = [
  {
    name: 'facebook',
    url: 'https://www.facebook.com/profile.php?id=61560253337819'
  },
  {
    name: 'tiktok',
    url: 'https://www.tiktok.com/@jahaira_store'
  },
  {
    name: 'whatsapp',
    url: 'https://api.whatsapp.com/send?phone=%2B50589531428'
  }
];

export const faq = [
  {
    question: '¿Cómo uso la página?',
    answer: 'Agrega productos al carrito, luego compártenos el link del carrito por WhatsApp.'
  },
  {
    question: '¿Cuánto tarda el envío?',
    answer: 'Hay dos tipos de envío, por barco y aéreo. Por barco tarda 1 mes, por avión 1 semana.'
  },
  {
    question: '¿Qué métodos de pago ofrecen?',
    answer: 'Aceptamos efectivo, depósitos a Banpro y Lafise.'
  },
  {
    question: '¿Debo dar algo para poder hacer la compra?',
    answer: 'Para asegurar la compra de su pedido pedimos un abono del 50%.'
  },
];

export const products = [
  {
    id: 0,
    name: 'essence | Lash Princess False Lash Effect Mascara',
    price: 4.99,
    image: 'https://m.media-amazon.com/images/I/61K6cQhw4EL._AC_UL480_QL65_.jpg',
  },
  {
    id: 1,
    name: 'e.l.f. Makeup Mist & Set',
    price: 7.8,
    image: 'https://m.media-amazon.com/images/I/51LDQgICtjL._AC_UL480_QL65_.jpg',
  },
  {
    id: 2,
    name: 'URBAN DECAY Naked 3 Mini Eyeshadow Palette',
    price: 28,
    image: 'https://m.media-amazon.com/images/I/81Avvz-kzCL._AC_UL480_QL65_.jpg',
  },
  {
    id: 3,
    name: 'Milani Make It Dewy Setting Spray 3 in 1',
    price: 2.83,
    image: 'https://m.media-amazon.com/images/I/61FShAVBgSL._AC_UL480_QL65_.jpg',
  },
];