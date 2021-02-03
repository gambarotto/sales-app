import UsersValidation from '../../helpers/validations/UsersValidation';
import UserRepositories from '../repositories/UserRepositories';

class UserController {
  async store(req, res) {
    const responseValidation = await UsersValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json({ errors: responseValidation.errors });
    }
    const {
      id,
      name,
      email,
      responsability,
    } = await UserRepositories.createUser(responseValidation);
    return res.json({ id, name, email, responsability });
  }

  async index(req, res) {
    if (!req.userId) {
      return res.json({ errors: 'You can not do this' });
    }
    const users = await UserRepositories.findAllUsers();

    return res.json(users);
  }

  async update(req, res) {
    if (!req.userId) {
      return res.json({ errors: 'You can not do this' });
    }
    const userReq = await UserRepositories.findUserById(req.params.userId);
    if (userReq.errors) {
      return res.json({ userReq });
    }
    if (req.userId !== userReq.id) {
      return res.json({ errors: 'You can not do this' });
    }
    const responseValidation = await UsersValidation.update(userReq, req.body);
    if (responseValidation.errors) {
      return res.json(responseValidation);
    }
    const userUpdated = await UserRepositories.updateUser(
      userReq,
      responseValidation
    );

    return res.json({
      id: userUpdated.id,
      name: userUpdated.name,
      email: userUpdated.email,
      responsability: userUpdated.responsability,
    });
  }

  async delete(req, res) {
    if (!req.userId) {
      return res.json({ errors: 'You can not do this' });
    }
    await UserRepositories.deleteUser(req.params.userId);
    return res.json({ message: 'User was deleted' });
  }

  async show(req, res) {
    const userReq = await UserRepositories.findUserById(req.params.userId);
    if (userReq.errors) {
      return res.json(userReq);
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
