import { useState, useEffect } from 'react';


const AUTH_API2 = import.meta.env.VITE_CUSTOM_AUTH_API;
const AUTH_API = 'http://localhost:3000/api/auth/login';

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

    const postLogin = async (inputs) => {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        };

        const loginResult = await fetchData(AUTH_API, fetchOptions);
        return loginResult
    };
    return { postLogin }
}


export { useAuthentication };