import * as yup from 'yup';
import AddressRepositories from '../../app/repositories/AddressRepositories';
import CustomerRepositories from '../../app/repositories/CustomerRepositories';
import consoleError from '../errors/errors';

const idOptions = {
  name: 'verify-id-customer-in-db',
  test: async function (idAddress) {
    const customer = CustomerRepositories.findCustomerById(idAddress);
    if (customer.error || !customer) {
      return false;
    }
    return true;
  },
  message: 'Customer not found',
  exclusive: true,
};

class AddressValidation {
  static async checkIfIsTheSameCustomer(idAddress, idToken) {
    try {
      const address = await AddressRepositories.findAddressById(idAddress);
      if (!address) {
        return { error: 'Validation: Address not found' };
      }
      if (address.id_customer !== idToken) {
        return { error: 'You do not have permission' };
      }
      return address;
    } catch (error) {
      consoleError('AddressValidation', 'checkIfIsTheSameCustomer', error);
      return { error: 'Error while verify Customer' };
    }
  }
  static async store(data) {
    const schema = yup.object().shape({
      id_customer: yup.string().required().test(idOptions),
      street: yup.string().required(),
      number: yup.string().required(),
      neighborhood: yup.string().required(),
      complement: yup.string(),
      uf: yup.string().required(),
      city: yup.string().required(),
      type_address: yup
        .string()
        .required()
        .matches(/(Casa|Trabalho|Outro)/, 'Invalid type address'),
    });

    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (error) {
      consoleError('AddressValidation', 'store', error);
      return { error: error.errors[0] };
    }
  }
  static async update(address, data) {
    const schema = yup.object().shape({
      //id_customer nunca será trocado
      id_customer: yup.string().required().default(address.id_customer),
      street: yup.string().required().default(address.street),
      number: yup.string().required().default(address.number),
      neighborhood: yup.string().required().default(address.neighborhood),
      complement: yup.string().default(address.complement),
      uf: yup.string().required().default(address.uf),
      city: yup.string().required().default(address.city),
      type_address: yup
        .string()
        .required()
        .matches(/(Casa|Trabalho|Outro)/, 'Invalid type address')
        .default(address.type_address),
    });
    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (error) {
      consoleError('AddressValidation', 'update', error);
      return { error: error.errors[0] };
    }
  }
}

export default AddressValidation;
