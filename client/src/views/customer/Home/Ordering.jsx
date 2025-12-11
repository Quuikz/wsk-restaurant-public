import React, {useContext, useState} from 'react';

import OrderingButtons from './OrderingButtons';
import OrderingTime from './OrderingTime';
import AlertModal from '../../../components/AlertModal.jsx';

import {ShoppingCartContext} from '../../../contexts/ShoppingCartContext';
import {useLanguageContext} from '../../../hooks/contextHooks.js';
// Custom Time selector. Check if table still empty at selected time etc.

/**
 * Ordering component - Handles table reservation form for the restaurant
 * Allows users to select date, time, and number of people for both regular tables and grill tables
 * Validates input and adds reservations to the shopping cart
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.id - HTML id attribute for the section element (used for navigation/anchoring)
 * @returns {JSX.Element} Table reservation form with date/time selection and customer count controls
 *
 * @example
 * <Ordering id="reservation-section" />
 */
const Ordering = ({id}) => {
  // Date state
  const today = new Date().toISOString().split('T')[0];

  const {addReservationToCart} = useContext(ShoppingCartContext);
  const [displayAlertModal, setDisplayAlertModal] = useState(false);
  const [message, setMessage] = useState('');
  const {finnish} = useLanguageContext();

  /**
   * @typedef {Object} ReservationForm
   * @property {string} reservationDate - Selected reservation date in ISO format (YYYY-MM-DD)
   * @property {string} reservationTime - Selected reservation time
   * @property {number} tableCount - Number of customers for regular table
   * @property {number} grillCount - Number of customers for grill table
   */

  /**
   * Form state managing all reservation details
   * @type {[ReservationForm, Function]}
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

  /**
   * Handles form submission and adds reservation to cart
   * Validates that at least one person is selected and a time is chosen
   * Shows appropriate error or success messages via AlertModal
   *
   * @function doAddToCart
   * @param {Event} e - Form submit event
   * @returns {void}
   */
  const doAddToCart = (e) => {
    e.preventDefault();
    if (form.tableCount + form.grillCount == 0) {
      setMessage(
        finnish
          ? 'Valitse vähintään yksi henkilö!'
          : 'Please select at least one person!',
      );
      setDisplayAlertModal(true);
      return;
    }

    if (form.reservationTime === 'Valitse aika') {
      setMessage(finnish ? 'Valitse aika!' : 'Please select a time!');
      setDisplayAlertModal(true);
      return;
    }
    addReservationToCart({
      date: form.reservationDate,
      time: form.reservationTime,
      table_customer_count: form.tableCount,
      grill_customer_count: form.grillCount,
    });

    setMessage(
      finnish ? 'Varaus lisätty ostoskoriin!' : 'Reservation added to cart!',
    );
    setDisplayAlertModal(true);

    console.log('Reservation added to cart! Navigate to cart');
  };

  return (
    <>
      <section id={id}>
        {/* Table ordering */}
        <div className=" bg-orange-100 text-center p-0 lg:p-20 py-20 pb-0 sm:pb-30 lg:pb-30">
          <form
            onSubmit={(e) => doAddToCart(e)}
            className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 py-20  lg:p-20 bg-orange-50"
          >
            {/* Grill number selector */}
            <OrderingButtons
              tableCount={form.tableCount}
              grillCount={form.grillCount}
              setTableCount={(val) => updateField('tableCount', Number(val))}
              setGrillCount={(val) => updateField('grillCount', Number(val))}
            />

            {/* Date */}
            <div>
              <div className="flex flex-col items-center ">
                <label
                  htmlFor="reservationDate"
                  className="block mb-2 font-bold"
                >
                  {finnish ? 'Päivämäärä' : 'Date'}
                </label>
                <input
                  type="date"
                  id="reservationDate"
                  name="reservationDate"
                  min={today}
                  //onChange={(e) => setReservationDate(e.target.value)}
                  value={form.reservationDate}
                  onChange={
                    (e) => (
                      updateField('reservationDate', e.target.value),
                      updateField('reservationTime', 'Valitse aika')
                    ) //reset time on date change
                  }
                  className="w-48 px-3 py-2 border border-gray-300 bg-white rounded"
                />
              </div>
            </div>
            {/* Time */}
            <OrderingTime
              reservationDate={form.reservationDate}
              reservationTime={form.reservationTime}
              setReservationTime={(value) =>
                updateField('reservationTime', value)
              }
            />

            {/* Submit button */}
            <div className="col-span-1 sm:col-span-4 lg:col-span-4 mt-6">
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

export default Ordering;
