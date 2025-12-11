import {useEffect, useState, useRef, useMemo} from 'react';
import {useLanguageContext} from '../../../hooks/contextHooks.js';

import {useReservationCommon} from '../../../hooks/common/apiHooks.js';

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

/**
 * OrderingTime component - Time selection dropdown for restaurant reservations
 * Displays available reservation times for a selected date, checking real-time availability
 * and restaurant operating hours. Disables unavailable times and closed days.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.reservationDate - Selected reservation date in ISO format (YYYY-MM-DD)
 * @param {string} props.reservationTime - Currently selected reservation time
 * @param {Function} props.setReservationTime - Callback to update the selected time
 * @returns {JSX.Element} Dropdown button with time selection menu
 *
 * @example
 * <OrderingTime
 *   reservationDate="2024-12-15"
 *   reservationTime="12:00"
 *   setReservationTime={(time) => setTime(time)}
 * />
 */
const OrderingTime = ({
  reservationDate,
  reservationTime,
  setReservationTime,
}) => {
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeAvailability, setTimeAvailability] = useState({});
  const {getReservationOnDateTime} = useReservationCommon();
  const menuRef = useRef(null);
  const {finnish} = useLanguageContext();

  /**
   * Checks if the restaurant is open on the given date
   * Returns false for Sundays (closed day), true for all other days
   *
   * @function isTimeAvailableForDate
   * @param {string} reservationDate - Date in ISO format (YYYY-MM-DD)
   * @returns {boolean} True if the restaurant is open on that date
   */
  const isTimeAvailableForDate = (reservationDate) => {
    //console.log('CHECKING AVAILABILITY FOR: ', dateTime);
    if (!reservationDate) return true;

    const [year, month, day] = reservationDate.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    const weekday = d.getDay();

    // Sunday -> closed
    if (weekday === 0) return false;

    return true;
  };

  /**
   * Checks availability for a single time slot on a given date
   * Queries the server for reservation count and applies business rules
   * (e.g., Saturday hour restrictions, reservation limits)
   *
   * @async
   * @function checkTimeAvailability
   * @param {string} date - Date in ISO format (YYYY-MM-DD)
   * @param {string} time - Time in HH:MM format
   * @returns {Promise<boolean>} True if time slot has availability (≤5 reservations)
   */
  const checkTimeAvailability = async (date, time) => {
    const dateTime = date + ' ' + time + ':00';

    const [year, month, day] = reservationDate.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    const weekday = d.getDay();
    //console.log(dateTime);
    try {
      const token = localStorage.getItem('token');
      const data = await getReservationOnDateTime(token, dateTime);
      //console.log(data);

      // Saturday -> closed
      if (
        (weekday === 6 && time === '17:00') ||
        (weekday === 6 && time === '8:00')
      ) {
        return false;
      }
      return data <= 5; // Set limit for reservations
    } catch (error) {
      console.log('Error checking time availability:', error);
      return true;
    }
  };

  // Load availability for all times when date changes
  useEffect(() => {
    const loadAllTimeAvailability = async () => {
      const availability = {};
      for (const time of TIMES) {
        availability[time] = await checkTimeAvailability(reservationDate, time);
      }
      setTimeAvailability(availability);
    };

    if (reservationDate) {
      loadAllTimeAvailability();
    }
  }, [reservationDate]);

  // Memoized available times for the selected date
  const hasAvailableTimes = useMemo(() => {
    return TIMES.some((t) => isTimeAvailableForDate(reservationDate, t));
  }, [reservationDate]);

  const handleButtonToggle = () => {
    if (!hasAvailableTimes) return;
    setTimeMenuOpen((prev) => !prev);
  };

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
        className={`relative inline-flex items-center justify-center rounded-md w-30 px-3 py-2 border
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
            const isAvailable = timeAvailability[t] !== false;
            //console.log('TIME ', t, ' AVAILABLE: ', isAvailable);
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
