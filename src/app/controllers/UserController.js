import { ValidationUser } from '../../helpers/ValidationRequests';
import User from '../models/User';
import { v4 as uuidv4 } from 'uuid';

class UserController {
  async store(req, res) {
    const { name, email, password, responsability } = req.body;
    const isValid = await ValidationUser.store(
      name,
      email,
      password,
      responsability
    );
    if (!isValid) {
      return res.json({ error: 'Please fill all fields' });
    }
    const alreadyExists = await User.findOne({ where: { email } });
    if (alreadyExists) {
      return res.json({ error: 'Email Already Exists' });
    }

    const user = await User.create({
      id: uuidv4(),
      name,
      email,
      password,
      responsability,
    });

    return res.json(user);
  }

  async index(req, res) {
    if (!req.userId) {
      return res.json({ error: 'You can not do this' });
    }
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'responsability'],
    });

    return res.json(users);
  }

  async update(req, res) {
    if (!req.userId) {
      return res.json({ error: 'You can not do this' });
    }
    const userReq = await User.findByPk(req.params.userId);
    if (req.userId !== userReq.id) {
      return res.json({ error: 'You can not do this' });
    }
    if (req.body.email && req.body.email !== userReq.email) {
      const alreadyExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (alreadyExists) {
        return res.json({ error: 'Email Already Exists' });
      }
    }
    if (
      req.body.oldPassword &&
      !(await userReq.checkPassword(req.body.oldPassword))
    ) {
      return res.json({ error: 'Password does not match' });
    }
    const isValidPasswordYup = await ValidationUser.password(req.body.password);
    if (!isValidPasswordYup) {
      return res.json({ error: 'Password must to be at least 6 caracters' });
    }
    await userReq.update(req.body);

    return res.json(userReq);
  }

  async delete(req, res) {
    if (!req.userId) {
      return res.json({ error: 'You can not do this' });
    }
    const userReq = await User.findByPk(req.params.userId);
    if (req.userId !== userReq.id) {
      return res.json({ error: 'You can not do this' });
    }
    await userReq.destroy();

    return res.json({ message: 'User was deleted' });
  }

  async show(req, res) {
    const userReq = await User.findByPk(req.params.userId);
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
