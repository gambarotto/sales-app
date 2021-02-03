import Status from '../models/Status';

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
      return { errors };
    }
  }
  static async findStatusById(idReq) {
    try {
      const status = await Status.findByPk(idReq);
      return status;
    } catch (errors) {
      return { errors: 'Status not found' };
    }
  }
  static async findAllStatus() {
    try {
      const status = await Status.findAll({
        attributes: ['id', 'name', 'description'],
      });
      return status;
    } catch (errors) {
      return { errors };
    }
  }
  static async updateStatus(status, data) {
    try {
      const { id, name, description } = await status.update(data);
      return { id, name, description };
    } catch (errors) {
      return { errors };
    }
  }
  static async deleteStatus(status) {
    try {
      await status.destroy();
      return { message: 'Status was deleted' };
    } catch (errors) {
      return { errors };
    }
  }
}
export default StatusRepositories;
