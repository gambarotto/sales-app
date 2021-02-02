import * as yup from 'yup';

class BrandsValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (error) {
      return { errors: error.errors[0] };
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
    } catch (error) {
      return { errors: error.errors[0] };
    }
  }
}

export default BrandsValidation;
