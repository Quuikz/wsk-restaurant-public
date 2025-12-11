import React, {createContext, useContext, useState} from 'react';

const ShoppingCartContext = createContext(null);

const CartProvider = ({children}) => {
  const [cart, setCart] = useState({
    reservations: [],
    gift_cards: [],
  });

  /**
   * Adds a new reservation to the shopping cart.
   * @param {Object} newReservation - The reservation object to add to the cart.
   *
   * Object contains properties:
   *  - customer count for table,
   *  - customer count for grill,
   *  - date
   *
   *  @returns {void}
   */
  const addReservationToCart = (newReservation) => {
    setCart((prev) => ({
      ...prev,
      reservations: [...prev.reservations, newReservation],
    }));
  };

  /**
   *
   * @param {number} index of the Reservation in the cart to be removed.
   *
   * This function updates the cart state by filtering out the Reservation at the specified index.
   * It uses the React's useState and 'setCart' function is used to update the state.
   * The filter method creates a new array containing every item except the index, which
   * in turn deletes the target Reservation
   *
   * @returns {void}
   */
  const removeReservationFromCart = (index) => {
    setCart((prev) => ({
      ...prev,
      reservations: prev.reservations.filter((_, i) => i != index),
    }));
  };

  /**
   * Adds a new gift card to the shopping cart.
   * @param {Object} newGiftCard  - The Gift Card to add to the cart.
   *
   * Object contains properties:
   *  - value (€)
   *  - quantity
   *  - expiration date
   *  - unique password
   *
   * @returns {void}
   *
   */
  const addGiftCardToCart = (newGiftCard) => {
    //setCart(prev => ({
    //    ...prev,
    //    gift_cards: [...prev.gift_cards, newGiftCard]
    //}));
    //};
    setCart((prev) => {
      const giftCardInCartAlready = prev.gift_cards.find(
        (giftCard) => giftCard.value == newGiftCard.value,
      );

      if (giftCardInCartAlready) {
        return {
          ...prev,
          gift_cards: prev.gift_cards.map((giftCard) =>
            giftCard.value == newGiftCard.value
              ? {
                  ...giftCard,
                  quantity: giftCard.quantity + newGiftCard.quantity,
                }
              : giftCard,
          ),
        };
      }

      return {
        ...prev,
        gift_cards: [...prev.gift_cards, newGiftCard],
      };
    });
  };

  /**
   *
   * @param {number} index of the Gift Card in the cart to be removed.
   *
   * This function updates the cart state by filtering out the Gift Card at the specified index.
   * It uses the React's useState and 'setCart' function is used to update the state.
   * The filter method creates a new array containing every item except the index, which
   * in turn deletes the target Gift Card.
   */
  const removeGiftCardFromCart = (index) => {
    setCart((prev) => ({
      ...prev,
      gift_cards: prev.gift_cards.filter((_, i) => i != index),
    }));
  };

  /**
   * Handles the + button click in the shopping cart to increase the quantity of a specified Gift Card(s).
   *
   * @param {number} value - The value of the Gift Card to increment.
   */
  const incrementGiftCard = (value) => {
    setCart((prev) => ({
      ...prev,
      gift_cards: prev.gift_cards.map((giftCard) =>
        giftCard.value == value
          ? {...giftCard, quantity: giftCard.quantity + 1}
          : giftCard,
      ),
    }));
  };

  /**
   * Handles the - button click in the shopping cart to decrease the quantity of a specified Gift Card(s).
   *
   * @param {number} value - The value of the Gift Card to decrease.
   */
  const decrementGiftCard = (value) => {
    setCart((prev) => ({
      ...prev,
      gift_cards: prev.gift_cards.map((giftCard) =>
        giftCard.value == value
          ? {...giftCard, quantity: Math.max(1, giftCard.quantity - 1)}
          : giftCard,
      ),
    }));
  };

  const clearCart = () => {
    setCart({
      reservations: [],
      gift_cards: [],
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        addReservationToCart,
        removeReservationFromCart,
        addGiftCardToCart,
        removeGiftCardFromCart,
        incrementGiftCard,
        decrementGiftCard,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export {CartProvider, ShoppingCartContext};
