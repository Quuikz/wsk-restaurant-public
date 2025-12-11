import React, {useContext, useState} from 'react';

import OrderingButtons from './OrderingButtons';
import OrderingTime from './OrderingTime';
import AlertModal from '../../../components/AlertModal.jsx';

import {ShoppingCartContext} from '../../../contexts/ShoppingCartContext';
import {useLanguageContext} from '../../../hooks/contextHooks.js';
import {useNavigate} from 'react-router';
// Custom Time selector. Check if table still empty at selected time etc.

const Ordering = ({id}) => {
  // Date state
  const today = new Date().toISOString().split('T')[0];
  //const [reservationDate, setReservationDate] = useState(today);

  const {addReservationToCart} = useContext(ShoppingCartContext);
  const [displayAlertModal, setDisplayAlertModal] = useState(false);
  const [message, setMessage] = useState('');
  const {finnish} = useLanguageContext();
  const navigate = useNavigate();

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

  //const {inputs, handleInputChange, handleSubmit} = useForm(doAddToCart, initValues)

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
              //setReservationTime={(value) =>
              //  handleInputChange({ target: { name: 'reservationTime', value: value } })
              ///}
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
