import OrderValidation from '../../helpers/validations/OrderValidation';
import OrderRepositories from '../repositories/OrderRepositories';

class OrderController {
  //TODO
  async store(req, res) {
    const resValidation = await OrderValidation.store(req.body, req.customerId);
    if (resValidation.errors) return res.status(400).json(resValidation);

    const order = await OrderRepositories.createOrder(resValidation);
    return res.status(order.errors ? 400 : 200).json(order);
  }
  async index(req, res) {
    if (!req.userId)
      return res.status(200).json({ errors: 'You do not have privilegies' });
    const orders = await OrderRepositories.findAll();
    return res.status(orders.errors ? 400 : 200).json(orders);
  }
  async update(req, res) {
    const order = await OrderRepositories.findByPk(req.params.orderId);
    const resValidation = await OrderValidation.update(order, req.body);
    if (resValidation.errors) return res.status(400).json(resValidation);
    const orderUpdated = await OrderRepositories.updateOrder(
      order,
      resValidation
    );
    return res.status(orderUpdated.errors ? 400 : 200).json(orderUpdated);
  }
  async delete(req, res) {
    if (order.errors)
      return res.status(400).json({ errors: 'order not found' });
    const response = await OrderRepositories.delete(order);
  }
  async show(req, res) { }
}
export default new OrderController();
