//node imports
import express from 'express';

//other imports
import {getMe, login} from '../controllers/auth-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';


const authRouter = express.Router();

//endpoint http://hostname:port/api/auth/login
authRouter.post('/login', login);

//endpoint http://hostname:port/api/auth/me
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;



