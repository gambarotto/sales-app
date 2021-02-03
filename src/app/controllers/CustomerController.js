import CustomerValidation from '../../helpers/validations/CustomerValidation';
import CustomerRepositories from '../repositories/CustomerRepositories';

class CustomerController {
  async store(req, res) {
    const responseValidation = await CustomerValidation.store(req.body);
    if (responseValidation.errors) {
      return res.status(400).json({ errors: responseValidation.errors });
    }
    const customer = await CustomerRepositories.createCustomer(
      responseValidation
    );
    return res.status(customer.errors ? 400 : 200).json(customer);
  }
  async index(req, res) {
    const customers = await CustomerRepositories.findAllCustomers();
    return res.status(customers.errors ? 400 : 200).json(customers);
  }
  async update(req, res) {
    const customer = await CustomerRepositories.findCustomerById(
      req.params.customerId
    );
    if (customer.errors) {
      return res.status(400).json(customer);
    }
    const responseValidation = await CustomerValidation.update(
      customer,
      req.body
    );
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }
    const customerUpdated = await CustomerRepositories.updateCustomer(
      customer,
      responseValidation
    );
    return res.status(customerUpdated.errors ? 400 : 200).json(customerUpdated);
  }
  async delete(req, res) {
    const response = await CustomerRepositories.deleteCustomer(
      req.params.customerId
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async show(req, res) {
    const customer = await CustomerRepositories.findCustomerById(
      req.params.customerId
    );
    return res.status(customer.errors ? 400 : 200).json(customer);
  }
}

export default new CustomerController();
