import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';
import { AuthUser } from '../app/middlewares/AuthUser';
import BrandController from '../app/controllers/BrandController';

const routes = new Router();

routes.post('/sessions/users', SessionController.adminStore);

/** USERS ROUTES */
routes.post('/users', UserController.store);
routes.get('/users', AuthUser, UserController.index);
routes.put('/users/:userId', AuthUser, UserController.update);
routes.get('/users/:userId', AuthUser, UserController.show);
routes.delete('/users/:userId', AuthUser, UserController.delete);

/** BRANDS ROUTES */
routes.post('/brands', AuthUser, BrandController.store);
routes.get('/brands', AuthUser, BrandController.index);
routes.put('/brands/:brandId', AuthUser, BrandController.update);
routes.get('/brands/:brandId', AuthUser, BrandController.show);
routes.delete('/brands/:brandId', AuthUser, BrandController.delete);

export default routes;
