import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import StatusRepositories from '../repositories/StatusRepositories';

class StatusController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const response = await StatusRepositories.createStatus(req.body);
    return res.json(response);
  }
  async index(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const status = await StatusRepositories.findAllStatus(req.params.statusId);
    return res.json(status);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const status = await StatusRepositories.findStatusById(req.params.statusId);
    if (status.error) {
      return res.json(status);
    }
    const response = await StatusRepositories.updateStatus(status, req.body);
    return res.json(response);
  }
  async delete(req, res) {
    const status = await StatusRepositories.findStatusById(req.params.statusId);
    if (status.error) {
      return res.json(status);
    }
    const response = await StatusRepositories.deleteStatus(status);
    return response;
  }
  async show(req, res) {
    const status = await StatusRepositories.findStatusById(req.params.statusId);
    if (status.error) {
      return res.json(status);
    }
    return res.json({
      id: status.id,
      name: status.name,
      description: status.description,
    });
  }
}
export default new StatusController();
