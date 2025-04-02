import '../styles/global.css';
import { useStore } from '@nanostores/react';
import { cartData, isCartOpen } from './cartData';
import { products } from './products';
import cartEmpty from '../icons/cart-empty.svg'

function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartData = useStore(cartData);

  const productList = $cartData.map((product) => {
    const productInfo = products.filter((e) => e.id === product.id)[0];

    return {
      ...product,
      name: productInfo.name,
      price: productInfo.price,
      image: productInfo.image
    }
  });

  const cartTotal = productList.reduce((sum, product) => sum + (product.price * product.qty), 0)

  return (
    <div className={`${$isCartOpen && "hidden"} flex h-[calc(100vh-56px)] sm:max-h-[calc(100vh-112px)] flex-col gap-2 bg-white sm:rounded-3xl sm:max-w-lg p-4 left-0 sm:left-auto w-full absolute top-16 sm:right-8 border-t-1 border-t-neutral-200 sm:border-1 sm:border-neutral-200 shadow-2xl`}>
      {$cartData.length === 0 ?
        <div className='flex flex-col justify-center items-center h-full gap-2'>
          <img src={cartEmpty.src} className='size-20'></img>
          <span className='text-gray-700'>El carrito está vacío</span>
          <span className='text-gray-500 text-sm'>Los productos que añadas aparecerán aquí</span>
        </div> :
        (<>
          <div className='flex justify-between p-2 border-b-1 border-b-neutral-200'>
            <span className='text-gray-700 text-sm font-semibold'>Productos: {$cartData.length}</span>
            <span className='text-gray-700 text-sm font-semibold'>Total: ${cartTotal.toFixed(2)}</span>
            <button className='text-gray-700 text-sm font-semibold hover:underline cursor-pointer'>
              Compartir
            </button>
          </div>

          <div className="flex flex-col gap-5 overflow-scroll rounded-2xl overscroll-contain">
            {productList.map((product) => (
              <div className="flex items-center gap-4" key={product.id}>
                <img className="rounded-2xl h-30 aspect-square object-contain border-1 border-neutral-200 p-1" src={product.image} alt=""></img>
                <div className="flex flex-col gap-1 justify-center">
                  <span className="text-sm font-bold">{product.name}</span>
                  <span className="text-sm text-gray-500">Precio: ${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">Cantidad: {product.qty}</span>
                  <span className="text-sm text-gray-500">Subtotal: ${(product.price * product.qty).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </>)
      }
    </div>
  );
}

export { Cart };