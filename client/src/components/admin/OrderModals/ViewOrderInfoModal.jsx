import { useEffect } from "react";
import { useOrders } from "../../../hooks/admin/apiHooks";
import { useReservations } from "../../../hooks/admin/apiHooks";

const ViewOrderInfoModal = ({order, onClose}) => {

    
    return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center">
      <div className="mt-16 bg-white p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>

        {/* Basic info */}
        <div className="mb-6">
          <p><strong>User:</strong> {order.user}</p>
          <p><strong>Cost:</strong> {order.cost}</p>
          <p><strong>Timestamp:</strong> {order.timestamp}</p>
        </div>




        {/* More details: */}
        <div className="grid grid-cols-2 gap-6">

        {/*Left side: Reservations: */}
        <div className="border rounded p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Reservations</h3>
            {order.reservations?.length ? (
            <ul>
                {order.reservations.map((reservation) => (
                <li key={reservation.id} className="p-2 border-b">
                  <p><span className="font-semibold">Reservation ID: </span>{reservation.id}</p>
                  <p><span className="font-semibold"> Date: </span>{reservation.date}</p>
                  <p><span className="font-semibold">Table: </span>{reservation.table_customer_count} Customers</p>
                  <p><span className="font-semibold">Grill: </span>{reservation.grill_customer_count} Customers</p>
                </li>
                ))}
            </ul>
            ) : (
            <p>No reservations found for this order</p>
            )}

        </div>

        
        {/* Right side: Gift cards */}
        <div className="border rounded p-4 shadow-sm">

        
        <h3 className="text-lg font-semibold">Gift Cards</h3>
        {order.gift_cards?.length ? (
          <ul>
            {order.gift_cards.map((giftCard) => (
              <li key={giftCard.id}>
                <p><span className="font-semibold">Gift Card ID: </span>{giftCard.id}</p>
                <p><span className="font-semibold">Value: </span>{giftCard.value} €</p>
                <p><span className="font-semibold">Expiration date: </span>{giftCard.expiration_date}</p>
              
              
              </li>
            ))}
          </ul>
        ) : (
          <p>No gift cards found for this order</p>
        )}
        </div>

        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewOrderInfoModal;