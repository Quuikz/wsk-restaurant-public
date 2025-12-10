import React, {useContext, useState} from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';




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


  const doAddToCart = (value, qty) => {
    if (qty <= 0) return;
    addGiftCardToCart({ value, quantity: qty });
    console.log(`${qty} x ${value}€ Added to shoppingcart`);
  }




  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="p-7 pt-20 pb-30 bg-orange-100">
          {/* Page title */}
          <div className="text-center w-full pb-10 ">
            <h2 className="text-3xl font-medium">| Lahjakortit |</h2>
            <p className="mt-2 ">Osta lahjakortti helposti tästä!</p>
          </div>

          {/* Giftcard boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {/* 5€ */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img src="https://placehold.co/1148x498" alt="5€ lahjakortti" />
              <div className="px-6">
                <h2 className="text-2xl mt-2 text-center border-b">
                  5€ Lahjakortti
                </h2>
                <ul>
                  <li>
                    <p className="mt-1 font-bold">Tietoa</p>Napostelijan
                    lahjakortti
                  </li>
                  <li>
                    <p className="mt-1 font-bold">Voimassaoloaika</p>12kk (1
                    vuosi)
                  </li>
                  <li>
                    <p className="mt-1 font-bold">Käyttöehdot</p>Lahjakorttia
                    voi käyttää vain Restauranto-ravintolassa.
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
                    onClick={() => doAddToCart(5, qty5)}
                  >Lisää
                  </button>
                </div>
              </div>
            </div>
            {/* 20€ */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img src="https://placehold.co/1148x498" alt="20€ lahjakortti" />
              <div className="px-6">
                <h2 className="text-2xl mt-2 text-center border-b">
                  20€ Lahjakortti
                </h2>
                <ul>
                  <li>
                    <p className="mt-1 font-bold">Tietoa</p>Edullinen
                    lahjakortti arkeen
                  </li>
                  <li>
                    <p className="mt-1 font-bold">Voimassaoloaika</p>12kk (1
                    vuosi)
                  </li>
                  <li>
                    <p className="mt-1 font-bold">Käyttöehdot</p>Voidaan käyttää
                    ravintolassa ja verkkokaupassa.
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
                    onClick={() => doAddToCart(20, qty20)}
                    >Lisää
                  </button>
                </div>
              </div>
            </div>
            {/* 50€ */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <img src="https://placehold.co/1148x498" alt="50€ lahjakortti" />
              <div className="px-6">
                <h2 className="text-2xl mt-2 text-center border-b">
                  50€ Lahjakortti
                </h2>
                <ul>
                  <li>
                    <p className="mt-1 font-bold">Tietoa</p>Erityinen
                    lahjakortti juhlaan
                  </li>
                  <li>
                    <p className="mt-1 font-bold">Voimassaoloaika</p>12kk (1
                    vuosi)
                  </li>
                  <li>
                    <p className="mt-1 font-bold">Käyttöehdot</p>Voidaan käyttää
                    kaikissa palveluissamme.
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
                    onClick={() => doAddToCart(50, qty50)}
                  >Lisää
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Giftcards;
