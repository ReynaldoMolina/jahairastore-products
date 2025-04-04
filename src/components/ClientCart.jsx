import { useGetData } from "./useGetData";
import cartEmpty from '../icons/cart-empty.svg';
import '../styles/global.css';

function ClientCart() {
  const { data: products, isLoading } = useGetData();
  let productList = [];
  let cartTotal = 0;

  function readCartFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const cartDataString = urlParams.get('data');
  
    if (cartDataString) {
      try {
        const decodedCartData = JSON.parse(decodeURIComponent(cartDataString));
        return decodedCartData; // Return the parsed array
      } catch (error) {
        console.error('Error parsing cart data from URL:', error);
        return null;
      }
    }
  
    return null; // No cart data found in URL
  }
  
  const cartData = readCartFromUrl();

  if (!cartData) {
    return (
      <div className='flex flex-col justify-center items-center h-full gap-2 grow'>
        <img src={cartEmpty.src} className='size-20'></img>
        <span className='text-gray-700'>El carrito está vacío</span>
        <span className='text-gray-500 text-sm'>Revisa que el link compartido esté bien</span>
      </div>
    )
  }

  if (!isLoading) {
    productList = cartData.map((product) => {
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

  return (
    <section className="flex flex-col px-4 sm:px-6 lg:px-8 mx-auto pt-8 w-full sm:max-w-xl lg:max-w-2xl">
      <div className="flex flex-col w-full items-center gap-8 grow">
        <div className='flex justify-between w-full items-center px-2 pb-2 border-b-1 border-b-neutral-200'>
          <span className='text-gray-700 text-sm font-semibold'>Productos: {cartData.length}</span>
          <span className='text-gray-700 text-sm font-semibold'>Total: ${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-5 overflow-scroll rounded-2xl overscroll-contain w-full">
          {productList.map((product) => (
            <div className="flex items-center gap-4" key={product.id}>
              <img className="rounded-2xl h-20 sm:h-30 aspect-square object-contain border-1 border-neutral-200 p-1" src={product.image} alt=""></img>
              <div className="flex flex-col gap-1 justify-center grow">
                <span className="text-sm font-bold">{product.name}</span>
                <span className="text-sm text-gray-500">Cantidad: {product.qty}</span>
                <span className="text-sm text-gray-500 ">Precio: ${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">Subtotal: ${(product.price * product.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ClientCart };