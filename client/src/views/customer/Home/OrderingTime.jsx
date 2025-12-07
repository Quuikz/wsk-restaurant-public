import {useEffect, useState, useRef} from 'react';

const TIMES = [
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

const OrderingTime = ({reservationDate}) => {
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const menuRef = useRef(null);
  console.log(reservationDate);

  // Close when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setTimeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <>
      <div className="relative flex-col items-center" ref={menuRef}>
        <label htmlFor="reservationDate" className="block mb-2 font-bold">
          Kellon aika
        </label>
        <button
          type="button"
          onClick={() => setTimeMenuOpen((prev) => !prev)}
          aria-expanded={timeMenuOpen}
          aria-haspopup="menu"
          className="relative inline-flex items-center justify-center rounded-md bg-white border border-gray-300 hover:bg-gray-100 w-48 px-3 py-2"
        >
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          {selectedTime ?? 'Valitse aika'}
        </button>

        {/* -- Time options -- */}
        {timeMenuOpen && (
          <div
            role="menu"
            aria-label="Aika valinnat"
            className="absolute left-1/2   -translate-x-1/2 z-10 w-48 divide-y divide-gray-300 rounded-md overflow-hidden bg-white shadow-lg"
          >
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelectedTime(t);
                  setTimeMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-black hover:bg-black/5 text-left"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderingTime;
