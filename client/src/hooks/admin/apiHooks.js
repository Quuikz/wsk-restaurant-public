import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const API_URL = import.meta.env.VITE_CUSTOM_AUTH_API;


const useMeal = () => {

    //const token = localStorage.getItem('token');

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

    return { postNewMeal }

}

export { useMeal }