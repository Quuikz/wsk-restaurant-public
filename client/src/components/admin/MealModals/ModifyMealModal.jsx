import React, {useState} from 'react';
import useForm from '../../../hooks/formHooks';
import {useMeal} from '../../../hooks/admin/apiHooks';

/**
 *
 * @param {Object} meal - The meal object to be modified.
 * @param {boolean} isOpen - Determines whether the modal is open.
 * @param {Function} onClose - Callback to close the modal.
 * @param {Function} onUpdated - Callback to trigger after the meal object has updates.
 */
const ModifyMealModal = ({meal, isOpen, onClose, onUpdated}) => {
  const {updateMealInfo} = useMeal();
  const [file, setFile] = useState(null);

  if (!isOpen) {
    return null;
  }

  /**
   * Handles the form submission to modify meal object.
   * Uses the 'updateMealInfo' API hook with the data, token and meal ID.
   *
   */
  const doModifyMeal = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const updatedMeal = {
      id: inputs.id,
      name_fi: inputs.name_fi,
      name_en: inputs.name_en,
      description_fi: inputs.description_fi,
      description_en: inputs.description_en,
      cost: parseFloat(inputs.cost),
      type: inputs.type,
      image: file ? `/images/${file.name}` : inputs.image, // if using a new file, just send path
    };

    try {
      const result = await updateMealInfo(updatedMeal, token, meal.id);
      console.log(result);
      onUpdated();
      onClose();
    } catch (error) {
      console.log('Error in doModifyMeal: ', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doModifyMeal, {
    id: meal.id,
    name_fi: meal.name_fi,
    name_en: meal.name_en,
    description_fi: meal.description_fi,
    description_en: meal.description_en,
    cost: meal.cost,
    type: meal.type,
    image: meal.image,
  });

  /**
   *
   * @param evt - Event triggered when a file is selected.
   * - 'evt.target.files' - An array-like object containing all selected files.
   * - 'evt.target.files[0]' - Takes the first file - one is expected anyways.
   */
  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-4 rounded-xl shadow-xl"
        >
          <div>
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              Modify Meal
            </h2>

            {/*Menu: Image Upload */}
            <div className="flex items-center gap-4">
              {/* Image preview */}
              <div>
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : 'https://placehold.co/200?text=Choose+image'
                  }
                  alt="preview"
                  width="200"
                />
              </div>

              {/* Upload button */}
              <div>
                <label
                  htmlFor="file"
                  className="cursor-pointer px-4 py-2 text-white rounded-md bg-gray-400 hover:bg-gray-500"
                >
                  Valitse tiedosto
                </label>
                <input
                  name="file"
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label
                  htmlFor="name_fi"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Name (in Finnish)
                </label>
                <input
                  type="text"
                  id="name_fi"
                  name="name_fi"
                  value={inputs.name_fi}
                  onChange={handleInputChange}
                  placeholder="Name (in Finnish)"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="name_en"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Name (in English)
                </label>
                <input
                  type="text"
                  id="name_en"
                  name="name_en"
                  value={inputs.name_en}
                  onChange={handleInputChange}
                  placeholder="Name (in English)"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <label
              htmlFor="description_fi"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Description (in Finnish)
            </label>
            <input
              type="text"
              id="description_fi"
              name="description_fi"
              value={inputs.description_fi}
              onChange={handleInputChange}
              placeholder="Description (in Finnish)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <label
              htmlFor="description_en"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Description (in English)
            </label>
            <input
              type="text"
              id="description_en"
              name="description_en"
              value={inputs.description_en}
              onChange={handleInputChange}
              placeholder="Description (in English)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <label
              htmlFor="cost"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Cost
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={inputs.cost}
              onChange={handleInputChange}
              placeholder="Cost"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            {/* More fields, probably all except id and img */}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModifyMealModal;
