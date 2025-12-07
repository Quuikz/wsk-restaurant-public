import {useEffect, useState} from 'react';

const OrderingButtons = () => {
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

          <div className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded mx-2">
            {grillNumber}
          </div>

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

          <div className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded mx-2">
            {buffetNumber}
          </div>

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
    </>
  );
};

export default OrderingButtons;
