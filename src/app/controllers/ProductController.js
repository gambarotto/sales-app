import { v4 as uuidv4 } from 'uuid';
import Product from '../models/Product';
import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import { ValidationProducts } from '../../helpers/ValidationRequests';
import Category from '../models/Category';
import Brand from '../models/Brand';

class ProductController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const responseValidation = await ValidationProducts.store(req.body);
    if (responseValidation.errors) {
      return res.json({ error: responseValidation.errors });
    }

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
      ...responseValidation,
    });

    return res.json({
      id,
      name,
      description,
      cost_price,
      sale_price,
      weight,
      id_brand,
      id_category,
    });
  }
  async index(req, res) {
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
    return res.json(products);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.json({ error: 'Product not found' });
    }
    if (req.body.idBrand) {
      const brandReq = await Brand.findByPk(req.body.idBrand);
      if (!brandReq) {
        return res.json({ error: 'Brand not found' });
      }
    }
    if (req.body.idCategory) {
      const categoryReq = await Category.findByPk(req.body.idCategory);
      if (!categoryReq) {
        return res.json({ error: 'Category not found' });
      }
    }
    const productUpdated = await product.update(req.body, {
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

    return res.json(productUpdated);
  }
  async delete(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.json({ error: 'Product not found' });
    }
    try {
      await product.destroy();
      return res.json({ message: 'Product was deleted' });
    } catch (error) {
      return res.json({ error });
    }
  }
  async show(req, res) {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.json({ error: 'Product not found' });
    }
    return res.json(product);
  }
}

export default new ProductController();
