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
    } catch (error) {
      return { error };
    }
  }
  static async findStatusById(idReq) {
    try {
      const status = await Status.findByPk(idReq);
      return status;
    } catch (error) {
      return { error: 'Status not found' };
    }
  }
  static async findAllStatus() {
    try {
      const status = await Status.findAll({
        attributes: ['id', 'name', 'description'],
      });
      return status;
    } catch (error) {
      return { error };
    }
  }
  static async updateStatus(status, data) {
    try {
      const { id, name, description } = await status.update(data);
      return { id, name, description };
    } catch (error) {
      return { error };
    }
  }
  static async deleteStatus(status) {
    try {
      await status.destroy();
      return { message: 'Status was deleted' };
    } catch (error) {
      return { error };
    }
  }
}
export default StatusRepositories;
