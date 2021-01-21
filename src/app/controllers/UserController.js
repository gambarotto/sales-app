import { validationUser } from '../../helpers/ValidationRequest';
import User from '../models/User';
import { v4 as uuidv4 } from 'uuid';

class UserController {
  async store(req, res) {
    const { name, email, password, responsability } = req.body;
    const isValid = new validationUser.store(
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
}
export default new UserController();
