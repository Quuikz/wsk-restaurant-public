import fetchData from "../../utils/fetchData";

const API_URL = import.meta.env.VITE_CUSTOM_AUTH_API;


const useMealCommon = () => {

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


    const getMealByIDList = async (IDList) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({meals: IDList}),
        };

        const getMealByIDListResult = await fetchData(API_URL + '/meals/list/id', fetchOptions);
        return getMealByIDListResult;
    }


    return { getAllMeals, getMealByIDList }

}


const useMenuCommon = () => {

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


    const getMenuByDate = async (date) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const getMenuByDateResult = await fetchData(API_URL + `/menus/date/${date}`, fetchOptions);
        return getMenuByDateResult;
    }


    const getMenuByWeek = async (week) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const getMenuByWeekResult = await fetchData(API_URL + `/menus/week/${week}`, fetchOptions);
        return getMenuByWeekResult;
        
    }

    return { getAllMenuItems, getMenuByDate, getMenuByWeek }
}


const useOrderCommon = () => {

    const postOrder = async (inputs, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(inputs),
        };

        const postOrderResult = await fetchData(API_URL + `/orders`, fetchOptions);
        return postOrderResult;
    }


    const updateOrder = async (inputs, token, orderID) => {
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(inputs),
        };

        const updatedOrderResult = await fetchData(API_URL + `/orders/${orderID}`, fetchOptions);
        return updatedOrderResult;
    }

    const deleteOrder = async (token, orderID) => {
        const fetchOptions = {
            method: 'DELETE',
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const deletedOrderResult = await fetchData(API_URL + `/orders/${orderID}`, fetchOptions);
        return deletedOrderResult;
    }

    return { postOrder, updateOrder, deleteOrder }
}


const useReservationCommon = () => {




}


export { useMealCommon, useMenuCommon, useOrderCommon }