import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import UserRepositories from '../repositories/UserRepositories';

export async function AuthUser(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(400).json({ error: 'Token not provider' });
  }

  const [, token] = authHeaders.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    const user = await UserRepositories.findUserById(decoded.id);
    console.log(user);
    if (!user.responsability) {
      req.userId = '';
    }
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}

export async function checkResponsabilityUserToken(id) {
  const { responsability } = await UserRepositories.findUserById(id);
  if (!responsability) {
    return false;
  }
  if (responsability !== 'administrator' && responsability !== 'manager') {
    return false;
  }
  return true;
}
