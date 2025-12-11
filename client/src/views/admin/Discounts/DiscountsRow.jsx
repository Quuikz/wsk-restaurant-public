/**
 * DiscountsRow Component
 *
 * Displays a single discount entry as a row in the admin discounts list.
 * Shows discount ID, percentage/amount, code, and validity period (start and end dates).
 * Styled as a grid row with hover effects for better user interaction.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.discount - Discount object containing all discount information
 * @param {number} props.discount.id - Unique identifier for the discount
 * @param {number} props.discount.discount - Discount percentage or amount value
 * @param {string} props.discount.discount_code - Code used by customers to apply the discount
 * @param {string} props.discount.date_start - Start date of the discount validity period
 * @param {string} props.discount.date_end - End date of the discount validity period
 * @returns {React.ReactElement} A list item element displaying discount details in a grid layout
 *
 * @example
 * const discount = {
 *   id: 1,
 *   discount: 15,
 *   discount_code: "SAVE15",
 *   date_start: "2025-01-01",
 *   date_end: "2025-12-31"
 * };
 * return <DiscountsRow discount={discount} />
 */
const DiscountsRow = ({discount}) => {
  return (
    <li className="grid grid-cols-5 items-center gap-4 px-4 py-2 border-b last:border-none bg-white hover:bg-gray-50 transition">
      {/* GiftCard info */}
      <p className="text-lg font-semibold text-gray-900">{discount.id}</p>

      <p className="text-lg font-semibold text-gray-800">{`${discount.discount}`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${discount.discount_code}`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${discount.date_start}`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${discount.date_end}`}</p>
    </li>
  );
};

export default DiscountsRow;
