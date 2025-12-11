import {useUserContext} from './contextHooks';

//TODO instead of hardcoding them



//Set server URL
let SERVER_URL = import.meta.env.VITE_SERVER_URL;
let API_URL = import.meta.env.VITE_API_URL;
if(import.meta.env.VITE_USE_LOCAL_SERVER === "true") {
  SERVER_URL = import.meta.env.VITE_SERVER_URL_LOCAL;
  API_URL = import.meta.env.VITE_API_URL_LOCAL;
}


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

    const loginResult = await fetchData(SERVER_URL + '/api/auth/login', fetchOptions);
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
          'Authorization': `Bearer ${token}`
        },
      };

      const tokenResult = await fetchData(API_URL + '/auth/validate', fetchOptions);
      return tokenResult;
    }
    catch (error) {
        console.log('Error in getUserByToken: ', error);
    }
  };

    const isUsernameTaken = async (username)=> {
      try {
        console.log('isUsernameTaken: ', username);
        const fetchOptions = {
          method: 'GET',
          headers: {
          },
        };

        const takenBoolean = await fetchData(API_URL + `/users/username/exists/${username}`, fetchOptions);
        console.log(username,' taken: ', takenBoolean);
        return takenBoolean;
      }
      catch (error) {
        console.log('Error in getUserByToken: ', error);
      }

    }

  return { getUserByToken, isUsernameTaken};

}






const useCurrentUser = () => {
  const {user} = useUserContext();



  //Modify account info (currently: name, email)
  const modifyUserInfo = async (inputs, token) => {
    try {
      console.log('modifyUserInfo: ',inputs, token);

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
      formData.append("file", file, file.name);
      console.log(file.name);

      const fetchOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      };

      const modifyUserAvatarResult = await fetchData(
        API_URL + `/users/`+user.id,
        fetchOptions,
      );
      return modifyUserAvatarResult;
    } catch (error) {
      console.log('Error in modifyUserAvatar: ', error);
    }
  };

  return {modifyUserInfo, modifyUserAvatar};
};

export {useAuthentication, useUser, useCurrentUser};
