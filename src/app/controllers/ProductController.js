import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import ProductsValidation from '../../helpers/validations/ProductsValidation';
import ProductRepositories from '../repositories/ProductRepositories';
import BrandRepositories from '../repositories/BrandRepositories';
import CategoryRepositories from '../repositories/CategoryRepositories';

class ProductController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const responseValidation = await ProductsValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json({ errors: responseValidation.errors });
    }

    const product = await ProductRepositories.createProduct(responseValidation);
    return res.json(product);
  }
  async index(req, res) {
    const products = await ProductRepositories.findAllProducts();
    return res.json(products);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const product = await ProductRepositories.findProductById(
      req.params.productId
    );
    if (!product) {
      return res.json({ errors: 'Product not found' });
    }
    if (req.body.idBrand) {
      const brandReq = await BrandRepositories.findBrandById(req.body.idBrand);
      if (!brandReq) {
        return res.json({ errors: 'Brand not found' });
      }
    }
    if (req.body.idCategory) {
      const categoryReq = await CategoryRepositories.findCategoryById(
        req.body.idCategory
      );
      if (!categoryReq) {
        return res.json({ errors: 'Category not found' });
      }
    }
    const productUpdated = await ProductRepositories.updateProduct(
      product,
      req.body
    );

    return res.json(productUpdated);
  }
  async delete(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const product = await ProductRepositories.findProductById(
      req.params.productId
    );
    if (!product) {
      return res.json({ errors: 'Product not found' });
    }
    try {
      await ProductRepositories.deleteProduct(product);
      return res.json({ message: 'Product was deleted' });
    } catch (errors) {
      return res.json({ errors });
    }
  }
  async show(req, res) {
    const product = await ProductRepositories.findProductById(
      req.params.productId
    );
    if (!product) {
      return res.json({ errors: 'Product not found' });
    }
    return res.json(product);
  }
}

export default new ProductController();
