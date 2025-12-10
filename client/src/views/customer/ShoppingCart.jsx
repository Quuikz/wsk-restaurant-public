import { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import {useLanguageContext, useUserContext} from "../../hooks/contextHooks.js";
import { useGiftcardsCommon, useOrderCommon, useReservationCommon } from '../../hooks/common/apiHooks.js';

const ShoppingCart = () => {


  const { cart, clearCart, removeReservationFromCart, incrementGiftCard, decrementGiftCard, removeGiftCardFromCart } = useContext(ShoppingCartContext);
  const { finnish } = useLanguageContext();
  const navigate = useNavigate();

  const { postOrder, updateOrder } = useOrderCommon();
  const { postNewReservation} = useReservationCommon();
  const { postGiftCard } = useGiftcardsCommon();
  const {user} = useUserContext();

  const getCurrentTimestamp = () => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes());
    const seconds = String(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }



  
  const sendOrder = async (cart, user, token) => {
    const reservationIDs = [];
    const giftCardIDs = [];


    let orderID = null;
    //POST empty order (to get id)
    try{
      const emptyOrder = await postOrder({
        id: orderID,
        user: 2,
        cost: 10,
        timestamp: getCurrentTimestamp(),
      }, token);

    //setOrderID(emptyOrder.id);
    if(!emptyOrder || !emptyOrder.id){
      throw new Error('No order id!');
    }
    orderID = emptyOrder.id;
    
    }
    catch(error){
      console.log('Error in ShoppingCart: POST empty Order: ', error);
    }
    
    

    //POST reservation
    for(const reservation of cart.reservations){
      try{
        const reservationResult = await postNewReservation({
          user: 2,
          order: orderID,
          date: reservation.date,
          table_customer_count: reservation.table_customer_count,
          grill_customer_count: reservation.grill_customer_count,
        }, token);
        reservationIDs.push(reservationResult.id);
      }
      catch(error){
        console.log('Error in ShoppingCart: POST Reservation: ', error);
      }
    }


    //POST gift card
    for(const giftCard of cart.gift_cards){
      for(let i=0; i<giftCard.quantity; i++){
        try{
          const giftCardResult = await postGiftCard({
            user: 2,
            order: orderID,
            value: giftCard.value,
            expiration_date: giftCard.expiration_date,
            password: '',
          }, token);
          giftCardIDs.push(giftCardResult.id);
        }
        catch(error){
          console.log('Error in ShoppingCart: POST Giftcard: ', error);
        } 
      }
    }


    //PUT order (Updates the Order with reservations and giftcards)
    const orderData = {
      reservations: reservationIDs,
      gift_cards: giftCardIDs
    };

    console.log('PAYLOAD:', orderData);

    try{
      const orderResult = await updateOrder(orderData, token, orderID);
      return orderResult;
    }
    catch(error){
      console.log('Error in ShoppingCart: POST order: ', error);
    }

  }



  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      console.log('EI TOKENIA');
      return;
    }

    try{
      const result = await sendOrder(cart, user, token);
      console.log(result);
      console.log('handleCheckout: order successful');

      clearCart();
      navigate('/');

    }
    catch(error){
      console.log('Error in handleCheckout: ', error);
    }

  }
  







  return (
    <>
      <div className="bg-orange-100 min-h-screen max-w-7xl mx-auto p-4 sm:p-8">
        {/* Title section */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold sm:text-2xl ">{finnish ? 'Ostoskori' : 'Cart'}</h1>
          <p className="text-gray-600">{finnish ? 'X TUOTETTA' : 'X PRODUCT'}</p>
        </div>

        {/* Whole layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Shopping cart - list section - Left side */}
          <div className="mt-6 md:gap-6 flex-1 space-y-4">



            {/* No Item in cart: */}
            {/* Checks if both array are undefined/empty {(!cart.reservations?.length && !cart.gift_cards?.length) &&*/}
            {cart.reservations.length == 0 && cart.gift_cards.length == 0 && (
              <p className="text-gray-600">{finnish ? 'Ostoskorisi on tyhjä.' : 'Cart is empty.'}</p>
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
                  <p className="font-medium text-lg">{finnish ? 'Varaus' : 'Reservation'}</p>
                  <p className="text-gray-600">{reservation.date}</p>
                  <p className="text-gray-600">{finnish ? 'Noutopöytä:' : 'Buffet:'} {reservation.table_customer_count} {finnish ? 'henkilöä' : 'persons'}</p>
                  <p className="text-gray-600">{finnish ? 'Grillipöytä' : 'Grill:'} {reservation.grill_customer_count} {finnish ? 'henkilöä' : 'persons'}</p>
                </div>
              </div>
              {/* Item - right: counter + remove from cart button */}
              <div className="flex items-center justify-between h-full gap-4">
                {/* Trash button */}
                <div>
                  <button
                    className="text-xl leading-none p-1 pt-1.5 pb-1.5 border rounded-md bg-red-700"
                    onClick={() => removeReservationFromCart(i)}
                  >🗑️
                  </button>
                </div>
              </div>
              </div>
            ))}

            {cart.gift_cards.map((giftCard, i) => (
              <div
                key={`giftcard-${i}`}
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
                  <p className="font-medium text-lg">{finnish ? 'Lahjakortti' : 'Gift card'}</p>
                  <p className="text-gray-600">{giftCard.value} €</p>
                  <p className="text-gray-600">{giftCard.expiration_date}</p>
                </div>
              </div>
              {/* Item - right: counter + remove from cart button */}
              <div className="flex items-center justify-between h-full gap-4">
                {/* Counter */}
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                    onClick={() => decrementGiftCard(giftCard.value)}
                  >-
                  </button>

                  <p className="w-6 text-center">{giftCard.quantity}</p>
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                    onClick={() => incrementGiftCard(giftCard.value)}
                  >+
                  </button>
                </div>
                {/* Trash button */}
                <div>
                  <button
                    className="text-xl leading-none p-1 pt-1.5 pb-1.5 border rounded-md bg-red-700"
                    onClick={() => removeGiftCardFromCart(i)}
                  >🗑️
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
                <h2>{finnish ? 'Alkuperäinen hinta' : 'Original cost'}</h2>
                <p>995,95€</p>
              </div>
              <div className="flex justify-between">
                <h2>{finnish ? 'Alennukset' : 'Discounts'}</h2>
                <p>-222,95€</p>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <h3>{finnish ? 'Kokonaishinta' : 'Total'}</h3>
                <p>773.00€</p>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-2">
              <div>
                <button
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg"
                  onClick={handleCheckout}
                >
                  {finnish ? 'Kassalle' : 'Checkout'}
                </button>
              </div>
              <div>
                <Link
                  className="block text-center text-sm text-gray-700 underline hover:no-underline"
                  to="/"
                >
                  {finnish ? 'Jatka ostoksia' : 'Continue shopping'}
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
