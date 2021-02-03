import { v4 as uuidv4 } from 'uuid';
import Delivery from '../models/Delivery';

class DeliveryRepositories {
  static async createDelivery(data) {
    try {
      const { id, schedule_to, date_status } = await Delivery.create({
        id: uuidv4(),
        ...data,
      });
      return { id, schedule_to, date_status };
    } catch (error) {
      return { error };
    }
  }
}
export default DeliveryRepositories;
