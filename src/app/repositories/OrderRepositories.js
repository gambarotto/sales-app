import { v4 as uuidv4 } from 'uuid';
import Order from '../models/Order';

class OrderRepositories {
  static async createOrder(data) {
    try {
      const order = await Order.create({ id: uuidv4(), ...data });
      return order;
    } catch (errors) {
      return { errors };
    }
  }
  static async findByPk(id) {
    try {
      const response = await Order.findByPk(id);
      return response;
    } catch (errors) {
      return { errors };
    }
  }
  static updateOrdeer(data) { }
}
export default OrderRepositories;
