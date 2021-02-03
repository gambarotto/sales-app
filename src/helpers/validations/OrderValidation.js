import * as yup from 'yup';
import OrderRepositories from '../../app/repositories/OrderRepositories';
import TypePaymentsRepositories from '../../app/repositories/TypePaymentsRepositories';
import AddressRepositories from '../../app/repositories/AddressRepositories';
import StatusRepositories from '../../app/repositories/StatusRepositories';

const optionsDelivery = {
  name: 'delivery-address-exists',
  message: 'Delivery Address not found',
  test: async function (value) {
    try {
      const response = await AddressRepositories.findByPk(value);
      if (!response) return false;
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
  test: async function (value) {
    try {
      const response = await AddressRepositories.findByPk(value);
      if (!response) return false;
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
      return { errors };
    }
  }
}
export default OrderValidation;
