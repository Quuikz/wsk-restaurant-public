import MealRow from "../../../components/admin/MealRow";

const MenuRow = ({ menuItem }) => {




  return (
    <li className="p-4 border rounded bg-gray-50 mb-6">

        {/* MENU HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Menu #{menuItem.id}</h2>

        <div className="text-sm text-gray-600">
            <p>Week: week44</p>
            <p>Date: {menuItem.date || "N/A"}</p>
        </div>
      </div>

      {/* Add Meal */}
      <button
        onClick={() => console.log("ADD meal for menu", menuItem.id)}
        className="mb-4 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ➕ Add Meal
      </button>

      {/* Meals list */}
      {/*TODO: refine style */}
            <li className="grid grid-cols-7 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Name FI</span>
            <span>Name EN</span>
            <span>Type</span>
            <span>Cost</span>
            <span>Edit</span>
            <span>Delete</span>
        </li>
      <ul className="divide-y">
        {menuItem.meals.map((meal) => (
          <MealRow
            key={meal.id}
            meal={meal}
            onModify={() => console.log("Modify meal", meal.id)}
            onDelete={() => console.log("Delete meal", meal.id)}
          />
        ))}
      </ul>

    </li>
  );
};

export default MenuRow;
