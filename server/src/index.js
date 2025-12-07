'use strict';

//set .env file for environmental variables
import dotenv from 'dotenv';
//Ei toiminut - 2.12.2025
//dotenv.config({ path: '../../.env' });
//Tämä toimii ainakin..
dotenv.config();

//environmental variables from .env
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

console.log('ENV VARS:', process.env.SERVER_HOST, process.env.SERVER_PORT);

//express app from app.js
import app from './app.js';

//set app to use environmental variables
app.listen(port, hostname, () => {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('SERVER_HOST:', process.env.SERVER_HOST);
    console.log('SERVER_PORT:', process.env.SERVER_PORT);
    console.log(`Server running at http://${hostname}:${port}/`);
});

