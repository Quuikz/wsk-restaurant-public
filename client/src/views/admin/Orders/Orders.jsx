import { useEffect, useState } from "react";
import {  useOrders, useReservations, useGiftcards, } from "../../../hooks/admin/apiHooks";
//import {  } from "../../../hooks/admin/apiHooks"; 

import ViewOrderInfoModal from "../../../components/admin/OrderModals/ViewOrderInfoModal";

const Orders = () => {

    const { getAllOrders } = useOrders();
    const { getReservationsByIDList } = useReservations();
    const { getGiftcardsByIDList } = useGiftcards();

    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewOrderModal, setShowViewOrderModal] = useState(false);
    const [showModifyOrderModal, setShowModifyOrderModal] = useState(false);
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);

    useEffect(() => {
        const loadAllOrders = async () => {
            const token = localStorage.getItem('token');

            try{
                const orderData = await getAllOrders(token);
                setOrders(orderData);
                console.log(orderData);
            }
            catch(error){
                console.log('Error in loadAllOrders: ', error);
            }
        };
        loadAllOrders();
    }, []);


    const handleViewOrderInfo = async (order) => {
        const token = localStorage.getItem('token');
        console.log('Viewing the order id: ', order.id)
        let reservations = [];
        let giftcards = [];

        if(order.reservations?.length > 0){
            reservations = await getReservationsByIDList(token, order.reservations);
        }

        if(order.gift_cards?.length > 0){
            giftcards = await getGiftcardsByIDList(token, order.gift_cards);
        }


        setSelectedOrder({
            ...order,
            reservations: reservations,
            gift_cards: giftcards
        });

        setShowViewOrderModal(true);
    }

    const handleModifyOrder = async (order) => {
        console.log('Modifying the order id: ', order.id);
    }


    return(
        <>
        {/*TODO: refine style */}
        <ul>
            <li className="grid grid-cols-8 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
                <span>ID</span>
                <span>User</span>
                <span>Cost</span>
                <span>Timestamp</span>
                <span>Status</span>
                <span>View order</span>
                <span>Accept</span>
                <span>Reject</span>
            </li>
 
            {orders.map((order) => (
                <li
                    className="grid grid-cols-8 gap-4 px-4 py-2 border-b text-lg"
                    key={order.id}
                >
                    <span>{order.id}</span>
                    <span>{order.user}</span>
                    <span>{order.cost}</span>
                    <span>{order.timestamp}</span>
                    <span
                        className={order.deleted ? 'text-green-500' : 'text-red-500'}
                    
                    >{order.deleted ? 'Accepted' : 'Pending'}
                    </span>
                    <button
                        className="border rounded-xl border-black bg-gray-300 hover:bg-gray-400"
                        onClick={() => handleViewOrderInfo(order)}>View order
                    </button>
                    <button
                        className="border rounded-xl border-black text-white bg-green-600 hover:bg-green-700"
                        onClick={() => handleModifyOrder(order)}>Accept order
                    </button>
                    <button
                        className="border rounded-xl border-black text-white bg-red-600 hover:bg-red-700"
                        onClick={() => handleModifyOrder(order)}>Reject order
                    </button>

                </li>
            ))}
        </ul>

        {/* View more details on order */}
        {showViewOrderModal && selectedOrder && (
            <ViewOrderInfoModal 
                order={selectedOrder}
                onClose={() => setShowViewOrderModal(false)}            
            />
        )}
        </>
    );

}

export default Orders;