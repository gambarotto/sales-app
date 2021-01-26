import UsersValidation from '../../helpers/validations/UsersValidation';
import User from '../models/User';
import UserRepositories from '../repositories/UserRepositories';

class UserController {
  async store(req, res) {
    const responseValidation = await UsersValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json({ error: responseValidation.errors });
    }
    const alreadyExists = await User.findOne({
      where: { email: responseValidation.email },
    });
    if (alreadyExists) {
      return res.json({ error: 'Email Already Exists' });
    }
    const user = await UserRepositories.createUser(responseValidation);
    return res.json(user);
  }

  async index(req, res) {
    if (!req.userId) {
      return res.json({ error: 'You can not do this' });
    }
    const users = await UserRepositories.findAllUsers();

    return res.json(users);
  }

  async update(req, res) {
    if (!req.userId) {
      return res.json({ error: 'You can not do this' });
    }
    const userReq = await UserRepositories.findUserById(req.params.userId);
    if (req.userId !== userReq.id) {
      return res.json({ error: 'You can not do this' });
    }
    const emailReq = req.body.email;
    if (emailReq && emailReq !== userReq.email) {
      const alreadyExists = await UserRepositories.findUserByEmail(emailReq);
      if (alreadyExists) {
        return res.json({ error: 'Email Already Exists' });
      }
    }
    if (req.body.oldPassword) {
      const isCorrect = await UserRepositories.checkPasswordUser(
        userReq,
        req.body.oldPassword
      );
      if (!isCorrect) {
        return res.json({ error: 'Password does not match' });
      }
    }
    const isValidPasswordYup = await UsersValidation.password(
      req.body.password
    );
    if (!isValidPasswordYup) {
      return res.json({ error: 'Password must to be at least 6 caracters' });
    }
    const userUpdated = await UserRepositories.updateUser(userReq, req.body);

    return res.json({
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
      responsability: userUpdated.responsability,
    });
  }

  async delete(req, res) {
    if (!req.userId) {
      return res.json({ error: 'You can not do this' });
    }
    await UserRepositories.deleteUser(req.params.userId);
    return res.json({ message: 'User was deleted' });
  }

  async show(req, res) {
    const userReq = await UserRepositories.findUserById(req.params.userId);
    if (!userReq) {
      return res.json({ error: 'User not found' });
    }
    const { id, name, email, responsability } = userReq;
    return res.json({
      id,
      name,
      email,
      responsability,
    });
  }
}

export default new UserController();
// store, index, update, delete, show
