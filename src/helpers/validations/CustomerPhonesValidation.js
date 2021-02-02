import * as yup from 'yup';
import CustomerPhonesRepositories from '../../app/repositories/CustomerPhonesRepositories';

class CustomerPhonesValidation {
  static async checkIfIsTheSameCustomer(idPhones, idTokenCustomer) {
    try {
      const customerPhone = await CustomerPhonesRepositories.findCustomerPhoneByPk(
        idPhones
      );
      if (!customerPhone) {
        return { errors: 'Validation: Customer Phone not found' };
      }
      if (customerPhone.id_customer !== idTokenCustomer) {
        return { errors: 'You do not have permission' };
      }
      return customerPhone;
    } catch (errors) {
      return { errors };
    }
  }
  static async store(data) {
    const schema = yup.object().shape({
      ddd: yup.string().required().length(2),
      number: yup.string().required().min(8).max(9),
      type: yup.string().required(),
      notes: yup.string().required().max(40),
    });
    try {
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      return { errors };
    }
  }
  static async update(customerPhone, data) {
    const schema = yup.object().shape({
      ddd: yup.string().required().length(2).default(customerPhone.ddd),
      number: yup
        .string()
        .required()
        .min(8)
        .max(9)
        .default(customerPhone.number),
      type: yup.string().required().default(customerPhone.type),
      notes: yup.string().required().max(40).default(customerPhone.notes),
    });
    try {
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      return { errors };
    }
  }
}
export default CustomerPhonesValidation;
