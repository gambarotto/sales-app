import DeliveryValidation from '../../helpers/validations/DeliveryValidation';
import DeliveryRepositories from '../repositories/DeliveryRepositories';

class BrandController {
  async store(req, res) {
    const responseValidation = await DeliveryValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json(responseValidation);
    }
    const delivery = await DeliveryRepositories.createDelivery(
      responseValidation
    );

    return res.status(delivery.error ? 400 : 200).json(delivery);
  }
  async index(req, res) {
    try {
      const brands = await DeliveryRepositories.findAllBrands();
      return res.json(brands);
    } catch (error) {
      return { error };
    }
  }
  async update(req, res) {
    const brand = await DeliveryRepositories.findBrandById(req.params.brandId);
    if (brand.error) {
      return res.json(brand);
    }
    const brandUpdated = await DeliveryRepositories.updateBrand(
      brand,
      req.body
    );

    return res.json(brandUpdated);
  }
  async delete(req, res) {
    const response = await DeliveryRepositories.deleteBrand(req.params.brandId);
    return res.json(response);
  }
  async show(req, res) {
    const brand = await DeliveryRepositories.findBrandById(req.params.brandId);
    if (brand.error) {
      return res.json(brand);
    }
    const { id, name, description } = brand;
    return res.json({ id, name, description });
  }
}
export default new BrandController();