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
      return res.status(400).json(responseValidation);
    }
    const response = await StatusRepositories.createStatus(responseValidation);
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async index(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res
        .status(400)
        .json({ errors: 'You do not have privileges for do this' });
    }
    const status = await StatusRepositories.findAllStatus(req.params.statusId);
    return res.status(status.errors ? 400 : 200).json(status);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const status = await StatusRepositories.findByPk(req.params.statusId);
    if (status.errors) {
      return res.status(404).json(status);
    }
    const responseValidation = await StatusValidation.update(req.body);
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }
    const response = await StatusRepositories.updateStatus(
      status,
      responseValidation
    );
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async delete(req, res) {
    const status = await StatusRepositories.findByPk(req.params.statusId);
    if (status.errors) {
      return res.status(404).json(status);
    }
    const response = await StatusRepositories.deleteStatus(status);
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async show(req, res) {
    const status = await StatusRepositories.findByPk(req.params.statusId);
    return res.status(status.errors ? 400 : 200).json(
      status.errors
        ? status
        : {
          id: status.id,
          name: status.name,
          description: status.description,
        }
    );
  }
}
export default new StatusController();
