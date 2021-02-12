import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import ProductsValidation from '../../helpers/validations/ProductsValidation';
import ProductRepositories from '../repositories/ProductRepositories';

class ProductController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res
        .status(401)
        .json({ errors: 'You do not have privileges for do this' });
    }
    const responseValidation = await ProductsValidation.store(req.body);
    if (responseValidation.errors) {
      return res.status(400).json(responseValidation);
    }

    const product = await ProductRepositories.createProduct(responseValidation);
    return res.status(product.errors ? 400 : 200).json(product);
  }
  async index(req, res) {
    const products = await ProductRepositories.findAllProducts();
    return res.status(products.errors ? 400 : 200).json(products);
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const product = await ProductRepositories.findProductById(
      req.params.productId
    );
    if (product.errors) {
      return res.status(400).json(product);
    }
    const resValidation = await ProductsValidation.update(product, req.body);
    if (resValidation.errors) return res.status(400).json(resValidation);

    const productUpdated = await ProductRepositories.updateProduct(
      product,
      resValidation
    );
    return res.status(productUpdated.errors ? 400 : 200).json(productUpdated);
  }
  async delete(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ errors: 'You do not have privileges for do this' });
    }
    const product = await ProductRepositories.findProductById(
      req.params.productId
    );
    if (product.errors) {
      return res.status(404).json({ errors: 'Product not found' });
    }
    const response = await ProductRepositories.deleteProduct(product);
    return res.status(response.errors ? 400 : 200).json(response);
  }
  async show(req, res) {
    const product = await ProductRepositories.findProductById(
      req.params.productId
    );
    return res.status(product.errors ? 404 : 200).json(product);
  }
}

export default new ProductController();
