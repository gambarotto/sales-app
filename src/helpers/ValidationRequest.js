import * as yup from 'yup';

export class validationUser {
  static async store(name, email, password, responsability) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      responsability: yup.string().required(),
    });

    const response = await schema.isValid({
      name,
      email,
      password,
      responsability,
    });
    return response;
  }
}
