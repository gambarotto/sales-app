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
    const user = await User.findByPk(id);
    return user;
  }
  static async findUserByEmail(email) {
    const alreadyExists = await User.findOne({
      where: { email },
    });
    return alreadyExists;
  }
  static async checkPasswordUser(user, oldPassword) {
    const isCorrect = await user.checkPassword(oldPassword);
    console.log('checkPasswordUser', isCorrect);
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
