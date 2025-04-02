import { useStore } from '@nanostores/react';
import { cartData, isCartOpen } from '../components/cartData';
import cartIcon from '../icons/cart.svg';
import '../styles/global.css';

function CartButton() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartData = useStore(cartData);
  const badge = $cartData.length;

  return (
    <button
      onClick={() => {
        isCartOpen.set(!$isCartOpen)
      }}
      className="flex items-center gap-2 rounded-xl bg-sky-100 px-3 py-2.5 transition hover:bg-sky-200 cursor-pointer"
    >
      <img src={cartIcon.src} className="size-5"></img>
      <span className="text-sm font-semibold">Carrito</span>
      <span className={`${badge < 1 && "hidden"} flex items-center justify-center rounded-full size-6 text-xs bg-red-300 font-bold`}>{badge}</span>
    </button>
  );
}

export { CartButton };