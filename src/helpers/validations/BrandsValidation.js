import * as yup from 'yup';

class BrandsValidation {
  static async store(name, description) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });

    try {
      const response = await schema.validate({
        name,
        description,
      });
      return response;
    } catch (error) {
      return { errors: error.errors[0] };
    }
  }
}

export default BrandsValidation;
