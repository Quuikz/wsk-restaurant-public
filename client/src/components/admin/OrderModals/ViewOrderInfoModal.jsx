import { useEffect } from "react";
import { useOrders } from "../../../hooks/admin/apiHooks";
import { useReservations } from "../../../hooks/admin/apiHooks";

const ViewOrderInfoModal = ({order, onClose}) => {

    //const { getSingleOrder } = useOrders();
    //const { getReservationByUserID } = useReservations();
    //Get reservations by this
    //useEffect


    //Refine and see how DB looks
    return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>

        {/* Basic info */}
        <div className="mb-6">
          <p><strong>User:</strong> {order.user}</p>
          <p><strong>Cost:</strong> {order.cost}</p>
          <p><strong>Timestamp:</strong> {order.timestamp}</p>
          <p><strong>Location:</strong> {order.location}</p>
          <p><strong>Message:</strong> {order.message}</p>
        </div>




        {/* More details: */}
        <div className="grid grid-cols-2 gap-6">

        {/*Left side: Reservations: */}
        <div className="border rounded p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Reservations</h3>
            {order.reservations?.length ? (
            <ul>
                {order.reservations.map((reservation) => (
                <li key={reservation.id}>Reservation ID: {reservation.id}</li>
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
              <li key={giftCard}>Gift Card ID: {giftCard.id}</li>
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