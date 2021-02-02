import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import UserRepositories from '../repositories/UserRepositories';
import CustomerRepositories from '../repositories/CustomerRepositories';

class SessionController {
  async adminStore(req, res) {
    const { email, password } = req.body;
    const user = await UserRepositories.findUserByEmail({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(400).json({ error: 'Password invalid' });
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
    if (customer.error || !customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    if (!(await customer.checkPassword(password))) {
      return res.status(400).json({ error: 'Password invalid' });
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
