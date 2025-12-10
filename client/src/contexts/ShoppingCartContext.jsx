import React, {createContext, useContext, useState} from "react";


const ShoppingCartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        reservations: [],
        gift_cards: [],
    });


    const addReservationToCart = (newReservation) => {
        setCart(prev => ({
            ...prev,
            reservations: [...prev.reservations, newReservation]
        }));
    }


    const addGiftCardToCart = (newGiftCard) => {
        setCart(prev => ({
            ...prev,
            gift_cards: [...prev.gift_cards, newGiftCard]
        }));
    }

    const clearCart = () =>{
        setCart([]);
    }

    return (
        <ShoppingCartContext.Provider
        value={{
            cart, 
            addReservationToCart,
            addGiftCardToCart,
            clearCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export {CartProvider, ShoppingCartContext};