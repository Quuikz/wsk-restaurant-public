/**
 * Row component to display a meal in a list.
 * Shows Meal's ID, name, description, cost and an image.
 *
 * @param {Object} meal - The meal object to be displayed.
 *  - 'meal.id' {number} - ID of the meal.
 *  - 'meal.name_fi' {string} - - Meal name in finnish.
 *  - 'meal.name_en' {string} - - Meal name in english.
 *  - 'meal.description_fi' {string} - - Meal description in finnish.
 *  - 'meal.description_en' {string} - - Meal description in english.
 *  - 'meal.cost' {number} - Meal's price in euros.
 *  - 'meal.image' {string} - Filename of the meal image.
 *
 * @param {Function} onModify - Callback triggered when the Modify Meal button is clicked.
 * @param {Function} onDelete - Callback triggered when the Delete Meal button is clicked.
 * @param {boolean} showModifyButton - Determines whether to show the Modify Meal button.
 */
const MealRow = ({meal, onModify, onDelete, showModifyButton}) => {
  let SERVER_URL = import.meta.env.VITE_SERVER_URL;
  if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
    SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  }

  const mealImages = SERVER_URL + `/images/meals/`;

  return (
    <li
      className={
        'grid items-center gap-4 px-4 py-3 border-b last:border-none bg-white hover:bg-gray-50 transition ' +
        (showModifyButton ? 'grid-cols-7' : 'grid-cols-6')
      }
    >
      {/* Meal info */}

      {/* Meal image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={meal ? mealImages + meal.image : mealImages + 'placeholder.jpg'}
          alt="An image of meal"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <p className="text-lg font-semibold text-gray-800">{meal.id}</p>

      {/* Names */}
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-800">
          {`${meal.name_fi}`}
        </p>
        <p className="text-lg text-gray-600">{`${meal.name_en}`}</p>
      </div>

      {/* Descriptions */}
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-800">
          {`${meal.description_fi}`}
        </p>
        <p className="text-lg text-gray-600">{`${meal.description_en}`}</p>
      </div>

      <p className="text-lg font-semibold text-gray-800">{`${meal.cost.toFixed(2)} €`}</p>

      {/* Buttons */}
      {showModifyButton ? (
        <>
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
        </>
      ) : (
        <>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete Meal
          </button>
        </>
      )}
    </li>
  );
};

export default MealRow;
