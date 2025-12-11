/**
 * Component for displaying a single reservation row in the reservations list.
 */
const ReservationRow = ({reservation}) => {

  return (

    <li className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">

    {/* GiftCard info */}
      <p className="text-lg font-semibold text-gray-900">{reservation.id}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.date}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.table_customer_count}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.grill_customer_count}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.order}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.user}</p>
    </li>

  );

};

export default ReservationRow;
