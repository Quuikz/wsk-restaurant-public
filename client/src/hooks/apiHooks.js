import {useUserContext} from './contextHooks';

const AUTH_API2 = import.meta.env.VITE_CUSTOM_AUTH_API;
//TODO instead of hardcoding them
const AUTH_API = import.meta.env.VITE_CUSTOM_AUTH_API;
const MEDIA_API = import.meta.env.VITE_MEDIA_API;

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    if (data.message) {
      throw new Error(data.message);
    }
    throw new Error(`Error ${response.status} occured`);
  }
  return data;
};

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

    const loginResult = await fetchData(AUTH_API + '/auth/login', fetchOptions);
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

      const registerResult = await fetchData(AUTH_API + '/users', fetchOptions);
      return registerResult;
    } catch (error) {
      console.log('Error in postRegister: ', error);
    }
  };

  return {postLogin, postRegister};
};

const useCurrentUser = () => {
  const {user} = useUserContext();

  //Modify account info (currently: name, email)
  const modifyUserInfo = async (inputs, token) => {
    try {
      console.log('user token test display: ', token);

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
        AUTH_API + `/users/${user.id}`,
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

      const payload = {
        image: file,
      };

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      };

      const modifyUserAvatarResult = await fetchData(
        MEDIA_API + `/users`,
        fetchOptions,
      );
      return modifyUserAvatarResult;
    } catch (error) {
      console.log('Error in modifyUserAvatar: ', error);
    }
  };

  return {modifyUserInfo, modifyUserAvatar};
};

export {useAuthentication, useCurrentUser};
