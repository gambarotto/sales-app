import Status from '../models/Status';
import { consoleError } from '../../helpers/errors/errors';
import { v4 as uuidv4 } from 'uuid';

class StatusRepositories {
  static async createStatus(data) {
    try {
      const { id, name, description } = await Status.create({
        id: uuidv4(),
        ...data,
      });
      return { id, name, description };
    } catch (errors) {
      consoleError('StatusRepositories', 'createStatus', errors);
      return { errors: 'error while create status' };
    }
  }
  static async findStatusById(idReq) {
    try {
      const status = await Status.findByPk(idReq);
      if (!status) return { errors: 'status not found' };
      return status;
    } catch (errors) {
      consoleError('StatusRepositories', 'createStatus', errors);
      return { errors: 'error while fetch status' };
    }
  }
  static async findAllStatus() {
    try {
      const status = await Status.findAll({
        attributes: ['id', 'name', 'description'],
      });
      return status;
    } catch (errors) {
      consoleError('StatusRepositories', 'findAllStatus', errors);
      return { errors: 'error while fetch status' };
    }
  }
  static async updateStatus(status, data) {
    try {
      const { id, name, description } = await status.update(data);
      return { id, name, description };
    } catch (errors) {
      consoleError('StatusRepositories', 'updateStatus', errors);
      return { errors: 'error while update status' };
    }
  }
  static async deleteStatus(status) {
    try {
      await status.destroy();
      return { message: 'Status was deleted' };
    } catch (errors) {
      consoleError('StatusRepositories', 'deleteStatus', errors);
      return { errors: 'error while delete status' };
    }
  }
}
export default StatusRepositories;
