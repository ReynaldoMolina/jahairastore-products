import { useStore } from '@nanostores/react';
import { cartData, isCartOpen } from './cartData';
import cartIcon from '../icons/cart.svg';
import '../styles/global.css';

function AddToCart({ productId }) {
  const $isCartOpen = useStore(isCartOpen);
  const $cartData = useStore(cartData);

  return (
    <button
      className="flex justify-center items-center px-3 py-1 rounded-2xl cursor-pointer bg-green-300/70 hover:bg-green-300 transition gap-2"
      onClick={() => {
        // isCartOpen.set(true);
        // Add the product to the cart
        const existingItem = $cartData.find((item) => item.id === productId);

        if (existingItem) {
          // If the item already exists, increment the quantity
          cartData.set(
            $cartData.map((item) =>
              item.id === productId ? { ...item, qty: item.qty + 1 } : item
            )
          );
        } else {
          // If the item doesn't exist, add it to the cart
          cartData.set([...$cartData, { id: productId, qty: 1 }]);
        }
      }}
    >
      <img src={cartIcon.src} className="size-5"></img>
      <span className="text-sm">Añadir</span>
    </button>
  );
}

export { AddToCart };