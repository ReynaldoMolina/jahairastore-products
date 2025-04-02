import '../styles/global.css';
import { cart } from './cartData';

function Cart() {
  const cartTotal = cart.reduce((sum, product) => sum + (product.price * product.qty), 0)

  return (
    <div className="flex h-[calc(100vh-56px)] sm:max-h-[calc(100vh-112px)] flex-col gap-2 bg-white sm:rounded-3xl sm:max-w-md p-4 left-0 sm:left-auto w-full absolute top-16 sm:right-8 border-t-1 border-t-neutral-200 sm:border-1 sm:border-neutral-200 shadow-2xl">
      <div className='flex justify-between p-2 border-b-1 border-b-neutral-200'>
        <span className='text-gray-700 font-semibold'>Productos: {cart.length}</span>
        <span className='text-gray-700 font-semibold'>Total: ${cartTotal.toFixed(2)}</span>
        <button className='text-gray-700 font-semibold hover:underline cursor-pointer'>
          Compartir
        </button>
      </div>

      <div className="flex flex-col gap-5 overflow-scroll rounded-2xl">
        {cart.map((product) => (
          <div className="flex gap-4" key={product.id}>
            <img className="rounded-2xl size-30 object-cover" src={product.image} alt=""></img>
            <div className="flex flex-col gap-1 justify-center">
              <span className="text-sm font-bold">{product.name}</span>
              <span className="text-sm text-gray-500">Precio: ${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">Cantidad: {product.qty}</span>
              <span className="text-sm text-gray-500">Subtotal: ${(product.price * product.qty).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Cart };