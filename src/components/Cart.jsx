import { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { cartData, isCartOpen } from './data';
import { useGetData } from "./useGetData";
import cartEmpty from '../icons/cart-empty.svg';
import deleteIcon from '../icons/delete.svg';
import shareIcon from '../icons/share.svg';
import '../styles/global.css';

function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartData = useStore(cartData);
  const cartRef = useRef(null); // Create a ref
  let productList = [];
  let cartTotal = 0;

  const { data: products, isLoading } = useGetData();
  
  // Load cart data from localStorage on component mount
  useEffect(() => {
    try {
      const localStorageCart = localStorage.getItem('cartData');
      let parsedCart;

      if (!localStorageCart) {
        localStorage.setItem('cartData', JSON.stringify([]));
      } else {
        parsedCart = JSON.parse(localStorageCart);
        cartData.set(parsedCart);
      }
      console.log('get cartData success');
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
    }
  }, []);

  function saveCart(newCart) {
    localStorage.setItem('cartData', JSON.stringify(newCart));
    cartData.set(newCart);
  }

  if (!isLoading) {
    productList = $cartData.map((product) => {
      const productInfo = products.filter((e) => e.id === product.id)[0];
      return {
        ...product,
        name: productInfo.name,
        price: productInfo.price,
        image: productInfo.image
      }
    });

    cartTotal = productList.reduce((sum, product) => sum + (product.price * product.qty), 0);
  }

  function deleteProduct(id) {
    const newCart = $cartData.filter((item) => item.id !== id);
    saveCart(newCart);
  }

  function increaseQty(id) {
    const newCart = $cartData.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    saveCart(newCart);
  }

  function decreaseQty(id) {
    const newCart = $cartData.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    saveCart(newCart);
  }

  function shareCart() {
    const cartString = encodeURIComponent(JSON.stringify($cartData));
    const baseUrl = window.location.origin; // Get the base URL of your site
  
    const shareUrl = `${baseUrl}/jahairastore-products/cart?data=${cartString}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Enlace copiado!"); //optional user feedback
    });
  
    return shareUrl;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        console.log('Clicked outside cart');
        isCartOpen.set(false); // Close the cart
      }
    }

    if ($isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [$isCartOpen]);

  if (!$isCartOpen) return null; // Hide cart when closed

  return (
    <div className="inset-0 z-50 flex justify-end w-0">
      {/* Click outside area */}
      <div className="absolute inset-0" onClick={() => isCartOpen.set(false)}></div>

      <div
        ref={cartRef}
        className="flex h-[calc(100vh-56px)] sm:max-h-[calc(100vh-112px)] flex-col gap-2 bg-white sm:rounded-3xl sm:max-w-lg p-4 left-0 sm:left-auto w-full absolute top-16 sm:right-8 border-t-1 border-t-neutral-200 sm:border-1 sm:border-neutral-200 shadow-2xl"
      >
        {$cartData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full gap-2">
            <img src={cartEmpty.src} className="size-20" alt="empty cart" />
            <span className="text-gray-700">El carrito está vacío</span>
            <span className="text-gray-500 text-sm">
              Los productos que agregues aparecerán aquí
            </span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center px-2 pb-2 border-b-1 border-b-neutral-200">
              <div className="flex gap-7">
                <span className="text-gray-700 text-sm font-semibold">
                  Productos: {$cartData.length}
                </span>
                <span className="text-gray-700 text-sm font-semibold">
                  Total: ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                className="flex gap-2 items-center text-gray-700 text-sm font-semibold bg-sky-100 rounded-2xl px-4 py-2 cursor-pointer hover:bg-sky-200 transition"
                onClick={() => shareCart()}
              >
                <img src={shareIcon.src} className="size-4" alt="share icon" />
                Compartir
              </button>
            </div>

            <div className="flex flex-col gap-5 overflow-scroll rounded-2xl overscroll-contain">
              {productList.map((product) => (
                <div className="flex items-center gap-4" key={product.id}>
                  <img
                    className="rounded-2xl h-20 aspect-square object-contain border-1 border-neutral-200 p-1"
                    src={product.image}
                    alt=""
                  />
                  <div className="flex flex-col gap-1 justify-center grow">
                    <span className="text-sm font-bold">{product.name}</span>
                    <div className="flex gap-3 items-center">
                      <span className="text-sm text-gray-500">Cantidad: </span>
                      <div className="flex gap-3 items-center overflow-hidden border-1 border-gray-200 rounded-full w-fit">
                        <button
                          className="bg-gray-200 w-6 hover:bg-gray-300"
                          onClick={() => decreaseQty(product.id)}
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-500">{product.qty}</span>
                        <button
                          className="bg-gray-200 w-6 hover:bg-gray-300"
                          onClick={() => increaseQty(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <span className="text-sm text-gray-500">Precio: ${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500">
                      Subtotal: ${(product.price * product.qty).toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="flex flex-col items-center rounded-2xl cursor-pointer bg-red-200 hover:bg-red-300 transition p-2"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <img src={deleteIcon.src} className="size-5" alt="delete icon" />
                    <span className="text-xs">Eliminar</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { Cart };