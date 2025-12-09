

const ReservationRow = ({reservation}) => {

  return (

    <li className="grid grid-cols-7 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">

    {/* GiftCard info */}
      <p className="text-lg font-semibold text-gray-900">{reservation.id}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.date}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.table_customer_count}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.grill_customer_count}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.order}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.user}</p>
      <p className="text-lg font-semibold text-gray-900">{reservation.deleted}</p>


    </li>

  );

};

export default ReservationRow;
