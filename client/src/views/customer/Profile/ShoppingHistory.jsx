import { useEffect, useState } from "react";
import { useOrderCommon } from "../../../hooks/common/apiHooks";
import { useUserContext } from "../../../hooks/contextHooks.js";
import { useReservations } from "../../../hooks/admin/apiHooks";

const ShoppingHistory = () => {

    const { getOrdersByUserID } = useOrderCommon();
    const { getReservationsByIDList } = useReservations();

    const [shoppingHistories, setShoppingHistories] = useState([]);
    
    const [userReservations, setUserReservations] = useState([]);

    const {user} = useUserContext();


    const loadUserShoppingHistory = async () => {
        const token = localStorage.getItem('token');
        console.log('USER ID:', user?.id);
        try{
            
            const data = await getOrdersByUserID(token, 2);
            console.log(data);
            //setShoppingHistories(result);
            const orders = Array.isArray(data) ? data : [data];

            //For each order, get its reservations & giftcards
            //const all





        }
        catch(error){
            console.log('Error in loadUserShoppingHistory: ', error);
        }
    }

    useEffect(() => {
        loadUserShoppingHistory();
    }, []);



    return(
        <>
        {/* User has no history */}
        <tbody>
            {shoppingHistories.length == 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Ei ostohistoriaa
                </td>
              </tr>
            )}

        {/* user has shopping history */}
        {shoppingHistories.map((order) => {
            
            const reservationCount = order.reservations?.length || 0;
            const giftcardCount = order.gift_cards?.length || 0;

            //Find out what item: Pöytävaraus/lahjakortti/unknown
            const item = reservationCount > 0 ? 'Pöytävaraus' : giftcardCount > 0 ? 'Lahjakortti' : 'Tuntematon?';

            const quantity = reservationCount || giftcardCount;


            return (
            <tr key={order.id}>
                <td className="px-4 py-2 border text-center">
                {new Date(order.timestamp).toLocaleDateString("fi-FI")}
                </td>
                <td className="px-4 py-2 border text-center">{item}</td>
                <td className="px-4 py-2 border text-center">{quantity}</td>
                <td className="px-4 py-2 border text-center">
                {order.cost.toFixed(2)}€
                </td>
            </tr>
            );
        })}
        </tbody>
        
        </>

    );




}

export default ShoppingHistory;