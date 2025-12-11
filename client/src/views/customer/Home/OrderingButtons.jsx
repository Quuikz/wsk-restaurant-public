import {useEffect, useState} from 'react';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

import AlertModal from '../../../components/AlertModal.jsx';

const OrderingButtons = ({
  tableCount,
  grillCount,
  setTableCount,
  setGrillCount,
}) => {
  const [displayAlertModal, setDisplayAlertModal] = useState(false);
  const {finnish} = useLanguageContext();

  // Table max ocapacity
  const tableCapacity = 4;

  const incrementGrill = () => {
    const totalGuests = grillCount + tableCount;
    if (totalGuests < tableCapacity) {
      setGrillCount(grillCount + 1);
    } else {
      setDisplayAlertModal(true);
    }
  };
  const decrementGrill = () => {
    setGrillCount(Math.max(0, grillCount - 1));
  };

  const incrementBuffetTable = () => {
    const totalGuests = grillCount + tableCount;
    if (totalGuests < tableCapacity) {
      setTableCount(tableCount + 1);
      //setBuffetNumber((v) => Math.min(maxBuffet, v + 1));
    } else {
      setDisplayAlertModal(true);
    }
  };

  const decrementBuffetTable = () => {
    setTableCount(Math.max(0, tableCount - 1));
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <label htmlFor="grillNumber" className="block mb-2 font-bold">
          {finnish ? 'Grillipöytä' : 'Grill table'}
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
        <p className="mt-5">
          {finnish ? 'Henkilöiden määrä' : 'Number of people'}
        </p>
      </div>

      {/* Buffet number selector */}
      <div className="flex flex-col items-center ">
        <label htmlFor="BuffetNumber" className="block mb-2 font-bold">
          {finnish ? 'Noutopöytä' : 'Buffet'}
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
        <p className="mt-5">
          {finnish ? 'Henkilöiden määrä' : 'Number of people'}
        </p>
      </div>
      {displayAlertModal && (
        <AlertModal
          isOpen={displayAlertModal}
          onClose={() => setDisplayAlertModal(false)}
          message={
            finnish
              ? 'Täysi kapasiteetti saavutettu! Vähennä henkilöitä.'
              : 'Full capacity reached! Reduce the number of people.'
          }
        />
      )}
    </>
  );
};

export default OrderingButtons;
