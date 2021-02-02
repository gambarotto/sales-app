import { Router } from 'express';
import AuthCustomer from '../app/middlewares/AuthCustomer';
import { AuthUser } from '../app/middlewares/AuthUser';
import CustomerController from '../app/controllers/CustomerController';
import AddressController from '../app/controllers/AddressController';
import SessionController from '../app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions/customers', SessionController.customerStore);

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

/** ADRESSES ROUTES */
routes.post('/adresses', AuthCustomer, AddressController.store);
routes.get('/adresses', AuthUser, AddressController.index);
routes.put('/adresses/:addressId', AuthCustomer, AddressController.update);
routes.get('/adresses/:addressId', AuthCustomer, AddressController.show);
routes.delete('/adresses/:addressId', AuthCustomer, AddressController.delete);

export default routes;
