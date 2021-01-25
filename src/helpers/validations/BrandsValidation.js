import * as yup from 'yup';

class BrandsValidation {
  static async store(name, description) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
    });

    const response = await schema.isValid({
      name,
      description,
    });
    return response;
  }
}

export default BrandsValidation;
