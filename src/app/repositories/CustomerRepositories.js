import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
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
    } catch (errors) {
      consoleError('CustomerRepositories', 'createCustomer', errors);
      return { errors: 'Error while create customer' };
    }
  }
  static async findAllCustomers() {
    try {
      const customers = await Customer.findAll({
        attributes: ['id', 'name', 'email', 'date_of_birth', 'send_email'],
      });
      if (customers.errors)
        return { errors: 'There is no categories registred' };
      return customers;
    } catch (errors) {
      consoleError('CustomerRepositories', 'findAllCustomers', errors);
      return { errors: 'Error while fetching customers' };
    }
  }
  static async findCustomerById(id) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) return { errors: 'Customer not found' };
      return customer;
    } catch (errors) {
      consoleError('CustomerRepositories', 'findCustomerById', errors);
      return { errors: 'Error while fetching customer' };
    }
  }
  static async findCustomerByEmail(email) {
    try {
      const alreadyExists = await Customer.findOne({
        where: { email },
      });
      if (!alreadyExists) {
        return { errors: 'Customer not found' };
      }
      return alreadyExists;
    } catch (errors) {
      consoleError('CustomerRepositories', 'findCustomerByEmail', errors);
      return { errors: 'Error while fetching customer by email' };
    }
  }
  static async checkPasswordCustomer(customer, oldPassword) {
    try {
      const isCorrect = await customer.checkPassword(oldPassword);
      return isCorrect;
    } catch (errors) {
      consoleError('CustomerRepositories', 'checkPasswordCustomer', errors);
      return { errors: 'Error while verify password' };
    }
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
    } catch (errors) {
      consoleError('CustomerRepositories', 'updateCustomer', errors);
      return { errors: 'Error while updating customer' };
    }
  }
  static async deleteCustomer(id) {
    try {
      const customer = await Customer.findByPk(id);
      await customer.destroy();
      return { message: 'Customer was deleted' };
    } catch (errors) {
      consoleError('CustomerRepositories', 'deleteCustomer', errors);
      return { errors: 'Error while delete customer' };
    }
  }
}

export default CustomerRepositories;
