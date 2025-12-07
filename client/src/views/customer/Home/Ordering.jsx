import React from 'react';

import OrderingButtons from './OrderingButtons';
import OrderingTime from './OrderingTime';
// Custom Time selector. Check if table still empty at selected time etc.

const Ordering = ({id}) => {
  // Date state
  const today = new Date().toISOString().split('T')[0];
  const [reservationDate, setReservationDate] = React.useState(today);

  return (
    <>
      <section id={id}>
        {/* Table ordering */}
        <div className=" bg-orange-100 text-center p-20 pb-30">
          <form className="grid grid-cols-4 gap-4 p-20 bg-orange-50">
            {/* Grill number selector */}
            <OrderingButtons />

            {/* Date */}
            <div className="flex flex-col items-center ">
              <label htmlFor="reservationDate" className="block mb-2 font-bold">
                Päivämäärä
              </label>
              <input
                type="date"
                id="reservationDate"
                name="reservationDate"
                min={today}
                onChange={(e) => setReservationDate(e.target.value)}
                value={reservationDate}
                className="w-48 px-3 py-2 border border-gray-300 bg-white rounded"
              />
            </div>

            {/* Time */}
            <OrderingTime reservationDate={reservationDate} />

            {/* Submit button */}
            <div className="col-span-4 mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-200   rounded hover:bg-orange-300"
              >
                Varaa Pöytä
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Ordering;
