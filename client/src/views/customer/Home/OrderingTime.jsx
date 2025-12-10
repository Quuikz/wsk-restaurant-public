import {useEffect, useState, useRef, useMemo} from 'react';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

// Available times for ordering
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

// Check available times for given date
const isTimeAvailableForDate = (dateStr, time) => {
  if (!dateStr) return true;

  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  const weekday = d.getDay();

  // Sunday -> closed
  if (weekday === 0) return false;

  // Saturday -> limited hours (9:00-16:00)
  if (weekday === 6) {
    const hour = Number(time.split(':')[0]);
    return hour >= 9 && hour <= 16;
  }

  // Weekday -> all times available
  return true;
};

const OrderingTime = ({
  reservationDate,
  reservationTime,
  setReservationTime,
}) => {
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const menuRef = useRef(null);
  const {finnish} = useLanguageContext();

  // Memoized available times for the selected date
  const hasAvailableTimes = useMemo(() => {
    return TIMES.some((t) => isTimeAvailableForDate(reservationDate, t));
  }, [reservationDate]);

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

  useEffect(() => {
    setSelectedTime(reservationTime);
  }, [reservationTime]);

  // Invalidate selected time if not available for the date
  //useEffect(() => {
  //  if (selectedTime && !availableTimes.includes(selectedTime)) {
  //    setSelectedTime(null);
  //  }
  //}, [reservationDate, availableTimes, selectedTime]);

  const handleButtonToggle = () => {
    if (!hasAvailableTimes) return;
    setTimeMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center" ref={menuRef}>
      <label htmlFor="reservationDate" className="block mb-2 font-bold">
        {finnish ? 'Aika' : 'Time'}
      </label>

      <button
        type="button"
        onClick={handleButtonToggle}
        aria-expanded={timeMenuOpen}
        aria-haspopup="menu"
        aria-disabled={!hasAvailableTimes}
        disabled={!hasAvailableTimes}
        className={`relative inline-flex items-center justify-center rounded-md w-48 px-3 py-2 border
          ${!hasAvailableTimes ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
      >
        <span className="sr-only">Open time menu</span>
        {!hasAvailableTimes
          ? finnish
            ? 'Suljettu'
            : 'Closed'
          : (selectedTime ?? (finnish ? 'Valitse aika' : 'Select time'))}
      </button>

      {/* Time selection menu */}
      {timeMenuOpen && (
        <div
          role="menu"
          aria-label="Aika valinnat"
          className="absolute left-1/2 -translate-x-1/2 top-19 z-10 w-48 divide-y divide-gray-300 rounded-md overflow-hidden bg-white shadow-lg"
        >
          {/* Time selection menu items */}
          {TIMES.map((t) => {
            const isAvailable = isTimeAvailableForDate(reservationDate, t);
            return (
              <button
                key={t}
                type="button"
                role="menuitem"
                disabled={!isAvailable}
                onClick={() => {
                  if (isAvailable) {
                    setSelectedTime(t);
                    setReservationTime(t);
                    setTimeMenuOpen(false);
                  }
                }}
                className={`block w-full px-4 py-2 text-sm text-left ${
                  isAvailable
                    ? 'text-black hover:bg-black/5 cursor-pointer'
                    : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderingTime;
