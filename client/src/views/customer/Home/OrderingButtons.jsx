import {useEffect, useState} from 'react';

const OrderingButtons = ({ tableCount, grillCount, setTableCount, setGrillCount }) => {
  // Table max ocapacity
  const tableCapacity = 4;

  // Grill number state, probably delete
  //const [grillNumber, setGrillNumber] = useState(0);
  //const minGrill = 0;
  //const maxGrill = tableCapacity;
  //setGrillNumber(Math.max(0, grillCount - 1));

  // Buffet number state, probably delete
  //const [buffetNumber, setBuffetNumber] = useState(0);
  //const minBuffet = 0;
  //const maxBuffet = tableCapacity;
  //const decrementBuffet = () =>
  //  setBuffetNumber((v) => Math.max(minBuffet, v - 1));

  const incrementGrill = () => {
    const totalGuests = grillCount + tableCount;
    if (totalGuests < tableCapacity) {
      setGrillCount(grillCount + 1)
    } else {
      alert('Täysi kapasiteetti saavutettu! Vähennä noutopöydän henkilöitä.');
    }
  };
  const decrementGrill = () => {
    setGrillCount(Math.max(0, grillCount - 1));
  }

  

  const incrementBuffetTable = () => {
    const totalGuests = grillCount + tableCount;
    if (totalGuests < tableCapacity) {
      setTableCount(tableCount + 1);
      //setBuffetNumber((v) => Math.min(maxBuffet, v + 1));
    } else {
      alert('Täysi kapasiteetti saavutettu! Vähennä grillipöydän henkilöitä.');
    }
  };

  const decrementBuffetTable = () => {
    setTableCount(Math.max(0, tableCount - 1));
  }


  
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
          >
            −
          </button>

        {/* Current grill count */}
          <div className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded mx-2">
            {grillCount}
          </div>

          <button
            type="button"
            onClick={incrementGrill}
            aria-label="Increase grill number"
            className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
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
            onClick={decrementBuffetTable}
            aria-label="Decrease Buffet number"
            className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
            //disabled={buffetNumber <= minBuffet}
          >
            −
          </button>

        {/* Current table count */}
          <div className="w-16 text-center px-3 py-2 border border-gray-300 bg-white rounded mx-2">
            {tableCount}
          </div>

          <button
            type="button"
            onClick={incrementBuffetTable}
            aria-label="Increase Buffet number"
            className="px-3 py-2 rounded bg-orange-200 hover:bg-orange-300 disabled:opacity-50"
            //disabled={buffetNumber >= maxBuffet}
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
