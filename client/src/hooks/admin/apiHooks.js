import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";

//Set API URL
let API_URL = import.meta.env.VITE_API_URL;
if(import.meta.env.VITE_USE_LOCAL_SERVER === "true") {
  API_URL = import.meta.env.VITE_API_URL_LOCAL;
}


//TODO: common apiHooks.js for some GET requests ?


const useUser = () => {

    const getAllUsers = async (token) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getAllUsersResult = await fetchData(API_URL + '/users', fetchOptions);
        return getAllUsersResult;
    }

    const updateUserByID = async (data, token, userID) =>{
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };

        const updateUserByIDResult = await fetchData(API_URL + `/users/${userID}`, fetchOptions);
        return updateUserByIDResult;
    }


    return { getAllUsers, updateUserByID }




}


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
    const postNewMeal = async (formData, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`

            },
            //body: JSON.stringify(inputs),
            body: formData,
        };

        const newMealResult = await fetchData(API_URL + '/meals', fetchOptions);
        return newMealResult;
    };

    //Update meal info
    const updateMealInfo = async (data, token, mealID) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
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

    const postNewMenu = async (formData, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                //'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            //body: JSON.stringify(inputs),
            body: formData,
        };

        const postNewMenuResult = await fetchData(API_URL + '/menus', fetchOptions);
        return postNewMenuResult;
    }

    const updateMenu = async (data, token, menuID) =>{
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        };

        const updateMenuResult = await fetchData(API_URL + `/menus/${menuID}`, fetchOptions);
        return updateMenuResult;

    }

    return { postNewMenu, updateMenu }

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

    const getAllReservations = async (token) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getAllReservationsResult = await fetchData(API_URL + '/reservations', fetchOptions);
        return getAllReservationsResult
    }



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


    const getReservationsByIDList = async (token, IDList) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                reservations: IDList
            })
        };

        const getReservationsByIDListResult = await fetchData(API_URL + '/reservations/list/id', fetchOptions);
        return getReservationsByIDListResult;
    }





    return { getAllReservations, getReservationByID, getReservationByUserID, getReservationsByIDList }

}


const useGiftcards = () => {


    const getAllGiftCards = async (token) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getAllGiftCardsResult = await fetchData(API_URL + '/giftcards', fetchOptions);
        return getAllGiftCardsResult;

    }


    const getGiftcardsByIDList = async (token, IDList) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({giftCards: IDList}),
        };

        const getGiftcardsByIDListResult = await fetchData(API_URL + '/giftcards/list/id', fetchOptions);
        return getGiftcardsByIDListResult;
    }

    return { getAllGiftCards, getGiftcardsByIDList }

}



export { useUser, useMeal, useMenu, useOrders, useReservations, useGiftcards }
