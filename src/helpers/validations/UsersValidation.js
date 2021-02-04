import * as yup from 'yup';
import UserRepositories from '../../app/repositories/UserRepositories';
import { consoleError } from '../errors/errors';

const emailOptions = {
  name: 'verify-email-in-db',
  test: async function (email) {
    const alreadyExists = await UserRepositories.findUserByEmail(email);

    if (alreadyExists.errors || alreadyExists) {
      if (alreadyExists.errors && alreadyExists.errors === 'user not found') {
        return true;
      }
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
      const response = await schema.validate(data);
      return response;
    } catch (errors) {
      consoleError('UsersValidation', 'store', errors);
      return { errors: errors.errors[0] };
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
        consoleError('UsersValidation', 'update:email', errors);
        return { errors: errors.errors[0] };
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
        consoleError('UsersValidation', 'update:password', errors);
        return { errors: errors.errors[0] };
      }
    }
    try {
      const response = await schema.validate({ ...data });
      return response;
    } catch (errors) {
      consoleError('UsersValidation', 'update', errors);
      return { errors: errors.errors[0] };
    }
  }
}
export default UsersValidation;
