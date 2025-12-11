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
