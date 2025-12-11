import {useEffect, useState} from 'react';

import {useOrderCommon} from '../../../hooks/common/apiHooks';
import {
  useLanguageContext,
  useUserContext,
} from '../../../hooks/contextHooks.js';
import {useGiftcards, useReservations} from '../../../hooks/admin/apiHooks';

/**
 * ShoppingHistory component - Displays user's complete order history.
 *
 * Features:
 * - Fetches all orders for the authenticated user
 * - Retrieves detailed reservation and gift card information for each order
 * - Displays reservations with date, customer count (buffet/grill)
 * - Shows gift cards with value and expiration date
 * - Bilingual support (Finnish/English)
 * - Empty state when no history exists
 * - Automatically loads on component mount and user change
 *
 * @component
 * @returns {React.ReactElement} The rendered shopping history table rows (tbody)
 */
const ShoppingHistory = () => {
  const {getOrdersByUserID} = useOrderCommon();
  const {getReservationsByIDList} = useReservations();
  const {getGiftcardsByIDList} = useGiftcards();

  const [shoppingHistories, setShoppingHistories] = useState([]);

  const {user} = useUserContext();
  const {finnish} = useLanguageContext();

  /**
   * Loads and processes the user's complete shopping history.
   *
   * Process flow:
   * 1. Fetches all orders for the current user
   * 2. For each order, fetches detailed reservation data if reservations exist
   * 3. For each order, fetches detailed gift card data if gift cards exist
   * 4. Combines all data into enriched order objects
   * 5. Updates the shoppingHistories state with complete data
   *
   * @async
   * @function loadUserShoppingHistory
   * @returns {Promise<void>}
   * @throws {Error} Logs error to console if fetching data fails
   *
   * @example
   * // Called automatically on mount and when user changes
   * useEffect(() => {
   *   loadUserShoppingHistory();
   * }, [user]);
   */
  const loadUserShoppingHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      if (user) {
        const data = await getOrdersByUserID(token, user.id);
        const orders = Array.isArray(data) ? data : [data];

        //For each order, get its reservations & giftcards
        const allOrdersWithDetails = await Promise.all(
          orders.map(async (order) => {
            const reservationData = order.reservations?.length
              ? await getReservationsByIDList(token, order.reservations)
              : [];

            const giftcardData = order.gift_cards?.length
              ? await getGiftcardsByIDList(token, order.gift_cards)
              : [];

            return {
              ...order,
              reservationData,
              giftcardData,
            };
          }),
        );

        setShoppingHistories(allOrdersWithDetails);
      } else {
        console.log('null user at loadUserShoppingHistory');
      }
    } catch (error) {
      console.log('Error in loadUserShoppingHistory: ', error);
    }
  };

  /**
   * Effect hook to load shopping history when component mounts or user changes
   * @type {void}
   */
  useEffect(() => {
    loadUserShoppingHistory();
  }, [user]);

  return (
    <>
      {/* User has no history */}
      <tbody>
        {shoppingHistories.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              {finnish ? 'Ei ostohistoriaa' : 'No shopping history'}
            </td>
          </tr>
        )}

        {/* user has shopping history */}
        {shoppingHistories.map((order) => {
          const reservationCount = order.reservationData?.length || 0;
          const giftcardCount = order.giftcardData?.length || 0;

          //Find out what item: Pöytävaraus/lahjakortti/unknown
          const itemType =
            reservationCount > 0
              ? finnish
                ? 'Pöytävaraus'
                : 'Table reservation'
              : giftcardCount > 0
                ? finnish
                  ? 'Lahjakortti'
                  : 'Gift card'
                : finnish
                  ? 'Tuntematon'
                  : 'Unknown';

          const quantity = reservationCount || giftcardCount;

          return (
            <>
              {/* Reservations history */}
              {reservationCount > 0 && (
                <tr>
                  <td colSpan="4" className="bg-orange-50 border p-4">
                    <div className="font-semibold mb-2">
                      <h3 className="text-2xl">
                        {finnish ? 'Varaukset' : 'Reservations'}
                      </h3>
                    </div>

                    <ul className="space-y-1">
                      {order.reservationData.map((res) => (
                        <li key={`res${+res.id}`} className="border-b py-2">
                          <div>
                            <strong>
                              {finnish
                                ? 'Varauksen tiedot:'
                                : 'Reservation info:'}
                            </strong>
                          </div>
                          <div>
                            <strong>{finnish ? 'Päivämäärä:' : 'Date:'}</strong>{' '}
                            {res.date}
                          </div>
                          <div>
                            <strong>
                              {finnish ? 'Noutopöytä:' : 'Buffet:'}
                            </strong>{' '}
                            {res.table_customer_count}{' '}
                            {finnish ? 'henkilöä' : 'persons'}
                          </div>
                          <div>
                            <strong>{finnish ? 'Grilli:' : 'Grill:'}</strong>{' '}
                            {res.grill_customer_count}{' '}
                            {finnish ? 'henkilöä' : 'persons'}
                          </div>
                          <div>
                            <strong>
                              {finnish ? 'Tilausnumero:' : 'Order number:'}
                            </strong>{' '}
                            {order.id}
                          </div>
                          <div>
                            <strong>
                              {finnish ? 'Tilaus aika:' : 'Order time:'}
                            </strong>{' '}
                            {order.timestamp}
                          </div>
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
                      <h3 className="text-2xl">
                        {finnish ? 'Lahjakortit:' : 'Gift cards:'}
                      </h3>
                    </div>

                    <ul className="space-y-1">
                      {order.giftcardData.map((gift) => (
                        <li key={`gif${gift.id}`} className="border-b py-2">
                          <div>
                            <strong>
                              {finnish
                                ? 'Lahjakortin tiedot:'
                                : 'Gift card info:'}
                            </strong>
                          </div>
                          <div>
                            <strong>{finnish ? 'Arvo:' : 'Value:'}</strong>{' '}
                            {gift.value}€
                          </div>
                          <div>
                            <strong>
                              {finnish ? 'Erääntymispvm.:' : 'Expiration date:'}
                            </strong>{' '}
                            {gift.expiration_date}
                          </div>
                          <div>
                            <strong>
                              {finnish ? 'Tilausnumero:' : 'Order number:'}
                            </strong>{' '}
                            {order.id}
                          </div>
                          <div>
                            <strong>
                              {finnish ? 'Tilaus aika:' : 'Order time:'}
                            </strong>{' '}
                            {order.timestamp}
                          </div>
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
};

export default ShoppingHistory;
