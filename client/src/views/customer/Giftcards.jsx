import React, {useContext, useState} from 'react';

import AlertModal from '../../components/AlertModal.jsx';

import {ShoppingCartContext} from '../../contexts/ShoppingCartContext';
import {useLanguageContext} from '../../hooks/contextHooks.js';

//Set server URL
let server_url = import.meta.env.VITE_SERVER_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  server_url = import.meta.env.VITE_SERVER_URL_LOCAL;
}

const Giftcards = () => {
  //
  const min = 0;
  const max = 20;
  const [qty5, setQty5] = useState(0);
  const [qty20, setQty20] = useState(0);
  const [qty50, setQty50] = useState(0);
  const inc = (set) => () => set((v) => Math.min(max, v + 1));
  const dec = (set) => () => set((v) => Math.max(min, v - 1));

  const {addGiftCardToCart} = useContext(ShoppingCartContext);
  const [displayAlertModal, setDisplayAlertModal] = useState(false);
  const [message, setMessage] = useState('');
  const {finnish} = useLanguageContext();

  const doAddToCart = (value, qty) => {
    if (qty <= 0) {
      setMessage(
        finnish
          ? 'Valitse vähintään yksi lahjakortti!'
          : 'Please select at least one gift card!',
      );
      return;
    }
    addGiftCardToCart({value, quantity: qty});
    setMessage(
      finnish ? 'Lahjakortti lisätty ostoskoriin!' : 'Gift card added to cart!',
    );
    console.log(`${qty} x ${value}€ Added to shoppingcart`);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="p-7 pt-20 pb-30 bg-orange-100">
          {/* Page title */}
          <div className="text-center w-full pb-10 ">
            <h2 className="text-3xl font-medium">
              | {finnish ? 'Lahjakortit' : 'Gift cards'} |
            </h2>
            <p className="mt-2 ">
              {finnish
                ? 'Osta lahjakortti helposti tästä!'
                : 'Buy gift cards here!'}
            </p>
          </div>

          {/* Giftcard boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {/* 5€ */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img
                src={server_url + '/images/giftCards/card1.jpg'}
                alt="5€ lahjakortti"
              />
              <div className="px-6">
                <h2 className="text-2xl mt-2 text-center border-b">
                  5€ {finnish ? 'Lahjakortti' : 'Gift card'}
                </h2>
                <ul>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Tietoa' : 'Info'}
                    </p>
                    {finnish
                      ? 'Napostelijan lahjakortti'
                      : 'Snackers gift card'}
                  </li>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Voimassaoloaika' : 'Valid for'}
                    </p>
                    {finnish ? '12kk (1 vuosi)' : '12 months (1 year)'}
                  </li>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Käyttöehdot' : 'Terms of use'}
                    </p>
                    {finnish
                      ? 'Lahjakorttia voi käyttää vain Restauranto-ravintolassa.'
                      : 'Gift card can only be used in Restauranto-restaurant.'}
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-10">
                  <div className="my-auto flex">
                    <button
                      type="button"
                      onClick={dec(setQty5)}
                      className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300"
                      disabled={qty5 <= min}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={qty5}
                      onChange={(e) => {
                        const v = Number(e.target.value || 0);
                        if (!Number.isNaN(v))
                          setQty5(Math.max(min, Math.min(max, v)));
                      }}
                      min={min}
                      max={max}
                      className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded"
                    />
                    <button
                      type="button"
                      onClick={inc(setQty5)}
                      className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300"
                      disabled={qty5 >= max}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-4 mb-4 bg-orange-200 px-4 py-2 rounded hover:bg-orange-300"
                    onClick={() => (
                      doAddToCart(5, qty5),
                      setDisplayAlertModal(true)
                    )}
                  >
                    {finnish ? 'Lisää ostoskoriin' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
            {/* 20€ */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img
                src={server_url + '/images/giftCards/card2.jpg'}
                alt="20€ lahjakortti"
              />
              <div className="px-6">
                <h2 className="text-2xl mt-2 text-center border-b">
                  20€ {finnish ? 'Lahjakortti' : 'Gift card'}
                </h2>
                <ul>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Tietoa' : 'Info'}
                    </p>
                    {finnish
                      ? 'Edullinen lahjakortti arkeen'
                      : 'Affordable everyday gift card'}
                  </li>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Voimassaoloaika' : 'Valid for'}
                    </p>
                    {finnish ? '12kk (1 vuosi)' : '12 months (1 year)'}
                  </li>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Käyttöehdot' : 'Terms of use'}
                    </p>
                    {finnish
                      ? 'Lahjakorttia voi käyttää vain Restauranto-ravintolassa.'
                      : 'Gift card can only be used in Restauranto-restaurant.'}
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-10">
                  <div className="my-auto flex">
                    <button
                      type="button"
                      onClick={dec(setQty20)}
                      className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300"
                      disabled={qty20 <= min}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={qty20}
                      onChange={(e) => {
                        const v = Number(e.target.value || 0);
                        if (!Number.isNaN(v))
                          setQty20(Math.max(min, Math.min(max, v)));
                      }}
                      min={min}
                      max={max}
                      className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded"
                    />
                    <button
                      type="button"
                      onClick={inc(setQty20)}
                      className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300"
                      disabled={qty20 >= max}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-4 mb-4 bg-orange-200 px-4 py-2 rounded hover:bg-orange-300"
                    onClick={() => (
                      doAddToCart(20, qty20),
                      setDisplayAlertModal(true)
                    )}
                  >
                    {finnish ? 'Lisää ostoskoriin' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
            {/* 50€ */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img
                src={server_url + '/images/giftCards/card3.jpg'}
                alt="50€ lahjakortti"
              />
              <div className="px-6">
                <h2 className="text-2xl mt-2 text-center border-b">
                  50€ {finnish ? 'Lahjakortti' : 'Gift card'}
                </h2>
                <ul>
                  <li>
                    <p className="mt-1 font-bold">Tietoa</p>
                    {finnish
                      ? 'Erityinen lahjakortti juhlaan'
                      : 'Gift card for a special occasion'}
                  </li>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Voimassaoloaika' : 'Valid for'}
                    </p>
                    12kk (1 vuosi)
                  </li>
                  <li>
                    <p className="mt-1 font-bold">
                      {finnish ? 'Käyttöehdot' : 'Terms of use'}
                    </p>
                    {finnish
                      ? 'Lahjakorttia voi käyttää vain Restauranto-ravintolassa.'
                      : 'Gift card can only be used in Restauranto-restaurant.'}
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-10">
                  <div className="my-auto flex">
                    <button
                      type="button"
                      onClick={dec(setQty50)}
                      className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300"
                      disabled={qty50 <= min}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={qty50}
                      onChange={(e) => {
                        const v = Number(e.target.value || 0);
                        if (!Number.isNaN(v))
                          setQty50(Math.max(min, Math.min(max, v)));
                      }}
                      min={min}
                      max={max}
                      className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded"
                    />
                    <button
                      type="button"
                      onClick={inc(setQty50)}
                      className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300"
                      disabled={qty50 >= max}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-4 mb-4 bg-orange-200 px-4 py-2 rounded hover:bg-orange-300"
                    onClick={() => (
                      doAddToCart(50, qty50),
                      setDisplayAlertModal(true)
                    )}
                  >
                    {finnish ? 'Lisää ostoskoriin' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {displayAlertModal && (
        <AlertModal
          isOpen={displayAlertModal}
          onClose={() => setDisplayAlertModal(false)}
          message={message}
        />
      )}
    </>
  );
};

export default Giftcards;
