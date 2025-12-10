import { useContext } from 'react';
import {Link} from 'react-router';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';

const ShoppingCart = () => {


  const { cart, clearCart } = useContext(ShoppingCartContext); 







  return (
    <>
      <div className="bg-orange-100 min-h-screen max-w-7xl mx-auto p-4 sm:p-8">
        {/* Title section */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold sm:text-2xl ">Ostoskori</h1>
          <p className="text-gray-600">X TUOTETTA</p>
        </div>

        {/* Whole layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Shopping cart - list section - Left side */}
          <div className="mt-6 md:gap-6 flex-1 space-y-4">



            {/* No Item in cart: */}
            {cart.reservations.length == 0 && cart.gift_cards.length == 0 && (
              <p className="text-gray-600">Ostoskorisi on tyhjä.</p>
            )}


            {/* Item in cart */}
            {cart.reservations.map((reservation, i) => (              
              <div 
                key={`reservation-${i}`}
                className="flex items-start justify-between p-4 bg-white rounded-lg shadow border border-gray-200"
              >
                {/* Item - left: img + name, price, amount */}
                <div className="flex gap-4">
                  {/* Item in cart: image */}
                  <div>
                    <img src="https://placehold.co/120x120" alt='Image of item' />
                  </div>
                  {/* Item in cart: info */}
                <div>
                  <p className="font-medium text-lg">Varaus</p>
                  <p className="text-gray-600">{reservation.date}</p>
                  <p className="text-gray-600">Noutopöytä: {reservation.table_customer_count} henkilö(ä)</p>
                  <p className="text-gray-600">Grillipöytä: {reservation.grill_customer_count} henkilö(ä)</p>
                </div>
              </div>
              {/* Item - right: counter + remove from cart button */}
              <div className="flex items-center justify-between h-full gap-4">
                {/* Trash button */}
                <div>
                  <button className="text-xl leading-none p-1 pt-1.5 pb-1.5 border rounded-md bg-red-700">
                    🗑️
                  </button>
                </div>
              </div>
              </div>
            ))}

            {cart.gift_cards.map((giftCard, i) => (
              <div 
                key={`reservation-${i}`}
                className="flex items-start justify-between p-4 bg-white rounded-lg shadow border border-gray-200"
              >
                {/* Item - left: img + name, price, amount */}
                <div className="flex gap-4">
                  {/* Item in cart: image */}
                  <div>
                    <img src="https://placehold.co/120x120" alt='Image of item' />
                  </div>
                  {/* Item in cart: info */}
                <div>
                  <p className="font-medium text-lg">Lahjakortti</p>
                  <p className="text-gray-600">{giftCard.value} €</p>
                  <p className="text-gray-600">{giftCard.expiration_date}</p>
                </div>
              </div>
              {/* Item - right: counter + remove from cart button */}
              <div className="flex items-center justify-between h-full gap-4">
                {/* Counter */}
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
                    -
                  </button>

                  <p className="w-6 text-center">2</p>
                  <button className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100">
                    +
                  </button>
                </div>
                {/* Trash button */}
                <div>
                  <button className="text-xl leading-none p-1 pt-1.5 pb-1.5 border rounded-md bg-red-700">
                    🗑️
                  </button>
                </div>
              </div>
              </div>
            ))}

          </div>

          {/* Total section - right side  */}
          <div className="w-full lg:w-80 space-y-6">
            {/* Information related to cart */}
            <div className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
              <div className="flex justify-between">
                <h2>Alkuperäinen hinta</h2>
                <p>995,95€</p>
              </div>
              <div className="flex justify-between">
                <h2>Säästösi</h2>
                <p>-222,95€</p>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <h3>Kokonaishinta</h3>
                <p>773.00€</p>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-2">
              <div>
                <Link
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg"
                  to="#"
                >
                  Kassalle
                </Link>
              </div>
              <div>
                <Link
                  className="block text-center text-sm text-gray-700 underline hover:no-underline"
                  to="#"
                >
                  Jatka ostoksia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
