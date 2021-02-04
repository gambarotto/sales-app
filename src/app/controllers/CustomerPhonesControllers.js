import CustomerPhonesValidation from '../../helpers/validations/CustomerPhonesValidation';
import CustomerPhonesRepositories from '../repositories/CustomerPhonesRepositories';

class CustomerPhones {
  async store(req, res) {
    if (!req.customerId) {
      return res.status(401).json({ errors: 'Pleade do login' });
    }
    const resValidation = await CustomerPhonesValidation.store(req.body);
    if (resValidation.errors) {
      return res.status(400).json(resValidation);
    }
    const customerPhone = await CustomerPhonesRepositories.createCustomerPhone(
      resValidation,
      req.customerId
    );
    return res.status(customerPhone.errors ? 400 : 200).json(customerPhone);
  }
  async index(req, res) {
    const custumerPhones = await CustomerPhonesRepositories.findAllCustumerPhones(
      req.customerId
    );
    if (custumerPhones.errors) {
      return res.status(404).json(custumerPhones);
    }
    return res.status(200).json(custumerPhones);
  }
  async update(req, res) {
    const customerPhone = await CustomerPhonesValidation.checkIfIsTheSameCustomer(
      req.params.customerPhoneId,
      req.customerId
    );
    if (customerPhone.errors) {
      return res.status(404).json(customerPhone);
    }
    const resValidation = await CustomerPhonesValidation.update(
      customerPhone,
      req.body
    );
    if (resValidation.errors) {
      return res.status(400).json(resValidation);
    }
    const phoneUpdated = await CustomerPhonesRepositories.updateCustomerPhone(
      customerPhone,
      resValidation
    );
    return res.status(phoneUpdated.errors ? 400 : 200).json(phoneUpdated);
  }
  async delete(req, res) {
    const customerPhone = await CustomerPhonesValidation.checkIfIsTheSameCustomer(
      req.params.customerPhoneId,
      req.customerId
    );
    if (customerPhone.errors) {
      return res.status(404).json(customerPhone);
    }
    const response = await CustomerPhonesRepositories.deleteCustomerPhone(
      customerPhone
    );
    return res.status(response.errors ? 400 : 200).json(customerPhone);
  }
  async show(req, res) {
    const customerPhone = await CustomerPhonesValidation.checkIfIsTheSameCustomer(
      req.params.customerPhoneId,
      req.customerId
    );
    if (customerPhone.errors) {
      return res.status(404).json(customerPhone);
    }
    const response = await CustomerPhonesRepositories.findCustomerPhoneByPk(
      customerPhone.id
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
}
export default new CustomerPhones();
