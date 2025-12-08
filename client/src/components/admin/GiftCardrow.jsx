const GiftCardRow = ({giftCard}) => {
  return (
    <li className="grid grid-cols-6 items-center gap-4 px-4 py-2 border-b last:border-none bg-white hover:bg-gray-50 transition">
      
      {/* GiftCard info */}
      <p className="text-lg font-semibold text-gray-900">{giftCard.id}</p>

      <p className="text-lg font-semibold text-gray-800">{`${giftCard.value}€`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${giftCard.expiration_date}`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${giftCard.order}`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${giftCard.user}`}</p>

      <p className="text-lg font-semibold text-gray-800">{`${giftCard.deleted ? 'Used' : 'Unused'}`}</p>


    </li>
  );
};

export default GiftCardRow;
