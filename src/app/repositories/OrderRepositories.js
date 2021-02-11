import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
import Order from '../models/Order';

class OrderRepositories {
  static async createOrder(data) {
    try {
      const order = await Order.create({ id: uuidv4(), ...data });
      return order;
    } catch (errors) {
      consoleError('OrderRepositories', 'createOrder', errors);
      return { errors: 'Error while create order' };
    }
  }
  static async findByPk(id) {
    try {
      const response = await Order.findByPk(id);
      return response;
    } catch (errors) {
      consoleError('OrderRepositories', 'findByPk', errors);
      return { errors: 'Error while fetch order' };
    }
  }
  static async findAll() {
    try {
      const orders = await Order.findAll({
        attributes: [
          'id',
          'amount',
          'date_status',
          'id_customer',
          'id_type_payment',
          'id_billing_address',
          'id_delivery_address',
          'id_status',
        ],
      });
      return orders;
    } catch (errors) {
      consoleError('OrderRepositories', 'findAll', errors);
      return { errors: 'Error while fetch orders' };
    }
  }
  static async updateOrder(order, data) {
    try {
      return await order.update(data);
    } catch (errors) {
      consoleError('OrderRepositories', 'updateOrder', errors);
      return { errors: 'Error while update order' };
    }
  }
  static async delete(id) {
    try {
      const order = await OrderRepositories.findByPk(id);
      await order.destroy();
      return { message: 'Order was deleted' };
    } catch (errors) {
      consoleError('OrderRepositories', 'updateOrder', errors);
      return { errors: 'Error while update order' };
    }
  }
}
export default OrderRepositories;
