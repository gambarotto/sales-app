import * as yup from 'yup';
import UserRepositories from '../../app/repositories/UserRepositories';

const emailOptions = {
  name: 'verify-email-in-db',
  test: async function (email) {
    const alreadyExists = await UserRepositories.findUserByEmail(email);

    if (alreadyExists.errors || alreadyExists) {
      return false; //retorna erro no yup
    }

    return true; //passou no teste
  },
  message: 'Email already exists',
  exclusive: true,
};
class UsersValidation {
  static async store(data) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required().test(emailOptions),
      password: yup.string().min(6).required(),
      responsability: yup
        .string()
        .required()
        .matches(/(administrator|manager|employee)/, 'Invalid responsability'),
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
  static async update(user, data) {
    const schema = yup.object().shape({
      name: yup.string().required().default(user.name),
      responsability: yup
        .string()
        .required()
        .matches(/(administrator|manager|employee)/, 'Invalid responsability')
        .default(user.responsability),
    });
    const email = yup
      .string()
      .email()
      .required()
      .test(emailOptions)
      .default(user.email);
    const passwordValidation = yup.string().min(6).required();

    if (data.email && data.email !== user.email) {
      try {
        await email.validate(data.email);
      } catch (errors) {
        return { errors };
      }
    }
    if (data.oldPassword) {
      const isCorrect = await UserRepositories.checkPasswordUser(
        user,
        data.oldPassword
      );
      if (!isCorrect) {
        return { errors: 'Password does not match' };
      }
      try {
        await passwordValidation.validate(data.password);
      } catch (errors) {
        return { errors };
      }
    }
    try {
      const response = await schema.validate({ ...data });

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
