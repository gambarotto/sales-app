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
  static async email(email) {
    const schema = yup
      .object()
      .shape({ email: yup.string().email().required() });
    const response = await schema.isValid({ email });
    return response;
  }
  static async password(password) {
    const schema = yup
      .object()
      .shape({ email: yup.string().min(6).required() });
    const response = await schema.isValid({ password });
    return response;
  }
  static async responsability(responsability) {
    const schema = yup.string().matches(/(administrator|manager|employee)/, {
      excludeEmptyString: true,
    });
    const response = await schema.isValid({ responsability });
    return response;
  }
}
