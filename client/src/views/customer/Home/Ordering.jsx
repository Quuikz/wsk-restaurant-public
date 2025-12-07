import React, {useState} from 'react';

// !!! Build Logic for table ordering
// Custom Time selector. Check if table still empty at selected time etc.

const Ordering = ({id}) => {
  // Date state
  const today = new Date().toISOString().split('T')[0];

  // Table max ocapacity
  const tableCapacity = 4;

  // Grill number state
  const [grillNumber, setGrillNumber] = useState(0);
  const minGrill = 0;
  const maxGrill = tableCapacity;

  const incrementGrill = () => {
    const totalGuests = grillNumber + buffetNumber;
    if (totalGuests < tableCapacity) {
      setGrillNumber((v) => Math.min(maxGrill, v + 1));
    } else {
      alert('Täysi kapasiteetti saavutettu! Vähennä noutopöydän henkilöitä.');
    }
  };
  const decrementGrill = () => setGrillNumber((v) => Math.max(minGrill, v - 1));

  // Buffet number state
  const [buffetNumber, setBuffetNumber] = useState(0);
  const minBuffet = 0;
  const maxBuffet = tableCapacity;

  const incrementBuffet = () => {
    const totalGuests = grillNumber + buffetNumber;
    if (totalGuests < tableCapacity) {
      setBuffetNumber((v) => Math.min(maxBuffet, v + 1));
    } else {
      alert('Täysi kapasiteetti saavutettu! Vähennä grillipöydän henkilöitä.');
    }
  };
  const decrementBuffet = () =>
    setBuffetNumber((v) => Math.max(minBuffet, v - 1));
  return (
    <>
      <section id={id}>
        {/* Table ordering */}
        <div className=" bg-orange-100 text-center p-20 pb-30">
          <form className="grid grid-cols-4 gap-4 p-20 bg-orange-50">
            {/* Grill number selector */}
            <div className="flex flex-col items-center ">
              <label htmlFor="grillNumber" className="block mb-2 font-bold">
                Grillipöytä
              </label>
              <div className="m-auto flex">
                <button
                  type="button"
                  onClick={decrementGrill}
                  aria-label="Decrease grill number"
                  className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
                  disabled={grillNumber <= minGrill}
                >
                  −
                </button>

                <input
                  type="number"
                  id="grillNumber"
                  name="grillNumber"
                  value={grillNumber}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    if (!Number.isNaN(v)) {
                      setGrillNumber(Math.max(minGrill, Math.min(maxGrill, v)));
                    }
                  }}
                  min={minGrill}
                  max={maxGrill}
                  className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded"
                  aria-label="Grill number"
                />

                <button
                  type="button"
                  onClick={incrementGrill}
                  aria-label="Increase grill number"
                  className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
                  disabled={grillNumber >= maxGrill}
                >
                  +
                </button>
              </div>
              <p className="mt-5">Henkilöiden määrä</p>
            </div>

            {/* Buffet number selector */}
            <div className="flex flex-col items-center ">
              <label htmlFor="BuffetNumber" className="block mb-2 font-bold">
                Noutopöytä
              </label>
              <div className="m-auto flex">
                <button
                  type="button"
                  onClick={decrementBuffet}
                  aria-label="Decrease Buffet number"
                  className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
                  disabled={buffetNumber <= minBuffet}
                >
                  −
                </button>

                <input
                  type="number"
                  id="BuffetNumber"
                  name="BuffetNumber"
                  value={buffetNumber}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    if (!Number.isNaN(v)) {
                      setBuffetNumber(
                        Math.max(minBuffet, Math.min(maxBuffet, v)),
                      );
                    }
                  }}
                  min={minBuffet}
                  max={maxBuffet}
                  className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded"
                  aria-label="Buffet number"
                />

                <button
                  type="button"
                  onClick={incrementBuffet}
                  aria-label="Increase Buffet number"
                  className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
                  disabled={buffetNumber >= maxBuffet}
                >
                  +
                </button>
              </div>
              <p className="mt-5">Henkilöiden määrä</p>
            </div>

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
                className="w-48 px-3 py-2 border border-gray-300 bg-white rounded"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col items-center ">
              <label htmlFor="reservationTime" className="block mb-2 font-bold">
                Aika
              </label>
              <input
                type="time"
                id="reservationTime"
                name="reservationTime"
                className="w-43 px-3 py-2 border border-gray-300 bg-white rounded"
              />
            </div>

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
