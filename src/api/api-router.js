//node imports
import express from 'express';

//other imports
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import orderRouter from './routes/order-router.js';
import mealRouter from './routes/meal-router.js';
import menuRouter from './routes/menu-router.js';
import locationRouter from './routes/location-router.js';

//define apiRouter
const apiRouter = express.Router();

//auth-router  http://hostname:port/api/auth
apiRouter.use('/auth', authRouter);

//user-router  http://hostname:port/api/users
apiRouter.use('/users', userRouter);


//order-router http://hostname:port/api/orders
apiRouter.use('/orders', orderRouter);

//meal-router  http://hostname:port/api/meals
apiRouter.use('/meals', mealRouter);

//daily-menu-router  http://hostname:port/api/menus
apiRouter.use('/menus', menuRouter);

//location-router  http://hostname:port/api/locations
apiRouter.use('/locations', locationRouter);


//reservation-router
//discount-router  //TODO: Discounts added to menus or meals directly?
//gift-card-router
//TODO: muut routerit.


//export
export default apiRouter;