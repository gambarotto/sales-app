import * as yup from 'yup';
import { consoleError } from '../errors/errors';

class StatusValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      consoleError('StatusValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
  static async update(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });
    try {
      const response = await schema.validate({
        name: data.name,
        description: data.description,
      });
      return response;
    } catch (errors) {
      consoleError('StatusValidation', 'update', errors);
      return { errors: errors.errors[0] };
    }
  }
}

export default StatusValidation;
