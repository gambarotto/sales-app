import { checkResponsabilityUserToken } from '../middlewares/AuthUser';
import BrandsValidation from '../../helpers/validations/BrandsValidation';
import BrandRepositories from '../repositories/BrandRepositories';

class BrandController {
  async store(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const responseValidation = await BrandsValidation.store(req.body);
    if (responseValidation.errors) {
      return res.json(responseValidation);
    }
    const brand = await BrandRepositories.createBrand(responseValidation);

    return res.json(brand);
  }
  async index(req, res) {
    try {
      const brands = await BrandRepositories.findAllBrands();
      return res.json(brands);
    } catch (error) {
      return { error };
    }
  }
  async update(req, res) {
    if (!(await checkResponsabilityUserToken(req.userId))) {
      return res.json({ error: 'You do not have privileges for do this' });
    }
    const brand = await BrandRepositories.findBrandById(req.params.brandId);
    if (brand.error) {
      return res.json(brand);
    }
    const brandUpdated = await BrandRepositories.updateBrand(brand, req.body);

    return res.json(brandUpdated);
  }
  async delete(req, res) {
    const response = await BrandRepositories.deleteBrand(req.params.brandId);
    return res.json(response);
  }
  async show(req, res) {
    const brand = await BrandRepositories.findBrandById(req.params.brandId);
    if (brand.error) {
      return res.json(brand);
    }
    const { id, name, description } = brand;
    return res.json({ id, name, description });
  }
}
export default new BrandController();
