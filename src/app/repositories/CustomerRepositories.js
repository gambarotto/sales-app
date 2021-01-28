import { v4 as uuidv4 } from 'uuid';
import Customer from '../models/Customer';

class CustomerRepositories {
  static async createCustomer(data) {
    try {
      const {
        id,
        name,
        email,
        date_of_birth,
        send_email,
      } = await Customer.create({
        id: uuidv4(),
        ...data,
      });
      return { id, name, email, date_of_birth, send_email };
    } catch (error) {
      return { error };
    }
  }
  static async findAllCustomers() {
    try {
      const customers = await Customer.findAll({
        attributes: ['id', 'name', 'email', 'date_of_birth', 'send_email'],
      });
      return customers;
    } catch (error) {
      return { error };
    }
  }
  static async findCustomerById(id) {
    try {
      const customer = await Customer.findByPk(id);
      return customer;
    } catch (error) {
      return { error };
    }
  }
  static async findCustomerByEmail(email) {
    try {
      const alreadyExists = await Customer.findOne({
        where: { email },
      });
      if (!alreadyExists) {
        return false;
      }
      return alreadyExists;
    } catch (error) {
      return { error };
    }
  }
  static async checkPasswordCustomer(customer, oldPassword) {
    const isCorrect = await customer.checkPassword(oldPassword);
    return isCorrect;
  }
  static async updateCustomer(customer, data) {
    try {
      const {
        id,
        name,
        email,
        date_of_birth,
        send_email,
      } = await customer.update(data);
      return {
        id,
        name,
        email,
        date_of_birth,
        send_email,
      };
    } catch (error) {
      return { error };
    }
  }
  static async deleteCustomer(id) {
    try {
      const customer = await Customer.findByPk(id);
      await customer.destroy();
      return { message: 'Customer was deleted' };
    } catch (error) {
      return { error };
    }
  }
}
export default CustomerRepositories;