import StatusValidation from '../../helpers/validations/StatusValidation';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import StatusRepositories from '../repositories/StatusRepositories';

class StatusController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const responseValidation = await StatusValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json(responseValidation);
    }
    const response = await StatusRepositories.createStatus(responseValidation);
    return res.json(response);
  }
  async index(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const status = await StatusRepositories.findAllStatus(req.params.statusId);
    return res.json(status);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const status = await StatusRepositories.findStatusById(req.params.statusId);
    if (status.errors) {
      return res.json(status);
    }
    const responseValidation = await StatusValidation.update(req.body);
    if (responseValidation.errors) {
      return res.json(responseValidation);
    }
    const response = await StatusRepositories.updateStatus(
      status,
      responseValidation
    );
    return res.json(response);
  }
  async delete(req, res) {
    const status = await StatusRepositories.findStatusById(req.params.statusId);
    if (status.errors) {
      return res.json(status);
    }
    const response = await StatusRepositories.deleteStatus(status);
    return response;
  }
  async show(req, res) {
    const status = await StatusRepositories.findStatusById(req.params.statusId);
    if (status.errors) {
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
