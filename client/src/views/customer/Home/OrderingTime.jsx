import {useEffect, useState, useRef, useMemo} from 'react';

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
const getAvailableTimesForDate = (dateStr) => {
  if (!dateStr) return TIMES.slice();

  const d = new Date(dateStr);

  const weekday = d.getDay();

  // Sunday -> closed
  if (weekday === 0) {
    return [];
  }

  // Saturday -> limited hours
  if (weekday === 6) {
    return TIMES.filter((t) => {
      const hour = Number(t.split(':')[0]);
      return hour >= 9 && hour <= 16;
    });
  }

  // Weekday -> full range
  return TIMES.slice();
};

const OrderingTime = ({ reservationDate, reservationTime, setReservationTime }) => {
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const menuRef = useRef(null);

  // Memoized available times for the selected date
  const availableTimes = useMemo(
    () => getAvailableTimesForDate(reservationDate),
    [reservationDate],
  );

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
    // Keep closed if no available times
    if (availableTimes.length === 0) return;
    setTimeMenuOpen((prev) => !prev);
  };

  const isClosed = availableTimes.length === 0;

  return (
    <div className="relative flex flex-col items-center" ref={menuRef}>
      <label htmlFor="reservationDate" className="block mb-2 font-bold">
        Kellon aika
      </label>

      <button
        type="button"
        onClick={handleButtonToggle}
        aria-expanded={timeMenuOpen}
        aria-haspopup="menu"
        aria-disabled={isClosed}
        disabled={isClosed}
        className={`relative inline-flex items-center justify-center rounded-md w-48 px-3 py-2 border
          ${isClosed ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
      >
        <span className="sr-only">Open time menu</span>
        {isClosed ? 'Suljettu' : (selectedTime ?? 'Valitse aika')}
      </button>

      {/* Time selection menu */}
      {timeMenuOpen && (
        <div
          role="menu"
          aria-label="Aika valinnat"
          className="absolute left-1/2 -translate-x-1/2 top-19 z-10 w-48 divide-y divide-gray-300 rounded-md overflow-hidden bg-white shadow-lg"
        >
          {/* Time selection menu items */}
          {availableTimes.length > 0 ? (
            availableTimes.map((t) => (
              <button
                key={t}
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelectedTime(t);
                  setReservationTime(t);
                  setTimeMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-black hover:bg-black/5 text-left"
              >
                {t}
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              Suljettu tänä päivänä
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderingTime;
