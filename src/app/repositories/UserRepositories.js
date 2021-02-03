import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';

class UserRepositories {
  static async createUser(data) {
    const user = await User.create({
      id: uuidv4(),
      ...data,
    });
    return user;
  }
  static async findAllUsers() {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'responsability'],
    });
    return users;
  }
  static async findUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (errors) {
      return { errors };
    }
  }
  static async findUserByEmail(email) {
    try {
      const alreadyExists = await User.findOne({
        where: { email },
      });
      if (!alreadyExists) {
        return false;
      }
      return alreadyExists;
    } catch (errors) {
      return { errors };
    }
  }
  static async checkPasswordUser(user, oldPassword) {
    const isCorrect = await user.checkPassword(oldPassword);
    return isCorrect;
  }
  static async updateUser(user, data) {
    await user.update(data);
    return user;
  }
  static async deleteUser(id) {
    const userReq = await User.findByPk(id);
    await userReq.destroy();
  }
}
export default UserRepositories;
