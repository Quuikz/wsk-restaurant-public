import React, { useState } from "react";
import useForm from "../../../hooks/formHooks";
import { useMeal } from "../../../hooks/admin/apiHooks";

const ModifyMealModal = ({meal, isOpen, onClose, onUpdated}) => {

    const { updateMealInfo } = useMeal();

    if(!isOpen){
        return null;
    }



    const doModifyMeal = async () => {
        console.log("doModifyMeal called!");
        console.log("Inputs being sent:", inputs);
        const token = localStorage.getItem('token');
        if(!token){
            return;
        }
        try{
            const result = await updateMealInfo(inputs, token, meal.id);
            console.log(result);
            onUpdated();
            onClose();
        }
        catch(error){
            console.log('Error in doModifyMeal: ', error);
        }
    }

    const {inputs, handleInputChange, handleSubmit } = useForm(doModifyMeal, {
        id: meal.id,
        name_fi: meal.name_fi,
        name_en: meal.name_en,
        description_fi: meal.description_fi,
        description_en: meal.description_en,
        cost: meal.cost,
        type: meal.type,
        image: meal.image
    });

    return(
        <>
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl animate-fadeIn"
    >
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        Modify Meal
      </h2>


    <label
        htmlFor="name_fi"
        className="block mb-2.5 text-sm font-medium text-heading"
    >
        Name (in Finnish)
    </label>
      <div className="space-y-3">
        <input
          type="text"
          id="name_fi"
          name="name_fi"
          value={inputs.name_fi}
          onChange={handleInputChange}
          placeholder="Name (in Finnish)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />


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





}

export default ModifyMealModal;