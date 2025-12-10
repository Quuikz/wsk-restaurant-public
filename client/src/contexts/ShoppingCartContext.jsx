import React, {createContext, useContext, useState} from "react";


const ShoppingCartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        reservations: [],
        gift_cards: [],
    });

    //Reservations
    const addReservationToCart = (newReservation) => {
        setCart(prev => ({
            ...prev,
            reservations: [...prev.reservations, newReservation]
        }));
    }


    //Giftcards
    const addGiftCardToCart = (newGiftCard) => {
        setCart(prev => ({
            ...prev,
            gift_cards: [...prev.gift_cards, newGiftCard]
        }));
    }

    //When clicking + button on shoppingcart to increase amount of giftcards
    const incrementGiftCard = (value) => {
        setCart((prev) => ({
            ...prev,
            gift_cards: prev.gift_cards.map((giftCard) => 
                giftCard.value == value ? {...giftCard, quantity: giftCard.quantity + 1} : giftCard
            ),
        }));
    };

    //When clicking - button on shoppingcart to decrease amount of giftcards
    const decrementGiftCard = (value) => {
        setCart((prev) => ({
            ...prev,
            gift_cards: prev.gift_cards.map((giftCard) => 
                giftCard.value == value ? {...giftCard, quantity: giftCard.quantity - 1} : giftCard
            ),
        }));
    };


    const clearCart = () =>{
        setCart([]);
    }

    return (
        <ShoppingCartContext.Provider
        value={{
            cart, 
            addReservationToCart,
            addGiftCardToCart,
            incrementGiftCard,
            decrementGiftCard,
            clearCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export {CartProvider, ShoppingCartContext};