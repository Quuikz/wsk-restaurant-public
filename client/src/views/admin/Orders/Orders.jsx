import { useEffect, useState } from "react";
import {  useOrders, useReservations, useGiftcards, } from "../../../hooks/admin/apiHooks";

import ViewOrderInfoModal from "../../../components/admin/OrderModals/ViewOrderInfoModal";
import { useOrderCommon } from "../../../hooks/common/apiHooks";


/**
 * Component for displaying and managing orders in the admin dashboard.
 * Displays orders with the options to View, Accept or reject orders.
 * 
 * @returns The Orders page for the admin panel, displaying orders and actions.
 */
const Orders = () => {

    const { getAllOrders } = useOrders();
    const { updateOrder } = useOrderCommon();
    const { getReservationsByIDList } = useReservations();
    const { getGiftcardsByIDList } = useGiftcards();

    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewOrderModal, setShowViewOrderModal] = useState(false);

    useEffect(() => {
        const loadAllOrders = async () => {
            const token = localStorage.getItem('token');

            try{
                const orderData = await getAllOrders(token);
                setOrders(orderData);
                //console.log(orderData);
            }
            catch(error){
                console.log('Error in loadAllOrders: ', error);
            }
        };
        loadAllOrders();
    }, []);


    const handleViewOrderInfo = async (order) => {
        const token = localStorage.getItem('token');
        //console.log('Viewing the order id: ', order.id)
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

    const handleAcceptOrder = async (order) => {
        const token = localStorage.getItem('token');

        const acceptOrderData = {
            deleted: 1
        }

        try{
            const acceptOrderResult = await updateOrder(acceptOrderData, token, order.id);
            

            /**
             * Creates a new array based on current orders
             * Each order is processed,
             * returns a new array, if the order's id matches the targeted order,
             * new objected is returned with deleted set to 1.
             * 
             * New array triggers re-render as it replaces previous orders state.
             */
            setOrders((previousOrders) => 
                previousOrders.map((o) => 
                    o.id == order.id ? { ...o, deleted: 1 } : o
                )
            )

            return acceptOrderResult;


        }
        catch(error){
            console.log(`Error in accepting order (ID) ${order.id}: `, error)
        }


    }


    const handleDeclineOrder = async (order) => {
        const token = localStorage.getItem('token');
        console.log('Rejecting the order id: ', order.id)

        const acceptOrderData = {
            deleted: 0
        }

        try{
            const acceptOrderResult = await updateOrder(acceptOrderData, token, order.id);
            
            /**
             * Creates a new array based on current orders
             * Each order is processed,
             * returns a new array, if the order's id matches the targeted order,
             * new objected is returned with deleted set to 0.
             * 
             * New array triggers re-render as it replaces previous orders state.
             */
            setOrders((previousOrders) => 
                previousOrders.map((o) => 
                    o.id == order.id ? { ...o, deleted: 0 } : o
                )
            )
            
            
            return acceptOrderResult;
        }
        catch(error){
            console.log(`Error in accepting order (ID) ${order.id}: `, error)
        }
    }


    return(
        <>
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
                        onClick={() => handleAcceptOrder(order)}>Accept order
                    </button>
                    <button
                        className="border rounded-xl border-black text-white bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeclineOrder(order)}>Reject order
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