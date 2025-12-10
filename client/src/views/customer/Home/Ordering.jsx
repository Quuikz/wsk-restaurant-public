import React, {useContext, useState} from 'react';

import OrderingButtons from './OrderingButtons';
import OrderingTime from './OrderingTime';
import {ShoppingCartContext} from '../../../contexts/ShoppingCartContext';
import useForm from '../../../hooks/formHooks';
import {useLanguageContext} from '../../../hooks/contextHooks.js';
// Custom Time selector. Check if table still empty at selected time etc.

const Ordering = ({id}) => {
  // Date state
  const today = new Date().toISOString().split('T')[0];
  //const [reservationDate, setReservationDate] = useState(today);

  const {addReservationToCart} = useContext(ShoppingCartContext);
  const {finnish} = useLanguageContext();

  /*
  const initValues = {
    reservationDate: date,
    reservationTime: time,
    tableCount: tableCount,
    grillCount: grillCount,
  }
  */
  const [form, setForm] = useState({
    reservationDate: today,
    reservationTime: 'Valitse aika',
    tableCount: 0,
    grillCount: 1,
  });

  const updateField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const doAddToCart = (e) => {
    e.preventDefault();
    addReservationToCart({
      date: form.reservationDate,
      time: form.reservationTime,
      table_customer_count: form.tableCount,
      grill_customer_count: form.grillCount,
    });
    console.log('Reservation added to cart!');
  };

  //const {inputs, handleInputChange, handleSubmit} = useForm(doAddToCart, initValues)

  return (
    <>
      <section id={id}>
        {/* Table ordering */}
        <div className=" bg-orange-100 text-center p-20 pb-30">
          <form
            onSubmit={(e) => doAddToCart(e)}
            className="grid grid-cols-4 gap-4 p-20 bg-orange-50"
          >
            {/* Grill number selector */}
            <OrderingButtons
              tableCount={form.tableCount}
              grillCount={form.grillCount}
              //setTableCount={setTableCount}
              //setGrillCount={setGrillCount}
              //setTableCount={(val) =>
              //  handleInputChange({ target: { name: 'tableCount', value: Number(val) } })
              //}
              //setGrillCount={(val) =>
              //  handleInputChange({ target: { name: 'grillCount', value: Number(val) } })
              //}
              setTableCount={(val) => updateField('tableCount', Number(val))}
              setGrillCount={(val) => updateField('grillCount', Number(val))}
            />

            {/* Date */}
            <div className="flex flex-col items-center ">
              <label htmlFor="reservationDate" className="block mb-2 font-bold">
                {finnish ? 'Päivämäärä' : 'Date'}
              </label>
              <input
                type="date"
                id="reservationDate"
                name="reservationDate"
                min={today}
                //onChange={(e) => setReservationDate(e.target.value)}
                value={form.reservationDate}
                onChange={(e) => (
                  updateField('reservationDate', e.target.value),
                  updateField('reservationTime', 'Valitse aika')
                ) //reset time on date change
                }
                className="w-48 px-3 py-2 border border-gray-300 bg-white rounded"
              />
            </div>

            {/* Time */}
            <OrderingTime
              reservationDate={form.reservationDate}
              reservationTime={form.reservationTime}
              //setReservationTime={(value) =>
              //  handleInputChange({ target: { name: 'reservationTime', value: value } })
              ///}
              setReservationTime={(value) =>
                updateField('reservationTime', value)
              }
            />

            {/* Submit button */}
            <div className="col-span-4 mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-200   rounded hover:bg-orange-300"
              >
                {finnish ? 'Varaa pöytä' : 'Reserve table'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Ordering;
