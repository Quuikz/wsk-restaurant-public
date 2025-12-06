import { useMeal } from "../../../hooks/admin/apiHooks";

const DeleteMealModal = ({meal, isOpen, onClose, onDeleted}) => {

    const { deleteMeal } = useMeal();

    if(!isOpen){
        return null;
    }
;
    const handleDelete = async () => {
        try{
            const token = localStorage.getItem('token');
            if(!token){
                return;
            }

            const result = await deleteMeal(token, meal.id);
            console.log(result);

            onDeleted(meal.id);
            onClose();
        }
        catch(error){
            console.log('Error in doDeleteMeal: ', error);
        }
    };


    return(
        <>
        <>
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white rounded-xl w-full max-w-sm shadow-xl p-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-3 text-red-600 flex items-center gap-2">
        Delete Meal?
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Are you sure you want to delete <b>Meal: {meal.id} {meal.name_fi}</b>?<br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-sm transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</>
        </>
    );

}

export default DeleteMealModal;