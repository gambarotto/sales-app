import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import UserRepositories from '../repositories/UserRepositories';
import CustomerRepositories from '../repositories/CustomerRepositories';

class SessionController {
  async adminStore(req, res) {
    const { email, password } = req.body;
    const user = await UserRepositories.findUserByEmail(email);
    if (user.errors) {
      return res.status(404).json(user);
    }
    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ errors: 'Password invalid' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
  async customerStore(req, res) {
    const { email, password } = req.body;
    const customer = await CustomerRepositories.findCustomerByEmail(email);
    if (customer.errors) {
      return res.status(404).json(customer);
    }
    if (!(await customer.checkPassword(password))) {
      return res.status(400).json({ errors: 'Password invalid' });
    }
    const { id, name } = customer;
    return res.json({
      custumer: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
