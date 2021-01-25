import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';
import { AuthUser } from '../app/middlewares/AuthUser';
import BrandController from '../app/controllers/BrandController';
import CategoryController from '../app/controllers/CategoryController';
import ProductController from '../app/controllers/ProductController';
import StatusController from '../app/controllers/StatusController';

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

/** CATEGORIES ROUTES */
routes.post('/categories', AuthUser, CategoryController.store);
routes.get('/categories', AuthUser, CategoryController.index);
routes.put('/categories/:categoryId', AuthUser, CategoryController.update);
routes.get('/categories/:categoryId', AuthUser, CategoryController.show);
routes.delete('/categories/:categoryId', AuthUser, CategoryController.delete);

/** CATEGORIES ROUTES */
routes.post('/products', AuthUser, ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:productId', AuthUser, ProductController.update);
routes.get('/products/:productId', AuthUser, ProductController.show);
routes.delete('/products/:productId', AuthUser, ProductController.delete);

/** STATUS ROUTES */
routes.post('/status', AuthUser, StatusController.store);
routes.get('/status', AuthUser, StatusController.index);
// routes.put('/status/:statusId', AuthUser, statusController.update);
// routes.get('/status/:statusId', AuthUser, statusController.show);
// routes.delete('/status/:statusId', AuthUser, statusController.delete);

/** CUSTUMER ROUTES */
// routes.post('/customer', AuthUser, CustomerController.store);
// routes.get('/customer', CustomerController.index);
// routes.put('/customer/:customerId', AuthUser, CustomerController.update);
// routes.get('/customer/:customerId', AuthUser, CustomerController.show);
// routes.delete('/customer/:customerId', AuthUser, CustomerController.delete);
export default routes;
