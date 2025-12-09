import { useEffect, useState } from "react";
import { useOrderCommon } from "../../../hooks/common/apiHooks";
import { useUserContext } from "../../../hooks/contextHooks.js";
import { useGiftcards, useReservations } from "../../../hooks/admin/apiHooks";

const ShoppingHistory = () => {

    const { getOrdersByUserID } = useOrderCommon();
    const { getReservationsByIDList } = useReservations();
    const { getGiftcardsByIDList } = useGiftcards();

    const [shoppingHistories, setShoppingHistories] = useState([]);
    
    const [userReservations, setUserReservations] = useState([]);

    const {user} = useUserContext();


    const loadUserShoppingHistory = async () => {
        const token = localStorage.getItem('token');
        console.log('USER ID:', user?.id);
        try{
            
            const data = await getOrdersByUserID(token, 1);
            console.log(data);
            //setShoppingHistories(result);
            const orders = Array.isArray(data) ? data : [data];

            //For each order, get its reservations & giftcards
            const allOrdersWithDetails = await Promise.all(
                orders.map(async (order) => {
                    const reservationData = order.reservations?.length 
                        ? await getReservationsByIDList(token, order.reservations ) : [];
                
                    const giftcardData = order.gift_cards?.length
                        ? await getGiftcardsByIDList(token, order.gift_cards) : [];
                
                    
                    return {
                        ...order,
                        reservationData,
                        giftcardData,
                    };
                })
            );

            console.log(allOrdersWithDetails);
            setShoppingHistories(allOrdersWithDetails);
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
            
            const reservationCount = order.reservationData?.length || 0;
            const giftcardCount = order.giftcardData?.length || 0;

            //Find out what item: Pöytävaraus/lahjakortti/unknown
            const itemType = reservationCount > 0 ? 'Pöytävaraus' : giftcardCount > 0 ? 'Lahjakortti' : 'Tuntematon?';

            const quantity = reservationCount || giftcardCount;


            return (
            <>

        {/* Reservations history */}
        {reservationCount > 0 && (
          <tr>
            <td colSpan="4" className="bg-orange-50 border p-4">
              <div className="font-semibold mb-2">
                <h3 className="text-2xl">Varaukset:</h3>
              </div>

              <ul className="space-y-1">
                {order.reservationData.map((res) => (
                  <li key={res.id} className="border-b py-2">
                    <div><strong>Varauksen tiedot:</strong></div>
                    <div><strong>Päivä:</strong> {res.date}</div>
                    <div><strong>Noutopöytä:</strong> {res.table_customer_count} henkilö(ä)</div>
                    <div><strong>Grilli:</strong> {res.grill_customer_count} henkilö(ä)</div>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        )}

        {/* Giftcards history */}
        {giftcardCount > 0 && (
          <tr>
            <td colSpan="4" className="bg-orange-50 border p-4">
              <div className="font-semibold mb-2">
                <h3 className="text-2xl">Lahjakortit:</h3>
              </div>

              <ul className="space-y-1">
                {order.giftcardData.map((gift) => (
                  <li key={gift.id} className="border-b py-2">
                    <div><strong>Lahjakortin tiedot:</strong></div>
                    <div><strong>Arvo:</strong> {gift.value}€</div>
                    <div><strong>Erääntymispvm:</strong> {gift.expiration_date}</div>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        )}
      </>
            );
        })}
        </tbody>
        
        </>

    );




}

export default ShoppingHistory;