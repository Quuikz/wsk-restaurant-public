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
        <p><strong>User:</strong> {order.user}</p>
        <p><strong>Cost:</strong> {order.cost}</p>
        <p><strong>Timestamp:</strong> {order.timestamp}</p>
        <p><strong>Location:</strong> {order.location}</p>
        <p><strong>Message:</strong> {order.message}</p>

        <hr className="my-3" />

        {/* Reservations */}
        <h3 className="text-lg font-semibold">Reservations</h3>
        {order.reservation_id?.length ? (
          <ul>
            {order.reservation_id.map((resID) => (
              <li key={resID}>Reservation ID: {resID}</li>
            ))}
          </ul>
        ) : (
          <p>No reservations</p>
        )}

        <hr className="my-3" />

        {/* Gift cards */}
        <h3 className="text-lg font-semibold">Gift Cards</h3>
        {order.gift_card_id?.length ? (
          <ul>
            {order.gift_card_id.map((gcID) => (
              <li key={gcID}>Gift Card ID: {gcID}</li>
            ))}
          </ul>
        ) : (
          <p>No gift cards</p>
        )}

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