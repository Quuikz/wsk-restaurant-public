import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

const API_URL = import.meta.env.VITE_CUSTOM_AUTH_API;


//TODO: common apiHooks.js for some GET requests ?

const useMeal = () => {

    //const token = localStorage.getItem('token');

    /*
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
        */

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

        const updatedMealResult = await fetchData(API_URL + `/meals/${mealID}`, fetchOptions);
        return updatedMealResult;
    }

    const deleteMeal = async (token, mealID) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`

            },
        };

        const deleteMealResult = await fetchData(API_URL + `/meals/${mealID}`, fetchOptions);
        return deleteMealResult;
    }


    return { postNewMeal, updateMealInfo, deleteMeal }
}


const useMenu = () => {

    /*
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
    */


}


const useOrders = () => {

    const getAllOrders = async (token) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getAllOrdersResult = await fetchData(API_URL + '/orders', fetchOptions);
        return getAllOrdersResult;
    }

    //Possible todo: move to common/apiHooks.js
    //as it seems that both customer + admin can use this
    //However, possibly better way of doing this for customer
    const getSingleOrder = async (token, orderID) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getSingleOrderResult = await fetchData(API_URL + `/orders/${orderID}`, fetchOptions);
        return getSingleOrderResult;
    }



    return { getAllOrders, getSingleOrder }
}

const useReservations = () => {

    const getReservationByID = async (token, reservationID) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getSingleReservationByIDresult = await fetchData(API_URL + `/reservations/${reservationID}`, fetchOptions);
        return getSingleReservationByIDresult;
    }




    const getReservationByUserID = async (token, reservationUserID) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getSingleReservationResult = await fetchData(API_URL + `/reservations/user/${reservationUserID}`, fetchOptions);
        return getSingleReservationResult;
    }

    return { getReservationByID, getReservationByUserID }


}


export { useMeal, useMenu, useOrders, useReservations }