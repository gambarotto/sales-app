import { Router } from 'express';
import AuthCustomer from '../app/middlewares/AuthCustomer';
import { AuthUser } from '../app/middlewares/AuthUser';
import CustomerController from '../app/controllers/CustomerController';
import AddressController from '../app/controllers/AddressController';
import SessionController from '../app/controllers/SessionController';
import CustomerPhonesControllers from '../app/controllers/CustomerPhonesControllers';

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
routes.get('/adresses', AuthCustomer, AddressController.index);
routes.put('/adresses/:addressId', AuthCustomer, AddressController.update);
routes.get('/adresses/:addressId', AuthCustomer, AddressController.show);
routes.delete('/adresses/:addressId', AuthCustomer, AddressController.delete);

/** PHONES CUSTOMERS ROUTES */
routes.post('/phones-customers', AuthCustomer, CustomerPhonesControllers.store);
routes.get('/phones-customers', AuthCustomer, CustomerPhonesControllers.index);
routes.put(
  '/phones-customers/:customerPhoneId',
  AuthCustomer,
  CustomerPhonesControllers.update
);
routes.get(
  '/phones-customers/:customerPhoneId',
  AuthCustomer,
  CustomerPhonesControllers.show
);
routes.delete(
  '/phones-customers/:customerPhoneId',
  AuthCustomer,
  CustomerPhonesControllers.delete
);

export default routes;
