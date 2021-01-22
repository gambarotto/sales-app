import { uuidv4 } from 'uuid';
import User from '../models/User';
import Product from '../models/Product';

class ProductController {
  //name , cost_price, sale_price, id_brand, id_category
  async store(req, res) {
    const { responsability } = await User.findByPk(req.userId);
    if (responsability !== 'administrator' && responsability !== 'manager') {
      return res.json({ error: 'You do not have privileges for do this' });
    }
  }
}

export default new ProductController();
