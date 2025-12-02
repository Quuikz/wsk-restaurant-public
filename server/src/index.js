'use strict';


//set .env file for environmental variables
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

//environmental variables from .env
const hostname = process.env.SERVER_HOST || '127.0.0.1';
const port = process.env.SERVER_PORT || 3000;

console.log('ENV VARS:', process.env.SERVER_HOST, process.env.SERVER_PORT);

//express app from app.js
import app from './app.js';

//set app to use environmental variables
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

