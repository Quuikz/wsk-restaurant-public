//node imports
import express from 'express';

//other imports
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';


//define apiRouter
const apiRouter = express.Router();

//auth-router
apiRouter.use('/auth', authRouter);

//user-router
apiRouter.use('/users', userRouter);


//TODO: muut routerit.
// Lajitellaanko endpointit entiteetin(meal, order) vai käyttäjän(user, admin) perusteella?
//order-router
//meal-router
//daily-menu-router
//location-router
//reservation-router
//discount-router
//gift-card-router



//export
export default apiRouter;