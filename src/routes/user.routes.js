import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';
import AuthUser from '../app/middlewares/AuthUser';

const routes = new Router();

routes.post('/sessions/users', SessionController.adminStore);

/** USERS ROUTES */
routes.post('/users', UserController.store);
routes.get('/users', AuthUser, UserController.index);
routes.put('/users/:userId', AuthUser, UserController.update);

export default routes;
