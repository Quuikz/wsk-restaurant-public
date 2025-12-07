import { useEffect, useState } from "react";
import { useOrders } from "../../../hooks/admin/apiHooks";

const Orders = () => {

    const { getAllOrders } = useOrders();
    const [orders, setOrders] = useState([]);

    const [selectedOrder, setSelectedOrder] = useState(null);
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
        console.log('Viewing the order id: ', order.id)
    }

    const handleModifyOrder = async (order) => {
        console.log('Modifying the order id: ', order.id);
    }

    const handleDeleteOrder = async (order) => {
        console.log('Deleting order id: ', order.id);
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
                <span>Location</span>
                <span>View items</span>
                <span>Modify</span>
                <span>Delete</span>
            </li>
 
            {orders.map((order) => (
                <li
                    className="grid grid-cols-8 gap-4 px-4 py-2 border-b"
                    key={order.id}
                >
                    <span>{order.id}</span>
                    <span>{order.user}</span>
                    <span>{order.cost}</span>
                    <span>{order.timestamp}</span>
                    <span>{order.location}</span>
                    <button
                        onClick={() => handleViewOrderInfo(order)}>View order
                    </button>
                    <button
                        onClick={() => handleModifyOrder(order)}>Modify order
                    </button>
                    <button
                        onClick={() => handleDeleteOrder(order)}>Delete order
                    </button>
                </li>
            ))}
        </ul>

        
        
        
        </>
    );




}

export default Orders;