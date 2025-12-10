const MealRow = ({meal, onModify, onDelete, showModifyButton}) => {
  return (
      <div>
        <ul>
      <li className={
        `grid items-center gap-4 px-4 py-3 border-b last:border-none bg-white hover:bg-gray-50 transition ` +
        (showModifyButton ? "grid-cols-6" : "grid-cols-5")
      }>
        
        
        {/* Meal info */}

        <p className="text-lg font-semibold text-gray-800">{meal.id}</p>

      {/* Names */}
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-800">
          {`${meal.name_fi}`}
        </p>
        <p className="text-lg text-gray-600">
          {`${meal.name_en}`}
        </p>
      </div>
        
        {/* Descriptions */}
        <div className="space-y-1">
          <p className="text-lg font-semibold text-gray-800">
            {`${meal.description_fi}`}
          </p>
          <p className="text-lg text-gray-600">
            {`${meal.description_en}`}
          </p>
        </div>


        <p className="text-lg font-semibold text-gray-800">
          {`${meal.cost}€`}
        </p>

        {/* Buttons */}
        {showModifyButton ? (
          <>
          <button
          onClick={onModify}
          className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >Modify Meal
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >Delete Meal
        </button>
          </>
        ) : (
          <>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >Delete Meal
          </button>
          </>
        )}
        
      </li>
      </ul>
      </div>
  );
};

export default MealRow;
