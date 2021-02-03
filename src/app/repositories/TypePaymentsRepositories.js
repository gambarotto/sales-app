import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
import TypePayment from '../models/TypePayment';

class TypePaymentsRepositories {
  static async createTypePayments(data) {
    try {
      const { id, name, active } = await TypePayment.create({
        id: uuidv4(),
        ...data,
      });
      return { id, name, active };
    } catch (error) {
      consoleError('TypePaymentsRepositories', 'createTypePayments', error);
      return { error: 'error while creating type payment' };
    }
  }
  static async findByPk(id) {
    try {
      const response = await TypePayment.findByPk(id);
      return response;
    } catch (error) {
      consoleError('TypePaymentsRepositories', 'findByPk', error);
      return { error: 'error while fetching type payment' };
    }
  }
  static async findAll() {
    try {
      const typePayments = await TypePayment.findAll({
        attributes: ['id', 'name', 'active'],
      });
      if (!typePayments)
        return { error: 'there is not type payments registered' };
      return typePayments;
    } catch (error) {
      consoleError('TypePaymentsRepositories', 'findAll', error);
      return { error: 'error while fetching all types payments' };
    }
  }
  static async delete(id) {
    try {
      const typePayment = await TypePayment.findByPk(id);
      await typePayment.destroy();
      return { message: 'Type Payment was deleted' };
    } catch (error) {
      consoleError('TypePaymentsRepositories', 'delete', error);
      return { error: 'error while deleting type payment' };
    }
  }
  static async updateTypePayment(typePayment, data) {
    try {
      const response = await typePayment.update(data);
      return response;
    } catch (error) {
      consoleError('TypePaymentsRepositories', 'updateTypePayment', error);
      return { error: 'error while updating type payment' };
    }
  }
}
export default TypePaymentsRepositories;
