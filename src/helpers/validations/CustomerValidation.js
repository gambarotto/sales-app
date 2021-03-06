import * as yup from 'yup';
import CustomerRepositories from '../../app/repositories/CustomerRepositories';
import { consoleError } from '../errors/errors';

const storeEmailOptions = {
  name: 'verify-email-in-db',
  test: async function (email) {
    const alreadyExists = await CustomerRepositories.findCustomerByEmail(email);
    if (alreadyExists.errors || alreadyExists) {
      if (alreadyExists.errors !== 'Customer not found') return false; //retorna erro no yup
    }
    return true; //passou no teste
  },
  message: 'Email already exists',
  exclusive: true,
};

class CustomerValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required().test(storeEmailOptions),
      date_of_birth: yup.date().required(),
      send_email: yup.boolean().required(),
      password: yup.string().min(6).required(),
    });

    try {
      const response = await schema.validate({
        name: data.name,
        email: data.email,
        date_of_birth: new Date(data.date_of_birth),
        send_email: data.send_email,
        password: data.password,
      });
      return response;
    } catch (errors) {
      consoleError('CustomerValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
  static async update(customer, data) {
    const schema = yup.object().shape({
      name: yup.string().required().default(customer.name),
      date_of_birth: yup.date().required().default(customer.date_of_birth),
      send_email: yup.boolean().required().default(customer.send_email),
    });
    const emailValidation = yup
      .string()
      .email()
      .required()
      .test(storeEmailOptions)
      .default(customer.email);
    const pwd = yup.string().min(6, 'Password must be at least 6 characters');

    if (data.email && data.email !== customer.email) {
      try {
        await emailValidation.validate(data.email);
      } catch (errors) {
        consoleError('CustomerValidation', 'update:email', errors);
        return { errors: errors.errors[0] };
      }
    }
    if (data.oldPassword) {
      const isCorrect = await CustomerRepositories.checkPasswordCustomer(
        customer,
        data.oldPassword
      );
      if (!isCorrect) {
        return { errors: 'Password does not match' };
      } else {
        try {
          await pwd.validate(data.password);
        } catch (errors) {
          consoleError('CustomerValidation', 'update:password', errors);
          return { errors: errors.errors[0] };
        }
      }
    }

    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      consoleError('CustomerValidation', 'update', errors);
      return { errors: errors.errors[0] };
    }
  }
}
export default CustomerValidation;
