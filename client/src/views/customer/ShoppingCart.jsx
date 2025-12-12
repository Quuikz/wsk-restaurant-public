import {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router';
import {ShoppingCartContext} from '../../contexts/ShoppingCartContext';
import {useLanguageContext, useUserContext} from '../../hooks/contextHooks.js';
import {
  useUser,
  useDiscountsCommon,
  useGiftcardsCommon,
  useOrderCommon,
  useReservationCommon,
} from '../../hooks/common/apiHooks.js';
import useForm from '../../hooks/formHooks.js';

const ShoppingCart = () => {
  let SERVER_URL = import.meta.env.VITE_SERVER_URL;
  if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
    SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  }

  const {
    cart,
    clearCart,
    removeReservationFromCart,
    incrementGiftCard,
    decrementGiftCard,
    removeGiftCardFromCart,
  } = useContext(ShoppingCartContext);
  const {finnish} = useLanguageContext();
  const navigate = useNavigate();

  const {postOrder, updateOrder} = useOrderCommon();
  const {postNewReservation} = useReservationCommon();
  const {postGiftCard} = useGiftcardsCommon();
  const {validateDiscountByCode} = useDiscountsCommon();

  const {user, setUser} = useUserContext();

  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountActive, setDiscountsActive] = useState(null);

  const {getUserByToken} = useUser();

  const [totalCost, setTotalCost] = useState(null);

  const reservationImages =
    SERVER_URL + `/images/shoppingCart/reservation.webp`;
  const giftCardImages = SERVER_URL + `/images/shoppingCart/Giftcard.webp`;

  //Returns the number of items in cart
  const totalItems =
    cart.reservations.length +
    cart.gift_cards.reduce((acc, gc) => acc + gc.quantity, 0);

  /**
   * Calculates current timestamp in YYYY-MM-DD HH:MM:SS format
   * Used for order creation timestamp
   *
   * @function
   * @returns {string} Formatted timestamp
   */
  const getCurrentTimestamp = () => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const hours = String(date.getHours());
    const minutes = String(date.getMinutes());
    const seconds = String(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const initValues = {
    discount_code: '',
  };

  /**
   * Validates discount code and applies discount to cart
   * Fetches discount data from API using provided code
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const doCheckDiscount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const result = await validateDiscountByCode(token, inputs.discount_code);
      console.log(result);
      //console.log(result[0].discount);
      if (result.length > 0) {
        //console.log(result[0].discount *10);
        setDiscountAmount(result[0].discount);
        setDiscountsActive(result[0]);
      }
    } catch (error) {
      console.log('Error in doCheckDiscount: ', error.message);
    }
  };

  const {inputs, handleInputChange} = useForm(doCheckDiscount, initValues);

  /**
   * Calculates total cart cost whenever cart items change
   * Includes reservation costs (table: 10€, grill: 12€) and gift cards
   *
   * Runs on: cart dependency change
   */
  useEffect(() => {
    let cost = 0;

    //Reservation cost
    cart.reservations.forEach((reservation) => {
      //10€ for table, 12€ for grill
      const reservationCost =
        reservation.table_customer_count * 10 +
        reservation.grill_customer_count * 12;
      cost += reservationCost;
    });

    cart.gift_cards.forEach((giftCard) => {
      cost += giftCard.value * giftCard.quantity;
    });

    setTotalCost(cost);
  }, [cart]);

  /**
   * Fetches user data from API using authentication token
   * Updates user context with retrieved data
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const getUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    try {
      const userData = await getUserByToken(token);
      setUser(userData.user);
    } catch (error) {
      console.log('Error while fetching userData: ', error);
    }
  };

  /**
   * Fetches user data on component mount
   */
  useEffect(() => {
    getUserData();
  }, []);

  /**
   * Sends complete order to backend
   *
   * Process:
   * 1. Creates empty order and gets order ID
   * 2. Posts all reservations linked to order
   * 3. Posts all gift cards linked to order
   * 4. Updates order with reservation and gift card IDs
   *
   * @async
   * @function
   * @param {Object} cart - Shopping cart with reservations and gift_cards
   * @param {Object} user - User object with id
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Order result from API
   */
  const sendOrder = async (cart, user, token) => {
    const reservationIDs = [];
    const giftCardIDs = [];

    //console.log('User before posting:', user);
    //console.log('User ID:', user?.id);

    let orderID = null;

    //POST empty order (to get id)
    try {
      const emptyOrder = await postOrder(
        {
          id: orderID,
          user: user.id,
          cost: 10,
          timestamp: getCurrentTimestamp(),
        },
        token,
      );

      if (!emptyOrder || !emptyOrder.id) {
        throw new Error('No order id!');
      }
      orderID = emptyOrder.id;
    } catch (error) {
      console.log('Error in ShoppingCart: POST empty Order: ', error);
    }

    if (!user?.id || !orderID) {
      console.log('Cannot send reservation, missing user or orderID', {
        user,
        orderID,
      });
      return;
    }

    //POST reservation
    for (const reservation of cart.reservations) {
      try {
        const reservationResult = await postNewReservation(
          {
            user: user.id,
            order: orderID,
            date: reservation.date,
            table_customer_count: reservation.table_customer_count,
            grill_customer_count: reservation.grill_customer_count,
          },
          token,
        );
        reservationIDs.push(reservationResult.id);
      } catch (error) {
        console.log('Error in ShoppingCart: POST Reservation: ', error);
      }
    }

    //POST gift card
    for (const giftCard of cart.gift_cards) {
      for (let i = 0; i < giftCard.quantity; i++) {
        try {
          const giftCardResult = await postGiftCard(
            {
              user: user.id,
              order: orderID,
              value: giftCard.value,
              expiration_date: giftCard.expiration_date,
              password: '',
            },
            token,
          );
          giftCardIDs.push(giftCardResult.id);
        } catch (error) {
          console.log('Error in ShoppingCart: POST Giftcard: ', error);
        }
      }
    }

    //PUT order (Updates the Order with reservations and giftcards)
    const orderData = {
      reservations: reservationIDs,
      gift_cards: giftCardIDs,
    };

    //console.log('PAYLOAD:', orderData);

    try {
      const orderResult = await updateOrder(orderData, token, orderID);
      return orderResult;
    } catch (error) {
      console.log('Error in ShoppingCart: POST order: ', error);
    }
  };

  /**
   * Handles checkout process
   * Validates user and token, sends order, clears cart, navigates home
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!user) {
      console.log('User not loaded yet!');
      return;
    }

    if (!token) {
      console.log('EI TOKENIA');
      return;
    }

    try {
      const result = await sendOrder(cart, user, token);

      navigate('/');
      clearCart();
      return result;
    } catch (error) {
      console.log('Error in handleCheckout: ', error);
    }
  };

  return (
    <>
      <div className="bg-orange-100 min-h-140 max-w-7xl mx-auto p-7 pt-20 pb-30">
        {/* Title section */}
        <div className="text-center w-full pb-10">
          <h1 className="text-3xl font-medium ">
            | {finnish ? 'Ostoskori' : 'Cart'} |
          </h1>
          <p className="   mt-2 ">
            {totalItems}
            {finnish ? ' Tuotetta ostoskorissa.' : ' Products in the cart.'}
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              clearCart();
              setDiscountsActive(null);
            }}
            className="bg-red-500 px-2 text-center  hover:bg-red-400 text-white font-medium py-3 rounded-lg"
          >
            {finnish ? 'Tyhjennä ostoskori' : 'Clear the shopping cart'}
          </button>
        </div>

        {/* Whole layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Shopping cart - list section - Left side */}
          <div className="mt-6 md:gap-6 flex-1 space-y-4">
            {/* No Item in cart: */}
            {/* Checks if both array are undefined/empty {(!cart.reservations?.length && !cart.gift_cards?.length) &&*/}
            {cart.reservations.length === 0 && cart.gift_cards.length === 0 && (
              <p className="text-gray-600">
                {finnish ? 'Ostoskorisi on tyhjä.' : 'Cart is empty.'}
              </p>
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
                    <img
                      src={reservationImages}
                      className="w-[140px] h-auto rounded-md hidden sm:block"
                      alt="Image of item"
                    />
                  </div>
                  {/* Item in cart: info */}
                  <div>
                    <p className="font-medium text-lg">
                      {finnish ? 'Varaus' : 'Reservation'}
                    </p>
                    <p className="text-gray-600">{reservation.date}</p>
                    <p className="text-gray-600">
                      {finnish ? 'Noutopöytä:' : 'Buffet:'}{' '}
                      {reservation.table_customer_count}{' '}
                      {finnish ? 'henkilöä' : 'persons'}
                    </p>
                    <p className="text-gray-600">
                      {finnish ? 'Grillipöytä' : 'Grill:'}{' '}
                      {reservation.grill_customer_count}{' '}
                      {finnish ? 'henkilöä' : 'persons'}
                    </p>
                  </div>
                </div>
                {/* Item - right: counter + remove from cart button */}
                <div className="flex items-center justify-between h-full gap-4">
                  {/* Trash button */}
                  <div>
                    <button
                      className="text-xl leading-none p-1 pt-1.5 pb-1.5 border rounded-md bg-red-100 hover:bg-red-200"
                      onClick={() => removeReservationFromCart(i)}
                    >
                      🗑️
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
                    <img
                      src={giftCardImages}
                      className="w-[140px] h-auto rounded-md hidden sm:block"
                      alt="Image of item"
                    />
                  </div>
                  {/* Item in cart: info */}
                  <div>
                    <p className="font-medium text-lg">
                      {finnish ? 'Lahjakortti' : 'Gift card'}
                    </p>
                    <p className="text-gray-600">
                      {giftCard.value.toFixed(2)} €
                    </p>
                    <p className="text-gray-600">{giftCard.expiration_date}</p>
                    <p className="text-gray-600 mt-2">
                      <span className="text-gray-800 font-semibold">
                        {finnish ? 'Yhteensä: ' : 'Total: '}
                      </span>
                      {(giftCard.quantity * giftCard.value).toFixed(2)} €
                    </p>
                  </div>
                </div>
                {/* Item - right: counter + remove from cart button */}
                <div className="flex items-center justify-between h-full gap-4">
                  {/* Counter */}
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                      onClick={() => decrementGiftCard(giftCard.value)}
                    >
                      -
                    </button>

                    <p className="w-6 text-center">{giftCard.quantity}</p>
                    <button
                      className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100"
                      onClick={() => incrementGiftCard(giftCard.value)}
                    >
                      +
                    </button>
                  </div>
                  {/* Trash button */}
                  <div>
                    <button
                      className="text-xl leading-none p-1 pt-1.5 pb-1.5 border rounded-md bg-red-100 hover:bg-red-200"
                      onClick={() => removeGiftCardFromCart(i)}
                    >
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
                <h2>{finnish ? 'Alkuperäinen hinta' : 'Original cost'}</h2>
                <p>
                  {totalCost
                    ? ` ${totalCost.toFixed(2)} €`
                    : `${(0).toFixed(2)} €`}
                </p>
              </div>
              <div className="flex justify-between">
                <h2>{finnish ? 'Alennukset' : 'Discounts'}</h2>
                <p>
                  {discountActive
                    ? `${(totalCost - totalCost * discountAmount).toFixed(2)} €`
                    : `${(0).toFixed(2)} €`}
                </p>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <h3>{finnish ? 'Kokonaishinta' : 'Total'}</h3>
                <p>
                  {totalCost != null
                    ? discountActive
                      ? ` ${(totalCost.toFixed(2) * discountAmount).toFixed(2)} €`
                      : `${totalCost.toFixed(2)} €`
                    : '0.00'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 items-center">
                <label
                  htmlFor="discount_code"
                  className="font-medium text-gray-700 col-span-3"
                ></label>
                <input
                  name="discount_code"
                  type="text"
                  id="discount_code"
                  placeholder={finnish ? 'Alennuskoodi' : 'Discount code'}
                  autoComplete="discount_code"
                  value={inputs.discount_code}
                  onChange={handleInputChange}
                  className="flex-1 border rounded-md p-2 col-span-2"
                />
                <button
                  className="bg-orange-200  px-4 py-2 rounded-md hover:bg-orange-300"
                  onClick={() => {
                    setDiscountsActive(true);
                    doCheckDiscount();
                  }}
                >
                  {finnish ? 'Käytä' : 'Apply'}
                </button>
              </div>
              {discountActive && (
                <>
                  <div className="bg-green-300 p-2 rounded-lg border shadow-sm space-y-1 flex justify-between">
                    <div className="">
                      <div>
                        {' '}
                        {finnish
                          ? 'Alennuskoodi käytössä:'
                          : 'Discount code in use:'}
                      </div>
                      <div> {discountActive.discount_code} </div>
                    </div>
                    <button
                      className="bg-orange-200 text-white px-4 py-1 rounded-md hover:bg-orange-300"
                      onClick={() => {
                        setDiscountsActive(false);
                        setDiscountAmount(0);
                      }}
                    >
                      {finnish ? 'Poista' : 'Remove'}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Payment */}

            <div className="space-y-2">
              <div>
                {/*Disabled until user */}
                <button
                  className={
                    user && totalItems > 0
                      ? 'bg-orange-200 block w-full text-center  hover:bg-orange-300  font-medium py-3 rounded-lg'
                      : 'bg-gray-600 block w-full text-center hover:bg-gray-700 text-white font-medium py-3 rounded-lg'
                  }
                  disabled={!user || totalItems == 0}
                  onClick={handleCheckout}
                >
                  {user
                    ? finnish
                      ? 'Vahvista tilaus'
                      : 'Confirm your order'
                    : finnish
                      ? 'Käyttäjätili vaaditaan'
                      : 'User account required'}
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
