import fetchData from '../../utils/fetchData';
import {useUserContext} from '../contextHooks';

/**
 * Custom hooks for users's API requests.
 *
 */

//Server API URL
let SERVER_URL = import.meta.env.VITE_SERVER_URL;
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.VITE_USE_LOCAL_SERVER === 'true') {
  SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  API_URL = import.meta.env.VITE_API_URL_LOCAL;
}

/**
 * Custom hook for authentication-related API requests.
 * @returns {Object} Functions for interacting with the authentication related requests.
 *  - postLogin - Post login with inputs and returns token.
 *  - postRegister - Post register with inputs.
 */
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

/**
 * Custom hook for user-related API requests.
 * @returns {Object} Functions for interacting with the user related requests.
 *  - getUserByToken - Get user related data with the given token.
 *  - isUsernameTaken - Get response whether username is taken or not.
 */
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

/**
 * Custom hook for current user-related API requests.
 * @returns {Object} Functions for interacting with the current user related requests.
 *  - modifyUserInfo - Update current user information with the given inputs and token.
 *  - modifyUserAvatar - Update current avatar with the given file and token.
 */
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

/**
 * Custom hook for user-related API requests.
 * @returns {Object} Functions for interacting with the user related requests.
 *  - deleteUserByID - Deletes user with the given token and user ID.
 */
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

/**
 * Custom hook for meal-related API requests.
 * @returns {Object} Functions for interacting with the meal related requests.
 *  - getAllMeals - Get all meals along with the information related to the meal.
 *  - getMealByIDList - Get existing meals by given ID list of Meal IDs.
 */
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

/**
 * Custom hook for menu-related API requests.
 * @returns {Object} Functions for interacting with the menu related requests.
 *  - getAllMenuItems - Get all menus along with the information related to the menus.
 *  - getMenuByDate - Get existing menu by given date.
 *  - getMenuByWeek - Get existing meny by given week.
 */
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

/**
 * Custom hook for Order-related API requests.
 * @returns {Object} Functions for interacting with the Order related requests.
 *  - postOrder - Post a new Order with given inputs and token.
 *  - updateOrder - Update existing Order with given inputs, token and Order ID.
 *  - deleteOrder - Delete an existing Order with given token and Order ID.
 *  - getOrderByID - Get an order by given token and Order ID.
 *  - getOrdersByUserID - Get an user Order by given token and user ID.
 */
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

/**
 * Custom hook for Reservation-related API requests.
 * @returns {Object} Functions for interacting with the Reservation related requests.
 *  - postNewReservation - Post a new Reservation with given data and token.
 *  - getReservationOnDateTime - Get a Reservation on Date by given token and date.
 */
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

/**
 * Custom hook for Giftcards-related API requests.
 * @returns {Object} Functions for interacting with the Giftcards related requests.
 *  - postGiftCard - Post a new Giftcard with given data and token.
 */
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

/**
 * Custom hook for Discount-related API requests.
 * @returns {Object} Functions for interacting with the Discount related requests.
 *  - validateDiscountByCode - Validate a Discount by given token and code.
 */
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

/**
 * Custom hook for Digitransit/ HSL (Helsinki public transport) stops-related API requests.
 * @returns {Object} Functions for interacting with HSL stops.
 *  - getHslStopsByLatLon - Get HSL stops within a radius by latitude and longitude.
 *  - getHslStopsDepAndArr - Get departure and arrival information for a specific HSL stop.
 */
const useHslStopsCommon = () => {
  /**
   * Get HSL stops within a specified radius from given coordinates.
   * @async
   * @param {number} lat - The latitude coordinate.
   * @param {number} lon - The longitude coordinate.
   * @param {number} radius - The search radius in meters.
   * @returns {Promise<Array>} An array of stops within the radius, including stop details (name, lat, lon, code, gtfsId) and distance from the coordinates.
   */
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

  /**
   * Get departure and arrival information for a specific HSL stop.
   * @async
   * @param {string} stopId - The GTFS ID of the stop.
   * @returns {Promise<Object>} An object containing stop details (gtfsId, name, lat, lon) and stoptimes with departure information (realtime, scheduled/realtime departure, delay, route info, etc.).
   */
  const getHslStopsDepAndArr = async (stopId) => {
    const url = API_URL + '/hsl/getHsl';
    const query = `query {
  stop: stop(id: "${stopId}") {
    gtfsId
    name
    lat
    lon
    stoptimesWithoutPatterns(numberOfDepartures: 1) {
      realtime
      realtimeState
      scheduledDeparture
      realtimeDeparture
      departureDelay
      headsign
      trip {
        route {
          shortName
          mode
        }
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
    // console.log('HSL stop departures and arrivals result:', result);
    return result.data.stop;
  };
  return {getHslStopsByLatLon, getHslStopsDepAndArr};
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
