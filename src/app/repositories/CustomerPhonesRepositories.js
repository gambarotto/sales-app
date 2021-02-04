import { v4 as uuidv4 } from 'uuid';
import CustomerPhone from '../models/CustomerPhone';
import { consoleError } from '../../helpers/errors/errors';

class CustomerPhonesRepositories {
  static async createCustomerPhone(data, customerId) {
    try {
      const {
        id,
        ddd,
        number,
        type,
        notes,
        id_customer,
      } = await CustomerPhone.create({
        id: uuidv4(),
        ...data,
        id_customer: customerId,
      });
      return { id, ddd, number, type, notes, id_customer };
    } catch (errors) {
      consoleError('CustomerPhonesRepositories', 'createCustomerPhone', errors);
      return { errors: 'error while create customer phone' };
    }
  }
  static async findCustomerPhoneByPk(id) {
    try {
      const customerPhone = await CustomerPhone.findByPk(id);
      if (!customerPhone) {
        return { errors: 'Phone not found' };
      }
      return customerPhone;
    } catch (errors) {
      consoleError(
        'CustomerPhonesRepositories',
        'findCustomerPhoneByPk',
        errors
      );
      return { errors: 'error while fetching customer phone' };
    }
  }
  static async findAllCustumerPhones(id_customer) {
    try {
      const phones = await CustomerPhone.findAll({
        where: { id_customer },
        attributes: ['id', 'ddd', 'number', 'type', 'notes'],
      });
      return phones;
    } catch (errors) {
      consoleError(
        'CustomerPhonesRepositories',
        'findAllCustumerPhones',
        errors
      );
      return { errors: 'error while fetching customer phones' };
    }
  }
  static async updateCustomerPhone(customerPhone, data) {
    try {
      const response = await customerPhone.update(data);
      return response;
    } catch (errors) {
      consoleError('CustomerPhonesRepositories', 'updateCustomerPhone', errors);
      return { errors: 'error while updating customer phone' };
    }
  }
  static async deleteCustomerPhone(customerPhone) {
    try {
      await customerPhone.destroy();
      return { message: 'Phone was deleted' };
    } catch (errors) {
      consoleError('CustomerPhonesRepositories', 'deleteCustomerPhone', errors);
      return { errors: 'error while delete customer phone' };
    }
  }
}
export default CustomerPhonesRepositories;
