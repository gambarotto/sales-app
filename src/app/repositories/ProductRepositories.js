import { v4 as uuidv4 } from 'uuid';
import Brand from '../models/Brand';
import Category from '../models/Category';
import Product from '../models/Product';

class ProductRepositories {
  static async createProduct(data) {
    const {
      id,
      name,
      description,
      cost_price,
      sale_price,
      weight,
      id_brand,
      id_category,
    } = await Product.create({
      id: uuidv4(),
      ...data,
    });
    return {
      id,
      name,
      description,
      cost_price,
      sale_price,
      weight,
      id_brand,
      id_category,
    };
  }
  static async findAllProducts() {
    const products = await Product.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'cost_price',
        'sale_price',
        'weight',
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'description'],
        },
      ],
    });
    return products;
  }
  static async findProductById(id) {
    const product = await Product.findByPk(id);
    return product;
  }
  static async updateProduct(product, data) {
    const productUpdated = await product.update(data, {
      attributes: [
        'id',
        'name',
        'description',
        'cost_price',
        'sale_price',
        'weight',
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'description'],
        },
      ],
    });
    return productUpdated;
  }
  static async deleteProduct(product) {
    await product.destroy();
  }
}
export default ProductRepositories;
