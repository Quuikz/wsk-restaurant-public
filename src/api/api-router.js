//node imports
import express from 'express';

//other imports
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import orderRouter from './routes/order-router.js';
import menuRouter from './routes/menu-router.js';

//define apiRouter
const apiRouter = express.Router();

//auth-router
apiRouter.use('/auth', authRouter);

//user-router
apiRouter.use('/users', userRouter);


//TODO: muut routerit.
// Lajitellaanko endpointit entiteetin(meal, order) vai käyttäjän(user, admin) perusteella?

//order-router http://hostname:port/api/orders
apiRouter.use('/orders', orderRouter);

//meal-router


//daily-menu-router
apiRouter.use('/menus', menuRouter);

//location-router
apiRouter.use('/locations', locationRouter);

//reservation-router
//discount-router
//gift-card-router



//export
export default apiRouter;