import { useStore } from '@nanostores/react';
import { cartData, isCartOpen } from './data';
import cartIcon from '../icons/cart.svg';
import '../styles/global.css';

function AddToCart({ productId }) {
  const $cartData = useStore(cartData);

  function saveCart(newCart) {
    localStorage.setItem('cartData', JSON.stringify(newCart));
    cartData.set(newCart);
  }

  function addProduct() {
    // Add the product to the cart
    const existingItem = $cartData.find((item) => item.id === productId);

    if (existingItem) {
      // If the item already exists
      alert('Producto ya agregado');
      return;
    } else {
      // If the item doesn't exist, add it to the cart
      const newCart = [...$cartData, { id: productId, qty: 1 }];
      saveCart(newCart);
      isCartOpen.set(true);
    }
  }

  return (
    <button
      className="flex justify-center items-center px-3 py-1 rounded-2xl cursor-pointer bg-green-300/70 hover:bg-green-300 transition gap-2"
      onClick={() => addProduct()}
    >
      <img src={cartIcon.src} className="size-5"></img>
      <span className="text-sm">Añadir</span>
    </button>
  );
}

export { AddToCart };