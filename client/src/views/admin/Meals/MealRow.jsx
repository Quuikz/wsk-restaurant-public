const MealRow = ({meal, onModify, onDelete}) => {
  return (
    <>
      <li className="grid grid-cols-7 items-center gap-4 px-4 py-3 border-b last:border-none bg-white hover:bg-gray-50 transition">
        
        
        {/* Meal info */}

        <p className="text-lg font-semibold text-gray-800">{meal.id}</p>

        <p className="text-lg font-semibold text-gray-800">
          {`${meal.name_fi}`}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {`${meal.name_en}`}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {`${meal.name_type}`}
        </p>
        <p className="text-lg font-semibold text-gray-800">
          {`${meal.cost}`}
        </p>

        {/* Buttons */}
        <button
          onClick={onModify}
          className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Modify Meal
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete Meal
        </button>
      </li>
    </>
  );
};

export default MealRow;
