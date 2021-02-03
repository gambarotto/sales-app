import * as yup from 'yup';
import CategoryRepositories from '../../app/repositories/CategoryRepositories';
import { consoleError } from '../errors/errors';

class CategoriyValidation {
  static async store(data) {
    const schema = yup
      .string()
      .required()
      .test('already-exists', 'Category already exists', async (name) => {
        try {
          const response = await CategoryRepositories.findCategoryByName(name);
          if (!response) {
            return true;
          }
          return false;
        } catch (errors) {
          consoleError('CategoriyValidation', 'store-schema', errors);
          return false;
        }
      });

    try {
      const response = await schema.validate(data.name);
      return response;
    } catch (errors) {
      consoleError('CategoriyValidation', 'store', errors);
      return { errors: errors.errors[0] };
    }
  }
}
export default CategoriyValidation;
