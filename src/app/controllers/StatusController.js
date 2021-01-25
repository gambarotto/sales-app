import { v4 as uuidv4 } from 'uuid';
import Status from '../models/Status';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';

class StatusController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    try {
      const { id, name, description } = await Status.create({
        id: uuidv4(),
        ...req.body,
      });
      return res.json({ id, name, description });
    } catch (err) {
      return { error: err };
    }
  }
  async index(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const status = await Status.findAll(req.params.statusId);
    return res.json(status);
  }
}
export default new StatusController();
