import { useEffect, useState } from "react";
import { useOrders } from "../../../hooks/admin/apiHooks";

const Orders = () => {

    const { getAllOrders } = useOrders();
    const [orders, setOrders] = useState();

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModifyOrderModal, setShowModifyOrderModal] = useState(false);
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);

    useEffect(() => {
        const loadAllOrders = async () => {
            try{
                const orderData = await getAllOrders();
                setOrders(orderData);
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
            <li className="grid grid-cols-7 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
                <span>ID</span>
                <span>User</span>
                <span>Cost</span>
                <span>Timestamp</span>
                <span>Locatin</span>
                <span>View items</span>
                <span>Modify</span>
                <span>Delete</span>
            </li>
        </ul>

        <ul>
            {orders.map((order) => (
                <OrderRow 
                    key={order.id}
                    order={order}
                    onView={() => handleViewOrderInfo(order)}
                    onModify={() => handleModifyOrder(order)}
                    onDelete={() => handleDeleteOrder(order)}

                />
            ))}
        </ul>

        
        
        
        </>
    );




}

export default Orders;