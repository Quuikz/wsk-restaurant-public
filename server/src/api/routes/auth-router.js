//node imports
import express from 'express';

//other imports
import {validateToken, login} from '../controllers/auth-controller.js';
import authenticateToken from '../../middlewares/authenticateToken.js';


const authRouter = express.Router();

//endpoint http://hostname:port/api/auth/login
authRouter.post('/login', login);

//endpoint http://hostname:port/api/auth/validate
authRouter.route('/validate').get(authenticateToken, validateToken);

export default authRouter;



