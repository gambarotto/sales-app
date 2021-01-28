import CustomerValidation from '../../helpers/validations/CustomerValidation';
import CustomerRepositories from '../repositories/CustomerRepositories';

class CustomerController {
  async store(req, res) {
    const responseValidation = await CustomerValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json({ error: responseValidation.errors });
    }
    const customer = await CustomerRepositories.createCustomer(
      responseValidation
    );
    if (customer.error) {
      return res.json(customer);
    }
    return res.json(customer);
  }
  async index(req, res) {
    const customers = await CustomerRepositories.findAllCustomers();
    if (customers.error) {
      return res.json(customers);
    }
    return res.json(customers);
  }
  async update(req, res) {
    const customer = await CustomerRepositories.findCustomerById(
      req.params.customerId
    );
    const responseValidation = await CustomerValidation.update(
      customer,
      req.body
    );
    if (responseValidation.errors) {
      return res.json(responseValidation);
    }
    console.log(responseValidation);
    const customerUpdated = await CustomerRepositories.updateCustomer(
      customer,
      responseValidation
    );
    return res.json(customerUpdated);
  }
  async delete(req, res) {
    const response = await CustomerRepositories.deleteCustomer(
      req.params.customerId
    );
    return res.json(response);
  }
  async show(req, res) {
    const {
      id,
      name,
      email,
      date_of_birth,
      send_email,
    } = await CustomerRepositories.findCustomerById(req.params.customerId);
    return res.json({ id, name, email, date_of_birth, send_email });
  }
}
export default new CustomerController();
