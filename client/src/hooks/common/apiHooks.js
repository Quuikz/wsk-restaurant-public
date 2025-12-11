import fetchData from '../../utils/fetchData';
import { useUserContext } from '../contextHooks';


//Set server URL
let SERVER_URL = import.meta.env.VITE_SERVER_URL;
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  API_URL = import.meta.env.VITE_API_URL_LOCAL;
}

const useAuthentication = () => {
  //Login
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      SERVER_URL + '/api/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  //Register
  const postRegister = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };

      const registerResult = await fetchData(API_URL + '/users', fetchOptions);
      return registerResult;
    } catch (error) {
      console.log('Error in postRegister: ', error);
    }
  };

  return {postLogin, postRegister};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const tokenResult = await fetchData(
        API_URL + '/auth/validate',
        fetchOptions,
      );
      return tokenResult;
    } catch (error) {
      console.log('Error in getUserByToken: ', error);
    }
  };

  const isUsernameTaken = async (username) => {
    try {
      console.log('isUsernameTaken: ', username);
      const fetchOptions = {
        method: 'GET',
        headers: {},
      };

      const takenBoolean = await fetchData(
        API_URL + `/users/username/exists/${username}`,
        fetchOptions,
      );
      console.log(username, ' taken: ', takenBoolean);
      return takenBoolean;
    } catch (error) {
      console.log('Error in getUserByToken: ', error);
    }
  };

  return {getUserByToken, isUsernameTaken};
};

const useCurrentUser = () => {
  const {user} = useUserContext();

  //Modify account info (currently: name, email)
  const modifyUserInfo = async (inputs, token) => {
    try {
      console.log('modifyUserInfo: ', inputs, token);

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputs),
      };

      //How tf am I getting the id.. 0.10am thoughts
      const modifyUserInfoResult = await fetchData(
        API_URL + `/users/${user.id}`,
        fetchOptions,
      );
      return modifyUserInfoResult;
    } catch (error) {
      console.log('Error in modifyUserinfo: ', error);
    }
  };

  //Modify account avatar
  const modifyUserAvatar = async (file, token) => {
    try {
      console.log(file);

      //create FormData object
      const formData = new FormData();

      //add file to FormData
      formData.append('file', file, file.name);
      console.log(file.name);

      const fetchOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const modifyUserAvatarResult = await fetchData(
        API_URL + `/users/` + user.id,
        fetchOptions,
      );
      return modifyUserAvatarResult;
    } catch (error) {
      console.log('Error in modifyUserAvatar: ', error);
    }
  };

  return {modifyUserInfo, modifyUserAvatar};
};




const useUserCommon = () => {
  const deleteUserByID = async (token, userID) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const deleteUserByIDResult = await fetchData(
      API_URL + `/users/${userID}`,
      fetchOptions,
    );
    return deleteUserByIDResult;
  };

  return {deleteUserByID};
};

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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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

    const getOrderByIDResult = await fetchData(
      API_URL + `/orders/${orderID}`,
      fetchOptions,
    );
    return getOrderByIDResult;
  };

  const getOrdersByUserID = async (token, userId) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const getOrdersByUserIDResult = await fetchData(
      API_URL + `/orders/user/${userId}`,
      fetchOptions,
    );
    return getOrdersByUserIDResult;
  };

  return {postOrder, updateOrder, deleteOrder, getOrderByID, getOrdersByUserID};
};

const useReservationCommon = () => {
  const postNewReservation = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const postNewReservationResult = await fetchData(
      API_URL + '/reservations',
      fetchOptions,
    );
    return postNewReservationResult;
  };

  const getReservationOnDateTime = async (token, dateTime) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const getReservationOnDateTimeResult = await fetchData(
      API_URL + `/reservations/count/${dateTime}`,
      fetchOptions,
    );
    return getReservationOnDateTimeResult;
  };

  return {postNewReservation, getReservationOnDateTime};
};

const useGiftcardsCommon = () => {
  const postGiftCard = async (data, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    const postGiftCardResult = await fetchData(
      API_URL + '/giftcards',
      fetchOptions,
    );
    return postGiftCardResult;
  };

  return {postGiftCard};
};

const useDiscountsCommon = () => {
  const validateDiscountByCode = async (token, code) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        //'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetchData(
      API_URL + `/discounts/validate/${code}`,
      fetchOptions,
    );
    return result;
  };

  return {validateDiscountByCode};
};

const useHslStopsCommon = () => {
  const getHslStopsByLatLon = async (lat, lon, radius) => {
    const url = API_URL + '/hsl/getHsl';
    const query = `
    {
      stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${radius}) {
        edges {
          node {
            stop {
              name
              lat
              lon
              code
              gtfsId
            }
            distance
          }
        }
      }
    }
`;

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query}),
    };

    const result = await fetchData(url, fetchOptions);

    // console.log('HSL stops result:', result.data.stopsByRadius.edges);
    return result.data.stopsByRadius.edges;
  };
  return {getHslStopsByLatLon};
};

export {
  useAuthentication,
  useUser,
  useCurrentUser,
  useUserCommon,
  useMealCommon,
  useMenuCommon,
  useOrderCommon,
  useReservationCommon,
  useGiftcardsCommon,
  useDiscountsCommon,
  useHslStopsCommon,
};
