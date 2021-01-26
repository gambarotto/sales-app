import * as yup from 'yup';

class UsersValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      responsability: yup.string().required(),
    });

    try {
      const response = await schema.validate({
        name: data.name,
        email: data.email,
        password: data.password,
        responsability: data.responsability,
      });
      return response;
    } catch (err) {
      return { errors: err.errors[0] };
    }
  }
  static async email(email) {
    const schema = yup
      .object()
      .shape({ email: yup.string().email().required() });
    const response = await schema.isValid({ email });
    return response;
  }
  static async password(password) {
    const schema = yup.string().min(6).required();
    const response = await schema.isValid(password);
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
export default UsersValidation;
