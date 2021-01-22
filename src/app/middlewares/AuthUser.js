import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import User from '../models/User';
//import User from '../models/User';

export async function AuthUser(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(400).json({ error: 'Token not provider' });
  }

  const [, token] = authHeaders.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}

export async function checkResponsabilityUserToken(id) {
  const { responsability } = await User.findByPk(id);
  if (!responsability) {
    return false;
  }
  if (responsability !== 'administrator' && responsability !== 'manager') {
    return false;
  }
  return true;
}
