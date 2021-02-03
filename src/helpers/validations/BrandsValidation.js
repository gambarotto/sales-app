import * as yup from 'yup';
import { consoleError } from '../errors/errors';

class BrandsValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      consoleError('BrandsValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
  static async update(brand, data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });
    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      consoleError('BrandsValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
}

export default BrandsValidation;
