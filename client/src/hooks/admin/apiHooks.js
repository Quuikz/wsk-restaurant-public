import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const API_URL = import.meta.env.VITE_CUSTOM_AUTH_API;


const useMeal = () => {

    //Add new meal
    const postNewMeal = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };

        const newMealResult = await fetchData(API_URL + '', fetchOptions);
        return newMealResult;
    };

    return { postNewMeal }

}

export { useMeal }