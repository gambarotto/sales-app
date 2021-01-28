import { Router } from 'express';
import AuthCustomer from '../app/middlewares/AuthCustomer';
import { AuthUser } from '../app/middlewares/AuthUser';
import CustomerController from '../app/controllers/CustomerController';

const routes = new Router();

/** CUSTUMER ROUTES */
routes.post('/customers', CustomerController.store);
routes.get('/customers', AuthUser, CustomerController.index);
routes.put('/customers/:customerId', AuthCustomer, CustomerController.update);
routes.get('/customers/:customerId', AuthCustomer, CustomerController.show);
routes.delete(
  '/customers/:customerId',
  AuthCustomer,
  CustomerController.delete
);

export default routes;
