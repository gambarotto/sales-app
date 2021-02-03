import * as yup from 'yup';
import { consoleError } from '../errors/errors';
//import TypePaymentsRepositories from '../../app/repositories/TypePaymentsRepositories';

class TypePaymentValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      active: yup.boolean().required(),
    });
    try {
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      consoleError('TypePaymentsValidation', 'store', errors);
      return { errors: errors.message };
    }
  }
  static async update(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      active: yup.boolean().required(),
    });
    try {
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      consoleError('TypePaymentsValidation', 'update', errors);
      return { errors: errors.message };
    }
  }
}

export default TypePaymentValidation;
