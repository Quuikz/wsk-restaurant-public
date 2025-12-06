import React, { useState } from "react";
import useForm from "../../../hooks/formHooks";
import { useMeal } from "../../../hooks/admin/apiHooks";

const ModifyMealModal = ({meal, isOpen, onClose}) => {

    const { updateMealInfo } = useMeal();

    if(!isOpen){
        return null;
    }



    const doModifyMeal = async () => {
        const token = localStorage.getItem('token');
        if(!token){
            return;
        }
        try{
            const result = await updateMealInfo(inputs, token, meal.id);
            console.log(result);
        }
        catch(error){
            console.log('Error in doModifyMeal: ', error);
        }
    }

    const {inputs, handleInputChange, handleSubmit } = useForm(doModifyMeal, {
        name_fi: meal.name_fi,
        name_en: meal.name_en,
        description_fi: meal.description_fi,
        description_en: meal.description_en,
        cost: meal.cost,

    });

    return(
        <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded w-96">

                
                <h2 className="text-xl font-bold mb-4">Modify Meal</h2>
                <input
                type="text"
                name="name_fi"
                value={inputs.name_fi}
                onChange={handleInputChange}
                placeholder="Name FI"
                className="w-full mb-2 p-2 border rounded"
                />
                <input
                type="text"
                name="name_en"
                value={inputs.name_en}
                onChange={handleInputChange}
                placeholder="Name EN"
                className="w-full mb-2 p-2 border rounded"
                />
                <input
                type="number"
                name="cost"
                value={inputs.cost}
                onChange={handleInputChange}
                placeholder="Cost"
                className="w-full mb-2 p-2 border rounded"
                />
                {/* Add more fields as needed */}
                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </form>
        </div>
        </>
    );





}

export default ModifyMealModal;