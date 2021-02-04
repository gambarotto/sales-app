import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
import User from '../models/User';

class UserRepositories {
  static async createUser(data) {
    try {
      const { id, name, email, responsability } = await User.create({
        id: uuidv4(),
        ...data,
      });
      return {
        id,
        name,
        email,
        responsability,
      };
    } catch (errors) {
      consoleError('UserRepositories', 'createUser', errors);
      return { errors: 'error while create user' };
    }
  }
  static async findAllUsers() {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'responsability'],
      });
      return users;
    } catch (errors) {
      consoleError('UserRepositories', 'findAllUsers', errors);
      return { errors: 'error while fetch users' };
    }
  }
  static async findUserById(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) return { errors: 'user not found' };
      return user;
    } catch (errors) {
      consoleError('UserRepositories', 'findUserById', errors);
      return { errors: 'error while create user' };
    }
  }
  static async findUserByEmail(email) {
    try {
      const alreadyExists = await User.findOne({
        where: { email: email },
      });
      if (!alreadyExists) {
        return { errors: 'User not found' };
      }
      return alreadyExists;
    } catch (errors) {
      consoleError('UserRepositories', 'findUserByEmail', errors);
      return { errors: 'error while fetch user by email' };
    }
  }
  static async checkPasswordUser(user, oldPassword) {
    const isCorrect = await user.checkPassword(oldPassword);
    return isCorrect;
  }
  static async updateUser(user, data) {
    try {
      const { id, name, email, responsability } = await user.update(data);
      return { id, name, email, responsability };
    } catch (errors) {
      consoleError('UserRepositories', 'updateUser', errors);
      return { errors: 'error while update user' };
    }
  }
  static async deleteUser(id) {
    try {
      const userReq = await User.findByPk(id);
      if (!userReq) return { errors: 'user not found' };
      await userReq.destroy();
      return { message: 'User was deleted' };
    } catch (errors) {
      consoleError('UserRepositories', 'deleteUser', errors);
      return { errors: 'error while delete user' };
    }
  }
}
export default UserRepositories;
