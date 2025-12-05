import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const API_URL = import.meta.env.VITE_CUSTOM_AUTH_API;


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

    return { getAllMeals, postNewMeal }

}

export { useMeal }