import {useState, useEffect} from 'react';
import fetchData from '../../utils/fetchData';

/**
 * Custom hooks for admin's API requests.
 * 
 */

//Server API URL
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  API_URL = import.meta.env.VITE_API_URL_LOCAL;
}

/**
 * Custom hook for user-related API requests.
 * @returns {Object} Functions for interacting with the user related requests.
 *  - getAllUsers - returns all the users.
 *  - updateUserByID - updates user by id with given new data.
 */

const useUser = () => {
  //Gets all user
  const getAllUsers = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getAllUsersResult = await fetchData(API_URL + '/users', fetchOptions);
    return getAllUsersResult;
  };

  //Updates user
  const updateUserByID = async (data, token, userID) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const updateUserByIDResult = await fetchData(
      API_URL + `/users/${userID}`,
      fetchOptions,
    );
    return updateUserByIDResult;
  };

  return {getAllUsers, updateUserByID};
};


/**
 * Custom hook for meals-related API requests.
 * @returns {Object} Functions for interacting with the meals related requests.
 *  - postNewMeal - Post a new Meal with the given formData and token.
 *  - updateMealInfo - Update an existing Meal with given data, token, and Meal ID.
 *  - deleteMeal - Delete an existing Meal with given meal ID and token.
 */
const useMeal = () => {

  //Adds new meal
  const postNewMeal = async (formData, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const updatedMealResult = await fetchData(
      API_URL + `/meals/${mealID}`,
      fetchOptions,
    );
    return updatedMealResult;
  };

  const deleteMeal = async (token, mealID) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const deleteMealResult = await fetchData(
      API_URL + `/meals/${mealID}`,
      fetchOptions,
    );
    return deleteMealResult;
  };

  return {postNewMeal, updateMealInfo, deleteMeal};
};


/**
 * Custom hook for menu-related API requests.
 * @returns {Object} Functions for interacting with the menu related requests.
 *  - postNewMenu - Post a new Menu with the given formData and token.
 *  - updateMenu - Update an existing Menu with given data, token, and Menu ID.
 *  - deleteMenu - Delete an existing Menu with given menu ID and token.
 */
const useMenu = () => {

  const postNewMenu = async (formData, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        //'Content-Type': 'application/json',
        //'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      //body: JSON.stringify(inputs),
      body: formData,
    };

    const postNewMenuResult = await fetchData(API_URL + '/menus', fetchOptions);
    return postNewMenuResult;
  };

  const updateMenu = async (data, token, menuID) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const updateMenuResult = await fetchData(
      API_URL + `/menus/${menuID}`,
      fetchOptions,
    );
    return updateMenuResult;
  };

  const deleteMenu = async (token, menuID) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const deleteMenuResult = await fetchData(API_URL + `/menus/${menuID}`, fetchOptions);
    return deleteMenuResult;

  }

  return {postNewMenu, updateMenu, deleteMenu};
};


/**
 * Custom hook for Orders-related API requests.
 * @returns {Object} Functions for interacting with the Orders related requests.
 *  - getAllOrders - Get all existing orders with the given token.
 *  - getSingleOrder - Get single existing order with the given token.
 */
const useOrders = () => {
  const getAllOrders = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getAllOrdersResult = await fetchData(
      API_URL + '/orders',
      fetchOptions,
    );
    return getAllOrdersResult;
  };

  const getSingleOrder = async (token, orderID) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getSingleOrderResult = await fetchData(
      API_URL + `/orders/${orderID}`,
      fetchOptions,
    );
    return getSingleOrderResult;
  };

  return {getAllOrders, getSingleOrder};
};


/**
 * Custom hook for Reservations-related API requests.
 * @returns {Object} Functions for interacting with the Reservations related requests.
 *  - getAllReservations - Get all existing reservations with the given token.
 *  - getReservationByID - Get single existing reservation with the given token and reservation ID.
 *  - getReservationByUserID - Get user's reservation by token and user ID.
 *  - getReservationsByIDList - Get existing reservations by given token and IDList.
 */
const useReservations = () => {
  const getAllReservations = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getAllReservationsResult = await fetchData(
      API_URL + '/reservations',
      fetchOptions,
    );
    return getAllReservationsResult;
  };

  const getReservationByID = async (token, reservationID) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getSingleReservationByIDresult = await fetchData(
      API_URL + `/reservations/${reservationID}`,
      fetchOptions,
    );
    return getSingleReservationByIDresult;
  };

  const getReservationByUserID = async (token, reservationUserID) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getSingleReservationResult = await fetchData(
      API_URL + `/reservations/user/${reservationUserID}`,
      fetchOptions,
    );
    return getSingleReservationResult;
  };

  const getReservationsByIDList = async (token, IDList) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        reservations: IDList,
      }),
    };

    const getReservationsByIDListResult = await fetchData(
      API_URL + '/reservations/list/id',
      fetchOptions,
    );
    return getReservationsByIDListResult;
  };

  return {
    getAllReservations,
    getReservationByID,
    getReservationByUserID,
    getReservationsByIDList,
  };
};


/**
 * Custom hook for GiftCard-related API requests.
 * @returns {Object} Functions for interacting with the GiftCard related requests.
 *  - getAllGiftCards - Get all existing gift cards with the given token.
 *  - getGiftcardsByIDList - Get gift cards with the given token and gift cards ID list.
 */
const useGiftcards = () => {
  const getAllGiftCards = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const getAllGiftCardsResult = await fetchData(
      API_URL + '/giftcards',
      fetchOptions,
    );
    return getAllGiftCardsResult;
  };

  const getGiftcardsByIDList = async (token, IDList) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({giftCards: IDList}),
    };

    const getGiftcardsByIDListResult = await fetchData(
      API_URL + '/giftcards/list/id',
      fetchOptions,
    );
    return getGiftcardsByIDListResult;
  };

  return {getAllGiftCards, getGiftcardsByIDList};
};


/**
 * Custom hook for Discounts-related API requests.
 * @returns {Object} Functions for interacting with the Discounts related requests.
 *  - getAllDiscounts - Get all existing discounts with the given token.
 */
const useDiscounts = () => {

    const getAllDiscounts = async (token) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        const getDiscountsResult = await fetchData(API_URL + '/discounts', fetchOptions);
        return getDiscountsResult;
    }

    return { getAllDiscounts }
}

export {useUser, useMeal, useMenu, useOrders, useReservations, useGiftcards, useDiscounts};
