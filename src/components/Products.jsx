import { useGetData } from "./useGetData";
import { AddToCart } from "./AddToCart";
import priceIcon from '../icons/price.svg';
import loadingIcon from '../icons/loading.svg';

function Products() {
  const { data: productList, isLoading } = useGetData();

  return (
    <section id="products">
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
        <div className='flex flex-col gap-3 mx-auto'>
          <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl text-center w-full mt-12'>Productos</h1>
          <p className='mx-auto text-gray-500 text-center px-3 md:px-10 lg:px-30 text-sm sm:text-base'>
            Explora nuestra selección, elige tus favoritos y nosotros nos encargamos del resto. ¡Así de simple!
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-2 h-[60vh] w-full justify-center items-center">
            <img src={loadingIcon.src} className="size-10 animate-spin"></img>
            <p className="text-sm text-gray-700">Cargando</p>
          </div>
        ) : (
          <ul className='mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
            {productList.map((product) => (
              <li className='group block overflow-hidden' key={product.id}>
                <div className='flex flex-col h-full gap-4 rounded-2xl p-4 bg-linear-to-t from-sky-100 to-white'>
                  <div className='bg-white w-full object-scale-down transition duration-500 group-hover:scale-103 rounded-2xl overflow-hidden p-2'>
                    <img
                      src={product.image}
                      alt=''
                      className='h-[200px] w-full object-scale-down'
                    />
                  </div>

                  <div className='flex flex-col grow gap-4 justify-between px-2'>
                    <h3 className='text-sm text-black font-semibold group-hover:underline group-hover:underline-offset-4'>
                      {product.name}
                    </h3>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <img src={priceIcon.src} className='size-5' />
                        <span className='text-gray-600 text-sm'>${product.price.toFixed(2)}</span>
                      </div>

                      <AddToCart productId={product.id} client:load/>

                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        
      </div>
    </section>
  );
}

export { Products };