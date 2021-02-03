import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
import Address from '../models/Address';

class AddressRepositories {
  static async createAddress(data) {
    try {
      const {
        id,
        id_customer,
        street,
        number,
        neighborhood,
        complement,
        uf,
        city,
        zipcode,
        type_address,
      } = await Address.create({
        id: uuidv4(),
        ...data,
      });
      return {
        id,
        id_customer,
        street,
        number,
        neighborhood,
        complement,
        uf,
        city,
        zipcode,
        type_address,
      };
    } catch (errors) {
      consoleError('AddressRepositories', 'createAddress', errors);
      return { errors: 'Error while create address' };
    }
  }
  static async findAddressById(id) {
    try {
      const address = await Address.findByPk(id);
      if (!address) {
        return { errors: 'Address not found' };
      }
      return address;
    } catch (errors) {
      consoleError('AddressRepositories', 'findAddressById', errors);
      return { errors: 'Error while fetching address' };
    }
  }
  static async findAllAddresses(idCustomer) {
    try {
      const brands = await Address.findAll({
        where: {
          id_customer: idCustomer,
        },
        attributes: [
          'id',
          'street',
          'number',
          'neighborhood',
          'complement',
          'uf',
          'city',
          'zipcode',
          'type_address',
        ],
      });
      return brands;
    } catch (errors) {
      consoleError('AddressRepositories', 'findAllAddresses', errors);
      return { errors: 'Error while fetching all address' };
    }
  }
  static async findAddressByIdCustomer(idCustomer) {
    try {
      const address = Address.findOne({ where: { id_customer: idCustomer } });
      return address;
    } catch (errors) {
      consoleError('AddressRepositories', 'findAddressByIdCustomer', errors);
      return { errors: 'Error while fetching address by customer' };
    }
  }
  static async updateAddress(address, data) {
    try {
      const {
        id,
        street,
        number,
        neighborhood,
        complement,
        uf,
        city,
        zipcode,
        type_address,
      } = await address.update(data);
      return {
        id,
        street,
        number,
        neighborhood,
        complement,
        uf,
        city,
        zipcode,
        type_address,
      };
    } catch (errors) {
      consoleError('AddressRepositories', 'updateAddress', errors);
      return { errors: 'Error while updating address' };
    }
  }
  static async deleteAddress(id) {
    try {
      const address = await Address.findByPk(id);
      if (!address) {
        return { errors: 'Address not found' };
      }
      await address.destroy();
      return { message: 'The address was deleted' };
    } catch (errors) {
      consoleError('AddressRepositories', 'deleteAddress', errors);
      return { errors: 'Error while updating address' };
    }
  }
}
export default AddressRepositories;
