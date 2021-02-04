import UsersValidation from '../../helpers/validations/UsersValidation';
import UserRepositories from '../repositories/UserRepositories';

class UserController {
  async store(req, res) {
    const responseValidation = await UsersValidation.store(req.body);
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }
    const user = await UserRepositories.createUser(responseValidation);
    return res.status(user.errors ? 400 : 200).json(user);
  }

  async index(req, res) {
    if (!req.userId) {
      return res.status(401).json({ errors: 'You can not do this' });
    }
    const users = await UserRepositories.findAllUsers();

    return res.status(users.errors ? 400 : 200).json(users);
  }

  async update(req, res) {
    if (!req.userId) {
      return res.status(400).json({ errors: 'You can not do this' });
    }
    const userReq = await UserRepositories.findUserById(req.params.userId);
    if (userReq.errors) {
      return res.status(404).json(userReq);
    }
    if (req.userId !== userReq.id) {
      return res.status(401).json({ errors: 'You can not do this' });
    }
    const responseValidation = await UsersValidation.update(userReq, req.body);
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }
    const userUpdated = await UserRepositories.updateUser(
      userReq,
      responseValidation
    );

    return res.status(userUpdated.errors ? 400 : 200).json(userUpdated);
  }

  async delete(req, res) {
    if (!req.userId) {
      return res.status(400).json({ errors: 'You can not do this' });
    }
    const response = await UserRepositories.deleteUser(req.params.userId);
    return res.status(response.errors ? 400 : 200).json(response);
  }

  async show(req, res) {
    const userReq = await UserRepositories.findUserById(req.params.userId);
    return res.status(userReq.errors ? 400 : 200).json(
      userReq.errors
        ? userReq
        : {
          id: userReq.id,
          name: userReq.name,
          email: userReq.email,
          responsability: userReq.responsability,
        }
    );
  }
}

export default new UserController();
// store, index, update, delete, show
