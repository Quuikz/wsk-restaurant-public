import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const API_URL = import.meta.env.VITE_CUSTOM_AUTH_API;


//TODO: common apiHooks.js for some GET requests ?

const useMeal = () => {

    //const token = localStorage.getItem('token');


    const getAllMeals = async () => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const getAllMealsResult = await fetchData(API_URL + '/meals', fetchOptions);
        return getAllMealsResult;
    }

    //Add new meal
    const postNewMeal = async (inputs, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(inputs),
        };

        const newMealResult = await fetchData(API_URL + '/meals/', fetchOptions);
        return newMealResult;
    };

    //Update meal info
    const updateMealInfo = async (inputs, token, mealID) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify(inputs),
        };

        const updatedMealResult = await fetchData(API_URL + `meals/${mealID}`, fetchOptions);
        return updatedMealResult;
    }




    return { getAllMeals, postNewMeal, updateMealInfo }
}


const useMenu = () => {

    const getAllMenuItems = async () =>{
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const getAllMenuItemsResult = await fetchData(API_URL + '/menus', fetchOptions);
        return getAllMenuItemsResult;
    }

    return { getAllMenuItems }


}

export { useMeal, useMenu }