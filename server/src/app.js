'use strict';

//node imports
import express, {response} from 'express';
import cors from 'cors';

//other imports
import apiRouter from './api/api-router.js'


//express app
const app = express();

//express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//etusivu html http://hostname:port/
app.use('/', express.static('./public'));
//app.use('/images/meals', express.static('./public/images/meals') );

//admin sivu html http://hostname:port/admin
app.use('/admin', express.static('./public/admin'));

//testisivu http://hostname:port/test-page
app.use('/test-page', express.static('test-page'));

//polku API:lle
app.use('/api', apiRouter)

//export
export default app;