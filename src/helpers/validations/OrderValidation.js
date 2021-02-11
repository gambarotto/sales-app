import * as yup from 'yup';
import TypePaymentsRepositories from '../../app/repositories/TypePaymentsRepositories';
import AddressRepositories from '../../app/repositories/AddressRepositories';
import StatusRepositories from '../../app/repositories/StatusRepositories';
import { consoleError } from '../errors/errors';

const optionsDelivery = {
  name: 'delivery-address-exists',
  message: 'Delivery Address not found',
  test: async function (value) {
    try {
      const response = await AddressRepositories.findByPk(value);
      if (!response || response.errors) return false;
      return true;
    } catch (errors) {
      return false;
    }
  },
  exclusive: true,
};
const optionsTypePayments = {
  name: 'type-payment-exists',
  message: 'Type Payment not found',
  test: async function (value) {
    try {
      const response = await TypePaymentsRepositories.findByPk(value);
      if (!response) return false;
      return true;
    } catch (errors) {
      return false;
    }
  },
  exclusive: true,
};
const optionsAddress = {
  name: 'billing-address-exists',
  message: 'Billing Address not found',
  //params: {path},
  test: async function (value) {
    try {
      const response = await AddressRepositories.findByPk(value);
      if (!response || response.errors) return false;
      return true;
    } catch (errors) {
      return false;
    }
  },
  exclusive: true,
};
const optionsStatus = {
  name: 'status-exists',
  message: 'Status not found',
  test: async function (value) {
    try {
      const response = await StatusRepositories.findByPk(value);
      if (!response) return false;
      return true;
    } catch (errors) {
      return false;
    }
  },
  exclusive: true,
};
class OrderValidation {
  static async store(data, customerId) {
    const schema = yup.object().shape({
      amount: yup.number().required(),
      date_status: yup.date().required(),
      id_customer: yup.string().required().default(customerId),
      id_type_payment: yup.string().required().test(optionsTypePayments),
      id_billing_address: yup.string().required().test(optionsAddress),
      id_delivery_address: yup.string().required().test(optionsDelivery),
      id_status: yup.string().required().test(optionsStatus),
    });
    try {
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      consoleError('OrderValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
  static async update(order, data) {
    const schema = yup.object().shape({
      amount: yup.number().required(),
      date_status: yup.date().required(),
      id_customer: yup.string().required().default(order.id_customer),
      id_type_payment: yup
        .string()
        .required()
        .test(optionsTypePayments)
        .default(order.id_type_payment),
      id_billing_address: yup
        .string()
        .required()
        .test(optionsAddress)
        .default(order.id_billing_address),
      id_delivery_address: yup
        .string()
        .required()
        .test(optionsDelivery)
        .default(order.id_delivery_address),
      id_status: yup
        .string()
        .required()
        .test(optionsStatus)
        .default(order.id_status),
    });
    try {
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      consoleError('OrderValidation', 'update', errors);
      return { errors: errors.errors[0] };
    }
  }
}
export default OrderValidation;
