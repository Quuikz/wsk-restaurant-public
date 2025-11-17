'use strict';

//node imports
import express, {response} from 'express';
import cors from 'cors';

//other imports
import apiRouter from './api/api-router.js'


//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//palvelimen juuri
//app.use('/', (req,res) => res.send("Palvelimen juuri placeholder..."));

//testisivu http://hostname:port/test-page
app.use('/test-page', express.static('test-page'));

//polku API:lle
app.use('/api', apiRouter)

//export
export default app;