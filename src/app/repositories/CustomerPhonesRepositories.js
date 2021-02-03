import { v4 as uuidv4 } from 'uuid';
import CustomerPhone from '../models/CustomerPhone';

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
      return { errors };
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
      return { errors };
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
      return { errors };
    }
  }
  static async updateCustomerPhone(customerPhone, data) {
    try {
      const response = await customerPhone.update(data);
      return response;
    } catch (errors) {
      return { errors };
    }
  }
  static async deleteCustomerPhone(customerPhone) {
    try {
      await customerPhone.destroy();
      return { message: 'Phone was deleted' };
    } catch (errors) {
      return { errors };
    }
  }
}
export default CustomerPhonesRepositories;
