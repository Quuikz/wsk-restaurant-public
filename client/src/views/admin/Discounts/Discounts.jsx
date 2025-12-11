import {useEffect, useState} from 'react';
import {useDiscounts} from '../../../hooks/admin/apiHooks';
import DiscountsRow from './DiscountsRow';

/**
 * DiscountsAdmin Component
 *
 * Admin interface for viewing and managing discount codes.
 * Displays a list of all available discounts with their details including
 * discount percentage, code, and validity dates.
 * Requires admin authentication via token stored in localStorage.
 *
 * @component
 * @returns {React.ReactElement} Admin panel displaying discount information in a table format
 *
 * @example
 * return <DiscountsAdmin />
 */
const DiscountsAdmin = () => {
  const {getAllDiscounts} = useDiscounts();
  const [discounts, setDiscounts] = useState([]);

  /**
   * Fetches all discount records from the API.
   * Retrieves the authentication token from localStorage and uses it to
   * authorize the request. Updates the discounts state with fetched data.
   * Logs errors to console if the request fails.
   *
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Logs error message if fetching discounts fails
   *
   * @example
   * await loadAllDiscounts();
   * // Updates discounts state with data from API
   */
  const loadAllDiscounts = async () => {
    const token = localStorage.getItem('token');
    try {
      const discountsData = await getAllDiscounts(token);
      setDiscounts(discountsData);
    } catch (error) {
      console.log('Error loading all discounts data: ', error.message);
    }
  };

  useEffect(() => {
    loadAllDiscounts();
  }, []);

  return (
    <>
      <h1>Giftcards</h1>

      <li className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
        <span>ID</span>
        <span>Discount</span>
        <span>Discount code</span>
        <span>Start date</span>
        <span>End date</span>
      </li>

      <ul>
        {discounts.map((discount) => (
          <DiscountsRow key={discount.id} discount={discount} />
        ))}
      </ul>
    </>
  );
};

export default DiscountsAdmin;
