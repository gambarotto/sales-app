import { v4 as uuidv4 } from 'uuid';
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
    } catch (error) {
      return { error };
    }
  }
  static async findAddressById(id) {
    try {
      const address = await Address.findByPk(id);
      if (!address) {
        return { error: 'Address not found' };
      }
      return address;
    } catch (error) {
      return { error };
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
    } catch (error) {
      return { error };
    }
  }
  static async findAddressByIdCustomer(idCustomer) {
    try {
      const address = Address.findOne({ where: { id_customer: idCustomer } });
      return address;
    } catch (error) {
      return { error };
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
    } catch (error) {
      return { error };
    }
  }
  static async deleteAddress(id) {
    try {
      const address = await Address.findByPk(id);
      if (!address) {
        return { error: 'Address not found' };
      }
      await address.destroy();
      return { message: 'The address was deleted' };
    } catch (error) {
      return { error };
    }
  }
}
export default AddressRepositories;
