import AddressValidation from '../../helpers/validations/AddressValidation';
import AddressRepositories from '../repositories/AddressRepositories';

class AddressController {
  async store(req, res) {
    if (!req.customerId) {
      return res.status(401).json({ errors: 'Please do login' });
    }
    const responseValidation = await AddressValidation.store(req.body);
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }
    const response = await AddressRepositories.createAddress(
      responseValidation
    );
    return res.status(response.errors ? 401 : 200).json(response);
  }
  async index(req, res) {
    const address = await AddressRepositories.findAllAddresses(req.customerId);
    return res.status(address.errors ? 404 : 200).json(address);
  }
  async update(req, res) {
    const address = await AddressValidation.checkIfIsTheSameCustomer(
      req.params.addressId,
      req.customerId
    );
    if (address.errors) {
      return res.status(401).json(address);
    }
    const responseValidation = await AddressValidation.update(
      address,
      req.body
    );
    if (responseValidation.errors) {
      return res.status(401).json(responseValidation);
    }
    const addressUpdated = await AddressRepositories.updateAddress(
      address,
      responseValidation
    );
    return res.json(addressUpdated);
  }
  async delete(req, res) {
    const response = await AddressRepositories.deleteAddress(
      req.params.addressId
    );
    return res.status(response.errors ? 404 : 200).json(response);
  }
  async show(req, res) {
    const address = await AddressRepositories.findByPk(
      req.params.addressId
    );
    return res.status(address.errors ? 404 : 200).json(address);
  }
}
export default new AddressController();
