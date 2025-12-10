import fetchData from '../../utils/fetchData';

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
  };

  const getMealByIDList = async (IDList) => {
    //console.log('IDLIST: ', IDList);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({meals: IDList}),
    };

    const getMealByIDListResult = await fetchData(
      API_URL + '/meals/list/id',
      fetchOptions,
    );
    return getMealByIDListResult;
  };

  return {getAllMeals, getMealByIDList};
};

const useMenuCommon = () => {
  const getAllMenuItems = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const getAllMenuItemsResult = await fetchData(
      API_URL + '/menus',
      fetchOptions,
    );
    return getAllMenuItemsResult;
  };

  const getMenuByDate = async (date) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const getMenuByDateResult = await fetchData(
      API_URL + `/menus/date/${date}`,
      fetchOptions,
    );
    return getMenuByDateResult;
  };

  const getMenuByWeek = async (week) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const getMenuByWeekResult = await fetchData(
      API_URL + `/menus/week/${week}`,
      fetchOptions,
    );
    return getMenuByWeekResult;
  };

  return {getAllMenuItems, getMenuByDate, getMenuByWeek};
};

const useOrderCommon = () => {
  const postOrder = async (inputs, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    };

    const postOrderResult = await fetchData(API_URL + `/orders`, fetchOptions);
    return postOrderResult;
  };

  const updateOrder = async (inputs, token, orderID) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    };

    const updatedOrderResult = await fetchData(
      API_URL + `/orders/${orderID}`,
      fetchOptions,
    );
    return updatedOrderResult;
  };

  const deleteOrder = async (token, orderID) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const deletedOrderResult = await fetchData(
      API_URL + `/orders/${orderID}`,
      fetchOptions,
    );
    return deletedOrderResult;
  };


  const getOrderByID = async (token, orderID) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const getOrderByIDResult = await fetchData(API_URL + `/orders/${orderID}`, fetchOptions);
    return getOrderByIDResult;

  }

  const getOrdersByUserID = async (token, orderID) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getOrdersByUserIDResult = await fetchData(API_URL + `/orders/${orderID}`, fetchOptions);
    return getOrdersByUserIDResult;

  }



  return {postOrder, updateOrder, deleteOrder, getOrderByID, getOrdersByUserID};
};

const useReservationCommon = () => {


    const postNewReservation = async (data, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };

        const postNewReservationResult = await fetchData(API_URL + '/reservations', fetchOptions);
        return postNewReservationResult;

    }


    const getReservationOnDateTime = async (token, dateTime) => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const getReservationOnDateTimeResult = await fetchData(API_URL + `/reservations/count/${dateTime}`, fetchOptions);
        return getReservationOnDateTimeResult;

    }

    return { postNewReservation, getReservationOnDateTime }

};

const useGiftcardsCommon = () => {
    
    const postGiftCard = async (data, token) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        };

        const postGiftCardResult = await fetchData(API_URL + '/giftcards', fetchOptions);
        return postGiftCardResult;
    }

    return { postGiftCard }
}

export {useMealCommon, useMenuCommon, useOrderCommon, useReservationCommon, useGiftcardsCommon};
