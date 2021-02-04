import { v4 as uuidv4 } from 'uuid';
import { consoleError } from '../../helpers/errors/errors';
import Brand from '../models/Brand';
import Category from '../models/Category';
import Product from '../models/Product';

class ProductRepositories {
  static async createProduct(data) {
    try {
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
    } catch (errors) {
      consoleError('ProductRepositories', 'createProduct', errors);
      return { errors: 'error while create product' };
    }
  }
  static async findAllProducts() {
    try {
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
    } catch (errors) {
      consoleError('ProductRepositories', 'findAllProducts', errors);
      return { errors: 'error while fetching products' };
    }
  }
  static async findProductById(id) {
    try {
      const product = await Product.findByPk(id);
      if (!product) return { errors: 'product not found' };
      return product;
    } catch (errors) {
      consoleError('ProductRepositories', 'findProductById', errors);
      return { errors: 'error while fetching product' };
    }
  }
  static async updateProduct(product, data) {
    try {
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
    } catch (errors) {
      consoleError('ProductRepositories', 'updateProduct', errors);
      return { errors: 'error while update product' };
    }
  }
  static async deleteProduct(product) {
    try {
      await product.destroy();
      return { message: 'product was deleted' };
    } catch (errors) {
      consoleError('ProductRepositories', 'deleteProduct', errors);
      return { errors: 'error while delete product' };
    }
  }
}
export default ProductRepositories;
