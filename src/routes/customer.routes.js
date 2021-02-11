import { Router } from 'express';
import AuthCustomer from '../app/middlewares/AuthCustomer';
import { AuthUser } from '../app/middlewares/AuthUser';
import CustomerController from '../app/controllers/CustomerController';
import AddressController from '../app/controllers/AddressController';
import SessionController from '../app/controllers/SessionController';
import CustomerPhonesControllers from '../app/controllers/CustomerPhonesControllers';
import DeliveryController from '../app/controllers/DeliveryController';
import OrderController from '../app/controllers/OrderController';

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

/** ORDERS ROUTES */
routes.post('/orders', AuthCustomer, OrderController.store);
routes.get('/orders', AuthUser, OrderController.index);
routes.put('/orders/:orderId', AuthCustomer, OrderController.update);
routes.get('/orders/:orderId', AuthCustomer, OrderController.show);
routes.delete('/orders/:orderId', AuthCustomer, OrderController.delete);

/** DELIVERIES ROUTES */
routes.post('/deliveries', AuthCustomer, DeliveryController.store);
routes.get('/deliveries', AuthCustomer, DeliveryController.index);
routes.put('/deliveries/:deliveryId', AuthCustomer, DeliveryController.update);
routes.get('/deliveries/:deliveryId', AuthCustomer, DeliveryController.show);
routes.delete(
  '/deliveries/:deliveryId',
  AuthCustomer,
  DeliveryController.delete
);

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
