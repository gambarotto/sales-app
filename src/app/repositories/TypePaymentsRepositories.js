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
    } catch (errors) {
      consoleError('TypePaymentsRepositories', 'createTypePayments', errors);
      return { errors: 'errors while creating type payment' };
    }
  }
  static async findByPk(id) {
    try {
      const response = await TypePayment.findByPk(id);
      return response;
    } catch (errors) {
      consoleError('TypePaymentsRepositories', 'findByPk', errors);
      return { errors: 'errors while fetching type payment' };
    }
  }
  static async findAll() {
    try {
      const typePayments = await TypePayment.findAll({
        attributes: ['id', 'name', 'active'],
      });
      if (!typePayments)
        return { errors: 'there is not type payments registered' };
      return typePayments;
    } catch (errors) {
      consoleError('TypePaymentsRepositories', 'findAll', errors);
      return { errors: 'errors while fetching all types payments' };
    }
  }
  static async delete(id) {
    try {
      const typePayment = await TypePayment.findByPk(id);
      await typePayment.destroy();
      return { message: 'Type Payment was deleted' };
    } catch (errors) {
      consoleError('TypePaymentsRepositories', 'delete', errors);
      return { errors: 'errors while deleting type payment' };
    }
  }
  static async updateTypePayment(typePayment, data) {
    try {
      const response = await typePayment.update(data);
      return response;
    } catch (errors) {
      consoleError('TypePaymentsRepositories', 'updateTypePayment', errors);
      return { errors: 'errors while updating type payment' };
    }
  }
}
export default TypePaymentsRepositories;
