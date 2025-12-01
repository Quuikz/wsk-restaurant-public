'use strict';

import express from 'express';
const exp = express();

const serverBaseUrl = import.meta.env('SERVER_HOST')+import.meta.env('SERVER_PORT');
console.log('server URL:', serverBaseUrl);

const get = (url)=>{

}


const getAdmingToken = async ()=>{
    const url = serverBaseUrl+'/api/auth/login';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username": "admin", "password": "password"})
    };
    return await fetch(url, options);
}

console.log(getAdmingToken());