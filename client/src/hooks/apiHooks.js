import { useState, useEffect } from 'react';


const AUTH_API2 = import.meta.env.VITE_CUSTOM_AUTH_API;
//TODO instead of hardcoding them
const AUTH_API = import.meta.env.VITE_CUSTOM_AUTH_API;

const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    const data = await response.json();

    if(!response.ok){
        if(data.message){
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
        return loginResult
    };

    //Register
    const postRegister = async (inputs) => {
        try{
            const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
            };

            const registerResult = await fetchData(AUTH_API + '/users', fetchOptions);
            return registerResult;
        }
        catch(error){
            console.log('Error in postRegister: ', error);
        }
    }

    return { postLogin, postRegister }
}


export { useAuthentication };